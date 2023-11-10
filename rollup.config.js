import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import autoExternal from 'rollup-plugin-auto-external';
import pkg from './package.json';

export default {
  input: 'src/components/ReactSurvey/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    postcss({
      extract: false,
      minimize: true,
      inject: true,
    }),
    url(),
    svgr(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    resolve(),
    commonjs(),
    autoExternal(),
  ],
};
