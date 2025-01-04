import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JSOG from 'jsog';

import rootReducer from './RootReducer';

// Transform for handling circular references
// const transformCircular = createTransform(
//   (inboundState, key) => JSOG.encode(inboundState),
//   (outboundState, key) => JSOG.decode(outboundState),
// );

// const authTransform = createTransform(
//   (state) => ({ ...state, loggedInUserDetails: JSOG.encode(state.loggedInUserDetails) }),
//   (state) => ({ ...state, loggedInUserDetails: JSOG.decode(state.loggedInUserDetails) }),
//   { whitelist: ['auth'] }
// );


// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loadingReducer'],
  // transforms: [transformCircular, authTransform],
};

// Create persisted reducer
const persistedReducers = persistReducer(persistConfig, rootReducer);

// Create store using Redux Toolkit's configureStore
export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      // Add middleware configuration to handle serialization issues with persistedReducers
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
   }),
  preloadedState: {},
});

export const persistor = persistStore(store);

// Export types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;