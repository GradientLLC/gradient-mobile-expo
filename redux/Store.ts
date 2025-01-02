import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JSOG from 'jsog';

import rootReducer from './RootReducer'


const preloadedState = {};

const transformCircular = createTransform(
 (inboundState, key) => JSOG.encode(inboundState),
 (outboundState, key) => JSOG.decode(outboundState),
);

const persistConfig = {
 key: 'root',
 storage: AsyncStorage,
 blacklist: ['loadingReducer'],
 transforms: [transformCircular],
};

const persistedReducers = persistReducer(persistConfig, rootReducer);

const middleware = [];

const customLogger = store => next => action => {
  if (__DEV__) {
    const startTime = performance.now();
    console.group(action.type);
    console.log('Payload:', action.payload);
    
    const result = next(action);
    
    console.log('New State:', store.getState());
    console.log(`Time: ${performance.now() - startTime}ms`);
    console.groupEnd();
    return result;
  }
  return next(action);
};

export const store = createStore(
 persistedReducers,
 preloadedState,
 //applyMiddleware(customLogger)
);

export const persistor = persistStore(store);
