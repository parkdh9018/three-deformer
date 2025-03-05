import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
    input: 'src/index.ts',
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
        serve( {
            open: true,
            contentBase: [ 'public', '.' ],
            openPage: '/',
            port: 3000,
        } ),
        livereload('dist')
    ],
}