[![CI Status](https://github.com/mybigday/expo-global-keyevent/workflows/CI/badge.svg)](https://github.com/mybigday/expo-global-keyevent)

> Expo wrapper for react-native-global-keyevent

## Introdution

```js
import GlobalKeyEvent from 'react-native-global-keyevent'

GlobalKeyEvent.addKeyDownListener((evt) => {
  console.log('---key down---')
  console.log('code:', evt.keyCode)
  console.log('key:', evt.pressedKey)
  console.log('flag shift:', evt.shift)
})
GlobalKeyEvent.addKeyUpListener((evt) => {
  console.log('---key up---')
  console.log('code:', evt.keyCode)
  console.log('key:', evt.pressedKey)
  console.log('flag shift:', evt.shift)
})
```

## Installation

- Add dependency with `yarn add react-native-global-keyevent expo-global-keyevent`

## Usage

- `GlobalKeyEvent.addKeyDownListener((event: GlobalKeyEvent) => {}): EmitterSubscription`
- `GlobalKeyEvent.addKeyUpListener((event: GlobalKeyEvent) => {}): EmitterSubscription`
- [EmitterSubscription reference](https://github.com/facebook/react-native/blob/8bd3edec88148d0ab1f225d2119435681fbbba33/Libraries/vendor/emitter/_EmitterSubscription.js)

```flow
type GlobalKeyEvent = {
  pressedKey: string,
  keyCode: number,
  shift: boolean,
  control: boolean,
  alt: boolean,
  meta: boolean,
  capsLock: boolean,
  fn: boolean,
  numericPad: boolean,
}
```

#### `GlobalKeyEvent`

| Prop          | Type        | Note                                 |
| ------------- | ------------| ------------------------------------ |
| `pressedKey`  | `String`    | Pressed key |
| `keyCode`     | `Number`    | [Not supported on iOS] Key code |
| `shift`       | `Boolean`   | Is `Shift` key hold? |
| `control`     | `Boolean`   | Is `Ctrl` (iOS: `Control`) key hold? |
| `alt`         | `Boolean`   | Is `Alt` (iOS: `Option`) key hold?  |
| `meta`        | `Boolean`   | Is `META` (iOS: `Command`) key hold? |
| `capsLock`    | `Boolean`   | Is `Caps Lock` enabled? |
| `fn`          | `Boolean`   | [Android only] Is `Fn` key hold? |
| `numericPad`  | `Boolean`   | [iOS only] Is user pressed a key located on the numeric keypad? |

## Credits

- [`react-native-keyevent`](https://github.com/kevinejohn/react-native-keyevent) used to be our solution before this.

## License

[MIT](LICENSE.md)

---

<p align="center">
  <a href="https://bricks.tools">
    <img width="90px" src="https://avatars.githubusercontent.com/u/17320237?s=200&v=4">
  </a>
  <p align="center">
    Built and maintained by <a href="https://bricks.tools">BRICKS</a>.
  </p>
</p>
