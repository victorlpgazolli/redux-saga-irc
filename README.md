# redux-irc

Handful of utilities you should keep in your toolbelt to handle IRC connectivity in React.

🚧 **redux-irc is under development** 🚧
## Examples 

* [Simple Example](https://github.com/victorlpgazolli/redux-irc/blob/main/example/index.js)
* [Complex Example](https://github.com/victorlpgazolli/ohmyirc)
## Contents

* [Features](#features)
* [Installation](#installation)
* [Setup](#setup)
* [Contributions](#contributions)
* [Inspiration](#inspiration)

## Features

#### States available:
* channels
* connections
* servers
* users
* errors
* (soon) messages

#### Actions available:
* connect
* disconnect
* join
* leave
* (soon) send message


## Installation

```bash
$ npm i redux-irc
```

### Setup
```js
// src/store/index.js
import { createStore, combineReducers } from 'redux'
import { reducer as irc } from 'redux-irc';

const rootReducer = combineReducers({
  // ... your other reducers here ...
  irc,
});

const store = createStore(rootReducer);
export default store;
```


## Contributions
PRs are more than welcome. If you're planning to contribute please make sure to read the contributing guide: [CONTRIBUTING.md](https://github.com/victorlpgazolli/redux-irc/blob/master/CONTRIBUTING.md)

### Inspiration
Thanks to Martyn Smith for his awesome project [Node IRC](https://github.com/martynsmith/node-irc), which served me as inspiration for the react irc implementation.
