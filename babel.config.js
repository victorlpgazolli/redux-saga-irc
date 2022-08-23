module.exports = {
  presets: [
    ["env", {
      "modules": "commonjs", // <- Check and see if you have this line

    }],
    "module:metro-react-native-babel-preset",
    '@babel/preset-typescript',
  ],

};
