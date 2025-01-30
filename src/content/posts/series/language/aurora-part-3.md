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

```swift {7,11-14,18-24}
// Package.swift
// ...
let package = Package(
  // ...
  products: [
    // ...
    .executable(name: "aurora", targets: ["AuroraCLI"])
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

```swift {5-10}
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

```console
$ swift run
aurora> 
hello!
hello!
aurora> 
there should not be a newline after that prompt...
there should not be a newline after that prompt...
aurora> 
^C
$
```

I think we forgot to set the `terminator` in that call to `print`... let's go
ahead and do that:

```swift {6}
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

```console
$ swift run
aurora> hello again!
hello again!
aurora> :)
:)
aurora> 1 + 2
1 + 2
aurora> ^C
$
```

I don't like that we have to use ^C to quit the REPL, though... how about we
use `:quit` as an exit command? It's similar to the Swift REPL, and it's
unlikely to ever be valid Aurora syntax.

```swift {9}
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

```console
$ swift run
aurora> boo
boo
aurora> this is a line
this is a line
aurora> quit
quit
aurora> :quit
$
```

## Running the parser

Let's parse some expressions!

```swift {9-10}
// ...
import Aurora

@main struct AuroraCLI: ParsableCommand {
  // ...
  func run() throws {
    while true {
      // ...
      let parsed = try ExpressionParser().parse(line) // [!code error]
      dump(parsed)
    }
  }
}
```

```ansi
[1m.../Sources/AuroraCLI/AuroraCLI.swift:14:24: [31merror:[0m[1m cannot find 'ExpressionParser' in scope[0m
      let parsed = try ExpressionParser.parse(line)
[32;1m                       ^~~~~~~~~~~~~~~~[0m
```

Ah, right, we haven't made anything `public`. Let's go around and fix that,
letting the compiler errors lead the way.

```swift {3,4}
// ExpressionParsing.swift
// ...
public struct ExpressionParser: Parser {
  public var body: some Parser<Substring, Expression> {
    // ...
  }
}
// ...
```

```swift {2,4}
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
[1m.../Sources/AuroraCLI/AuroraCLI.swift:14:24: [31merror:[0m[1m 'ExpressionParser' initializer is inaccessible due to 'internal' protection level[0m
      let parsed = try ExpressionParser().parse(line)
[32;1m                       ^~~~~~~~~~~~~~~~[0m

[1mAurora.ExpressionParser (internal):6:14: [2mnote:[0m[1m 'init()' declared here[0m
     internal init()
[32;1m              ^~~~[0m
```

Oop, that's a thing. Let's fix that too real quick.

```swift {3}
// ...
public struct ExpressionParser: Parser {
  public init() { }
  // ...
}
// ...
```

Aaaaaaaaaaand it runs!

```console
$ swift run
aurora> 1
▿ Aurora.Expression.number
  - number: 1
aurora> 1 + 2
▿ Aurora.Expression.operation
  ▿ operation: (3 elements)
    ▿ lhs: Aurora.Expression.number
      - number: 1
    ▿ rhs: Aurora.Expression.number
      - number: 2
    - op: Aurora.Expression.Operation.add
aurora> 5 * (14 / 7)
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
aurora> :quit
$
```

It could certainly be a bit less... verbose, but for now it works.

What happens if we type in something invalid?

```console
$ swift run
aurora> (1 + 2
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
$
```

Fairly concise! I don't like how it kicks us out of the REPL, though. We should
probably catch that error:

```swift {6,9,12-14}
// ...
import Aurora

@main struct AuroraCLI: ParsableCommand {
  // ...
  func run() {
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

```console
$ swift run
aurora> 2 * 3
▿ Aurora.Expression.operation
  ▿ operation: (3 elements)
    ▿ lhs: Aurora.Expression.number
      - number: 2
    ▿ rhs: Aurora.Expression.number
      - number: 3
    - op: Aurora.Expression.Operation.multiply
aurora> 1 -
!! error: unexpected input
 --> input:1:2
1 | 1 -
  |  ^ expected end of input
aurora> (6 - (4 / ))
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
aurora> :quit
$
```

That'll be it for this part. **Next up: evaluation!**
