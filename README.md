# react-irc

Handful of utilities you should keep in your toolbelt to handle IRC connectivity in React.

🚧 **react-irc is under development** 🚧
## Example app
Soon

## Contents

* [Features](#features)
* [Contributions](#contributions)
* [Installation](#installation)
* [API](#api)
  + [`Network reducer`](#network-reducer)
  * [Inspiration](#inspiration)

## Features
- Reducer to keep your irc state in the Redux store

## Contributions
PRs are more than welcome. If you're planning to contribute please make sure to read the contributing guide: [CONTRIBUTING.md](https://github.com/victorlpgazolli/react-irc/blob/master/CONTRIBUTING.md)

## Installation

```bash
$ npm i react-irc
```

## API

### Network reducer
A network reducer to be provided to the store.

#### Usage

##### 1.- Give the network reducer to Redux
```js
// configureStore.js
import { createStore, combineReducers } from 'redux'
import { reducer as irc } from 'react-irc';

const rootReducer = combineReducers({
  // ... your other reducers here ...
  irc,
});

const store = createStore(rootReducer);
export default store;
```

### Inspiration
Thanks to Martyn Smith for his awesome project [Node IRC](https://github.com/martynsmith/node-irc), which served me as inspiration for the react irc implementation.
