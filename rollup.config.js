import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import tsConfigPaths from 'rollup-plugin-ts-paths';
import pkg from './package.json';

export default {
  input: './out-tsc/src/index.js',
  external: ['react', 'react-native', 'redux', 'react-redux', 'redux-saga', 'stream', 'net', 'tls', 'events', 'util'],
  plugins: [resolve(), commonjs(), json(), typescript(), tsConfigPaths()],
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
  ],
};
