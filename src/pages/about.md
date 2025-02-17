---
layout: "@/layouts/AboutLayout.astro"
---

# 小さなオンラインホームへようこそ！

I'm Kaleb Ascevich, another random person on the internet doing internet
things. I love [Swift] programming, especially for Mac apps. I'm also dabbling
in [Rust], [NixOS], [GarageBand], and Japanese (because all those things
_clearly_ belong in the same sentence). You'll also occasionally find me
ranting about other random things.

Here's some basic information about me:

```swift
import Foundation
import PersonDescription

struct Me: Person {
  let name = Name("Kaleb A. Ascevich", pronunciation: "KAY-lub AICE-uh-vitch")
  let pronouns = ("he", "him", "his")
  let birthday: Date = DateComponents(
    calendar: .current,
    year: 2007, month: 11, day: 9
  ).date!
  let address = Address(state: .florida, country: .usa)

  var langs: [Lang] = [.swift, .rust, .nix]
  let shell = Shell.nushell

  var apps: [_: [App]] = [
    "ide": ["Xcode", "VSCodium"],
    "term": ["iTerm2"],
    "music": ["Apple Music"],
    "browser": ["Safari"],
  ]
  var devices: [_: (any Device, [OS])] = [
    "Kaleb's MacBook": (
      Mac(.macbookAir, 10, 1),
      [.macOS]
    ),
    "macbookair61": (
      Mac(.macbookAir, 6, 1),
      [.linux(distro: "Debian")]
    ),
    "zenbook": (
      PC(.laptop, "ASUS"),
      [.linux(distro: "Bazzite")]
    ),
    "imacg4": (
      Mac(.powerMac, 4, 2),
      [.macOS, .macOS]
    ),
    "Kaleb's Ally": (
      PC(.handheld, "ASUS"),
      [.linux(distro: "Bazzite")]
    ),
  ]
}

extension Me {
  var age: Int {
    Calendar.current.components(
      [.year], from: birthday, to: .now
    ).year!
  }
}
```

[Swift]: https://swift.org
[Rust]: https://rust-lang.org
[NixOS]: https://nixos.org
[GarageBand]: https://apple.com/mac/garageband/

## Projects

::github{repo="kaascevich/brainflipkit"}

::github{repo="kaascevich/rapid"}

::github{repo="kaascevich/zenny"}
