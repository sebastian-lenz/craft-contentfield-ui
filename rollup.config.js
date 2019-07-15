import fs from 'fs';
import path from 'path';

import babelCore from '@babel/core';
import commonJs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify-es';

function vendors(options, definitions) {
  const keys = Object.keys(definitions);
  options.external.push(...keys);
  options.output.globals = keys.reduce(function(memo, key) {
    memo[key] = definitions[key].varName;
    return memo;
  }, options.output.globals);

  options.plugins.push({
    name: 'vendors',
    onwrite: function() {
      const chunks = keys.map(function(key) {
        const importedFile = require.resolve(
          definitions[key].package ? definitions[key].package : key
        );

        let splitAt = importedFile.lastIndexOf('node_modules');
        splitAt = importedFile.indexOf(path.sep, splitAt + 13);

        const basePath = importedFile.substr(0, splitAt);
        const fileName =
          process.env.NODE_ENV === 'production'
            ? definitions[key].production
            : definitions[key].development;

        const file = path.join(basePath, fileName);
        return fs.readFileSync(file, { encoding: 'utf-8' });
      });
      fs.writeFileSync('./dist/vendor.js', chunks.join('\n'));
    },
  });

  return options;
}

export default vendors(
  {
    input: 'src/index.tsx',
    output: {
      format: 'iife',
      file: 'dist/content-field.js',
      globals: {
        jquery: 'jQuery',
      },
      name: 'contentField',
    },
    external: ['jquery'],
    plugins: [
      typescript({
        typescript: require('typescript'),
      }),
      nodeResolve(),
      commonJs(),
      {
        name: 'babel',
        transformBundle: function(code) {
          return babelCore.transform(code, { presets: [['@babel/env']] });
        },
      },
      postcss({
        extract: true,
        plugins: [],
      }),
      ...(process.env.NODE_ENV === 'production' ? [uglify()] : []),
    ],
    watch: {
      exclude: '',
      clearScreen: false,
    },
  },
  {
    '@babel/polyfill': {
      development: 'polyfill/dist/polyfill.js',
      production: 'polyfill/dist/polyfill.min.js',
      varName: '_babelPolyfill',
    },
    handlebars: {
      development: 'dist/handlebars.js',
      production: 'dist/handlebars.min.js',
      varName: 'Handlebars',
    },
    'prop-types': {
      development: 'prop-types.js',
      production: 'prop-types.min.js',
      varName: 'PropTypes',
    },
    react: {
      development: 'umd/react.development.js',
      production: 'umd/react.production.min.js',
      varName: 'React',
    },
    'react-dnd': {
      package: 'react-dnd-umd-builds/dist/ReactDnD.js',
      development: 'dist/ReactDnD.js',
      production: 'dist/ReactDnD.min.js',
      varName: 'ReactDnD',
    },
    'react-dnd-html5-backend': {
      package: 'react-dnd-umd-builds/dist/ReactDnDHTML5Backend.js',
      development: 'dist/ReactDnDHTML5Backend.js',
      production: 'dist/ReactDnDHTML5Backend.min.js',
      varName: 'ReactDnDHTML5Backend',
    },
    'react-dom': {
      development: 'umd/react-dom.development.js',
      production: 'umd/react-dom.production.min.js',
      varName: 'ReactDOM',
    },
    'react-redux': {
      development: 'dist/react-redux.js',
      production: 'dist/react-redux.min.js',
      varName: 'ReactRedux',
    },
    redux: {
      development: 'dist/redux.js',
      production: 'dist/redux.min.js',
      varName: 'Redux',
    },
    'redux-thunk': {
      development: 'dist/redux-thunk.js',
      production: 'dist/redux-thunk.min.js',
      varName: 'ReduxThunk',
    },
  }
);
