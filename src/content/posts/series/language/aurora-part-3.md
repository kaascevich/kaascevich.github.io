---
published: "2025-01-28T20:35:00-05:00"
title: Aurora (part 3)
tags:
  - swift
  - language
description: A fairly simple REPL
---

Compared to the last two posts, this one should be fairly short.

## Contents

## Setting up

First, we've gotta add a new executable target. Update `Package.swift` as
follows:

```swift
// Package.swift
// ...
let package = Package(
  // ...
  products: [
    // ...
    .executable(name: "AuroraCLI", targets: ["AuroraCLI"])
  ],
  dependencies: [
    // ...
    .package(
      url: "https://github.com/apple/swift-argument-parser",
      from: .init(1, 5, 0)
    ),
  ],
  targets: [
    // ...
    .executableTarget(
      name: "AuroraCLI",
      dependencies: [
        "Aurora",
        .product(name: "ArgumentParser", package: "swift-argument-parser"),
      ]
    ),
  ]
)
```

Next, create a new Swift file:

```console
$ mkdir Sources/AuroraCLI
$ touch Sources/AuroraCLI/AuroraCLI.swift
```

And fill it in with this:

```swift
// AuroraCLI.swift
import ArgumentParser

@main struct AuroraCLI: ParsableCommand {
  static let configuration = .init(name: "aurora")

  func run() throws {
    print("hello!")
  }
}
```

And give it a quick test run:

```ansi
Building for debugging...
[7/7] Applying AuroraCLI
Build of product 'AuroraCLI' complete! (1.07s)
hello!
```

## Reading lines

Let's start reading some lines:

```swift
// ...
@main struct AuroraCLI: ParsableCommand {
  // ...
  func run() throws {
    while true {
      print("aurora> ")
      guard let line = readLine() else { break }

      print(line)
    }
  }
}
```

```ansi
aurora> 
[2mhello![0m
hello!
aurora> 
[2mthere should not be a newline after that prompt...[0m
there should not be a newline after that prompt...
aurora> 
[2m^C[0m
```

> For the sake of clarity, text I type into the terminal will be shown at a
> lower brightness.

I think we forgot to set the `terminator` in that call to `print`... let's go ahead
and do that:

```swift
// ...
@main struct AuroraCLI: ParsableCommand {
  // ...
  func run() throws {
    while true {
      print("aurora> ", terminator: "")
      // ...
    }
  }
}
```

```ansi
aurora> [2mhello again![0m
hello again!
aurora> [2m:)[0m
:)
aurora> [2m1 + 2[0m
1 + 2
aurora> [2m^C[0m
```

I don't like that we have to use ^C to quit the REPL, though... how about we
use `:quit` as an exit command? It's similar to the Swift REPL, and it's
unlikely to ever be valid Aurora syntax.

```swift
// ...
@main struct AuroraCLI: ParsableCommand {
  // ...
  func run() throws {
    while true {
      print("aurora> ")
      guard let line = readLine() else { break }

      if line == ":quit" { break }

      print(line)
    }
  }
}
```

```ansi
aurora> [2mboo[0m
boo
aurora> [2mthis is a line[0m
this is a line
aurora> [2mquit[0m
quit
aurora> [2m:quit[0m
```

## Running the parser

Let's parse some expressions!

```swift
// ...
import Aurora

@main struct AuroraCLI: ParsableCommand {
  // ...
  func run() throws {
    while true {
      // ...
      let parsed = try ExpressionParser().parse(line)
      dump(parsed)
    }
  }
}
```

```ansi
/Users/kaleb/Developer/Other/Swift/Aurora/Sources/AuroraCLI/AuroraCLI.swift:14:24: [31;1merror:[0m[1m cannot find 'ExpressionParser' in scope[0m
[96m12 |[0m       if line == ":quit" { break }
[96m13 |[0m 
[96m14 |[0m       let parsed = try ExpressionParser.parse(line)
[96m   |[0m                        `- [31;1merror:[0m[1m cannot find 'ExpressionParser' in scope[0m
[96m15 |[0m       print(parsed)
[96m16 |[0m     }
```

Ah, right, we haven't made anything `public`. Let's go around and fix that,
letting the compiler errors lead the way.

```swift
// ExpressionParsing.swift
// ...
public struct ExpressionParser: Parser {
  public var body: some Parser<Substring, Expression> {
    // ...
  }
}
// ...
```

```swift
// Expression.swift
public indirect enum Expression: Equatable {
  // ...
  public enum Operation: Equatable {
    // ...
  }
}
```

Let's try that again.

```ansi
/Users/kaleb/Developer/Other/Swift/Aurora/Sources/AuroraCLI/AuroraCLI.swift:14:24: [31;1merror:[0m[1m 'ExpressionParser' initializer is inaccessible due to 'internal' protection level[0m
[96m12 |[0m       if line == ":quit" { break }
[96m13 |[0m 
[96m14 |[0m       let parsed = try ExpressionParser().parse(line)
[96m   |[0m                        `- [31;1merror:[0m[1m 'ExpressionParser' initializer is inaccessible due to 'internal' protection level[0m
[96m15 |[0m       print(parsed)
[96m16 |[0m     }

Aurora.ExpressionParser (internal):6:14: [2;1mnote:[0m[1m 'init()' declared here[0m
[96m4 |[0m     public typealias Output = Aurora.Expression
[96m5 |[0m     public typealias _Body = some Parsing.Parser<Substring, Aurora.Expression>
[96m6 |[0m     internal init()
[96m  |[0m              `- [2;1mnote:[0m[1m 'init()' declared here[0m
[96m7 |[0m }
```

Ohp, that's a thing. Let's fix that too real quick.

```swift
// ...
public struct ExpressionParser: Parser {
  public init() { }
  // ...
}
// ...
```

Aaaaaaaaaaand it runs!

```ansi
aurora> [2m1[0m
▿ Aurora.Expression.number
  - number: 1
aurora> [2m1 + 2[0m
▿ Aurora.Expression.operation
  ▿ operation: (3 elements)
    ▿ lhs: Aurora.Expression.number
      - number: 1
    ▿ rhs: Aurora.Expression.number
      - number: 2
    - op: Aurora.Expression.Operation.add
aurora> [2m5 * (14 / 7)[0m
▿ Aurora.Expression.operation
  ▿ operation: (3 elements)
    ▿ lhs: Aurora.Expression.number
      - number: 5
    ▿ rhs: Aurora.Expression.operation
      ▿ operation: (3 elements)
        ▿ lhs: Aurora.Expression.number
          - number: 14
        ▿ rhs: Aurora.Expression.number
          - number: 7
        - op: Aurora.Expression.Operation.divide
    - op: Aurora.Expression.Operation.multiply
aurora> [2m:quit[0m
```

It could certainly be a bit less... verbose, but for now it works.

What happens if we type in something invalid?

```ansi
aurora> [2m(1 + 2[0m
Error: error: multiple failures occurred

error: unexpected input
 --> input:1:7
1 | (1 + 2
  |       ^ expected ")"

error: unexpected input
 --> input:1:1
1 | (1 + 2
  | ^ expected at least 1 digit
  | ^ expected at least 1 digit
```

Fairly concise! I don't like how it kicks us out of the REPL, though. We should
probably catch that error:

```swift
// ...
import Aurora

@main struct AuroraCLI: ParsableCommand {
  // ...
  func run() throws {
    while true {
      // ...
      do {
        let parsed = try ExpressionParser().parse(line)
        print(parsed)
      } catch {
        print("!! \(error)")
      }
    }
  }
}
```

```ansi
aurora> [2m2 * 3[0m
▿ Aurora.Expression.operation
  ▿ operation: (3 elements)
    ▿ lhs: Aurora.Expression.number
      - number: 2
    ▿ rhs: Aurora.Expression.number
      - number: 3
    - op: Aurora.Expression.Operation.multiply
aurora> [2m1 -[0m
!! error: unexpected input
 --> input:1:2
1 | 1 -
  |  ^ expected end of input
aurora> [2m(6 - (4 / ))[0m
!! error: multiple failures occurred

error: unexpected input
 --> input:1:4
1 | (6 - (4 / ))
  |    ^ expected ")"

error: unexpected input
 --> input:1:1
1 | (6 - (4 / ))
  | ^ expected at least 1 digit
  | ^ expected at least 1 digit
aurora> [2m:quit[0m
```

That'll be it for this part. **Next up: evaluation!**
