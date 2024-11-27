import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { MainStack } from './components/MainStack';
import { GameStateProvider } from './context/GameStateContext';

Object.defineProperty(global, '__DEV__', { value: false });

const AppWrapper = () => {
  return React.createElement(
    GameStateProvider,
    {},
    React.createElement(MainStack, {}, null)
  );
};

ReactNativeScript.start(React.createElement(AppWrapper, {}, null));