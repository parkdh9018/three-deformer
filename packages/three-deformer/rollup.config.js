import del from 'rollup-plugin-delete';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts'

const isProduction = !process.env.ROLLUP_WATCH;

export default [{
    input: 'src/index.ts',
    output: [
        { file: 'dist/bundle.cjs.js', format: 'cjs', sourcemap: !isProduction },
        { file: 'dist/bundle.esm.js', format: 'esm', sourcemap: !isProduction },
    ],
    external: ['three'],
    plugins: [
        del({ targets: 'dist/*' }),
        json(),
        resolve({
            extensions: ['.js', '.ts']
        }),
        commonjs(),
        typescript(),
        babel({
            babelHelpers: 'bundled',
            presets: ['@babel/preset-env']
        }),
        isProduction && terser(),
        !isProduction && serve({
            open: true,
            contentBase: ['public', '.'],
            openPage: '/',
            port: 3000,
        }),
        !isProduction && livereload('dist'),
    ]
},
{
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
},
];
