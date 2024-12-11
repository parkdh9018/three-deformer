import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/bundle.cjs.js',
            format: 'cjs',
        },
        {
            file: 'dist/bundle.esm.js',
            format: 'esm',
        },
    ],
    plugins: [
        json(),
        resolve(),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            presets: ['@babel/preset-env'],
        }),
        terser(),
    ],
}