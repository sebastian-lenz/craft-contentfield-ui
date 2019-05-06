import '@babel/polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

import loadRootState from './store/utils/loadRootState';
import Root from './components/Root';
import store from './store';
import { Validator, ValidatorMap } from './store/models';

import './fields/includes';
import './cp.styl';

const validators: ValidatorMap = {};

const api = {
  create: function(id: string) {
    try {
      const element = document.getElementById(id);
      if (!element) {
        throw new Error('Root element not found.');
      }

      const root = element.querySelector('.tcfField--app');
      const script = element.querySelector('script[type="application/json"]');
      const field = element.querySelector<HTMLInputElement>(
        'input.tcfField--content'
      );

      if (!field || !root || !script) {
        throw new Error('Missing components.');
      }

      const redux = createStore(
        store,
        loadRootState(script, field),
        applyMiddleware(thunk)
      );

      redux.subscribe(() => {
        field.value = JSON.stringify(redux.getState().model);
      });

      ReactDOM.render(
        <Provider store={redux}>
          <Root />
        </Provider>,
        root
      );
    } catch (error) {
      console.error('Could not start content editor: ' + error.message);
    }
  },
  getValidator: function(id: string): Validator | null {
    return id in validators ? validators[id] : null;
  },
  registerValidator: function(id: string, validator: Validator) {
    validators[id] = validator;
  },
};

export default api;
