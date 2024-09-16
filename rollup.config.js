import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import visualizer from 'rollup-plugin-visualizer';
import gzipPlugin from 'rollup-plugin-gzip';
import brotli from 'rollup-plugin-brotli';
import analyzer from 'rollup-plugin-analyzer';

export default {
  input: 'src/framework.js',
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs',
      sourcemap: process.env.NODE_ENV !== 'production',
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'esm',
      sourcemap: process.env.NODE_ENV !== 'production',
    },
  ],
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false,
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      plugins: ['@babel/plugin-transform-runtime'],
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: 3,
            targets: '> 1%, not dead',
            modules: false,
          },
        ],
      ],
    }),
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3,
        pure_funcs: ['console.log'],
        dead_code: true,
        unused: true,
        collapse_vars: true,
        reduce_vars: true,
        sequences: true,
        conditionals: true,
        booleans: true,
      },
      mangle: {
        toplevel: true,
        properties: {
          regex: /^_/,
        },
      },
      output: {
        comments: false,
      },
      keep_fnames: false,
      keep_classnames: false,
    }),
    gzipPlugin(),
    brotli(),
    visualizer({ open: true, filename: 'stats.html', compress: true}),
    analyzer({ summaryOnly: true,
      exclude: ['node_modules/**', 'dist/**'],  // Exclude node_modules and dist folders from size analysis
      statsFilename: 'bundle-stats.json', // Output stats to a JSON file for further analysis and visualization with tools like webpack-bundle-analyzer or rollup-plugin-visualizer-bundle-size-analyzer
     }),  // Rollup plugin analyzer for detailed size analysis
  ],
  external: ['rxjs'], 
};
