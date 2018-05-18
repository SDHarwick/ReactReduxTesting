import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
// jsdom: A JS implementation of the WHATWG DOM and HTML standards, for use with node.js
import jsdom from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';

// Set up testing env to run like a browser in the command line
// global.document is same as window.document in browser

// Used jsdom to create fake DOM / browser environment
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;

// Hooked jquery into the fake version of the DOM we created
const $ = _$(global.window);


// Set up chia-jquery
chaiJquery(chai, chai.util, $);


// build 'renderComponent' helper that should render a given react class


function renderComponent(ComponentClass, props = {}, state = {}) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );

return $(ReactDOM.findDOMNode(componentInstance)); // produces HTML

}


// Build helper for simulating events


// Every jquery instance we create will have access to the simulate function
// and can be called like:

// $('div').simulate()

// which is was the 'fn' does in the function below

// [eventName] is an object property and would look like: 

// TestUtils.Simulate.change(this[0]) 

// with the 0 being the first element in the array of 'this' (the HTML element we selected) (a 'gatcha')


$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

  // The above function is meant to mirror the signature of the following function

  // describe('entering some text', () => {
  //   beforeEach(() => {
  //     component.find('textarea').simulate('change', 'new comment');
  //   });




export {renderComponent, expect};
