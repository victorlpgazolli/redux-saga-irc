const {
    ircSagas,
    ircActions,
    ircReducer,
    createSagaMiddleware,
} = require("../dist/src/index.js");

describe("install check", () => {
    it("should have sagas", () => { expect(typeof ircSagas === 'function').toBeTruthy() })
    it("should have actions", () => { expect(Object.keys(ircActions).length > 0).toBeTruthy() })
    it("should have reducer", () => { expect(typeof ircReducer === 'function').toBeTruthy() })
    it("should have saga middleware creator", () => { expect(typeof createSagaMiddleware === 'function').toBeTruthy() })
})