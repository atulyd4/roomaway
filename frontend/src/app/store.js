import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authSlice from './auth-slice';
import hotelReducer from './hotel-slice';

const persistConfig = {
  key: 'auth',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    hotels: hotelReducer,
  },
  devTools: true,
});

const persistor = persistStore(store);

export { store, persistor };
