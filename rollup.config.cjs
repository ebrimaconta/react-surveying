const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const external = require('rollup-plugin-peer-deps-external');
const postcss = require('rollup-plugin-postcss');
const resolve = require('rollup-plugin-node-resolve');
const url = require('rollup-plugin-url');
const autoExternal = require('rollup-plugin-auto-external');
const typescript = require('@rollup/plugin-typescript');

module.exports = {
    input: 'src/components/ReactSurvey/index.tsx',
    output: [{
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: 'dist/index.es.js',
            format: 'es',
            sourcemap: true,
        },
    ],
    plugins: [
        typescript(),
        external(),
        postcss({
            extract: false,
            minimize: true,
            inject: true,
        }),
        url(),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
        }),
        resolve(),
        commonjs(),
        autoExternal(),
    ],
};