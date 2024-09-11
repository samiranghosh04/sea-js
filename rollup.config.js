import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import visualizer from 'rollup-plugin-visualizer';
import gzipPlugin from 'rollup-plugin-gzip';
import brotli from 'rollup-plugin-brotli';
import analyzer from 'rollup-plugin-analyzer'; // Import rollup-plugin-analyzer

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
            useBuiltIns: 'usage', // Only include polyfills for the features you use
            corejs: 3,            // Specify the version of core-js for polyfills
            targets: '> 1%, not dead',
            modules: false,
          },
        ],
      ],
    }),
    terser(
      {
        compress: {
          drop_console: true,   // Remove console.log statements
          drop_debugger: true,  // Remove debugger statements
          passes: 2,            // Apply multiple optimization passes
          pure_funcs: ['console.log'], // Remove specific function calls (like console.log)
        },
        mangle: {
          properties: {
            regex: /^_/ // Mangle private properties starting with an underscore
          },
          toplevel: true, // Mangle top-level variable names
        },
        output: {
          comments: false,  // Remove comments
        }
      }
    ),
    gzipPlugin(), // Gzip compression
    brotli(), // Brotli compression
    visualizer({ open: true, filename: 'stats.html' }), // Visual bundle analyzer
    analyzer({ summaryOnly: true }), // Rollup plugin analyzer for detailed size analysis
  ],
};