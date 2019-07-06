import '@babel/polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, Store } from 'redux';
import { Provider } from 'react-redux';

import createInstanceApi from './store/utils/createInstanceApi';
import loadRootState from './store/utils/loadRootState';
import findByUuid from './store/utils/findByUuid';
import Root from './components/Root';
import store from './store';
import { AnyAction } from './store/actions';
import { Validator, ValidatorMap, RootState } from './store/models';

import './fields/includes';
import './cp.styl';

const stores: Array<Store<RootState, AnyAction>> = [];
const validators: ValidatorMap = {};

const api = {
  create: (id: string) => {
    try {
      const element = document.getElementById(id);
      if (!element) {
        throw new Error('Root element not found.');
      }

      const root = element.querySelector('.tcfField--app');
      const script = element.querySelector('script[type="application/json"]');
      const field = element.querySelector<HTMLInputElement>(
        'input.tcfField--model'
      );

      if (!field || !root || !script) {
        throw new Error('Missing components.');
      }

      const redux = createStore(
        store,
        loadRootState(script, field),
        applyMiddleware(thunk)
      );

      stores.push(redux);
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
  getInstanceApi: (uuid: string) => {
    for (const store of stores) {
      const state = store.getState();
      const location = findByUuid(state, uuid);
      return location ? createInstanceApi(store, location) : null;
    }
  },
  getValidator: function(id: string): Validator | null {
    return id in validators ? validators[id] : null;
  },
  registerValidator: (id: string, validator: Validator) => {
    validators[id] = validator;
  },
};

export default api;
