# Install && Setup

## Install

```bash

npm i redux-irc

```

or

```bash

yarn add redux-irc

```


### Setup
```js
// src/store/index.js
import { createStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import { ircReducer, createSagaMiddleware, ircSagas } from "redux-irc";

const sagaMiddleware = createSagaMiddleware() // same as redux-sagas's
export const store = createStore(
    combineReducers({
        irc: ircReducer
    }),
    applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(ircSagas)


```

- [getting started](./getting-started.md)