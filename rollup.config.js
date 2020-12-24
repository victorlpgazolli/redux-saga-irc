import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from '@rollup/plugin-json';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  external: ['react', 'react-native', 'redux', 'react-redux', 'redux-saga', 'stream', 'net', 'tls', 'events', 'util'],
  plugins: [resolve(), commonjs(), json()],
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
  ],
};
