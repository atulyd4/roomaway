import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { HelmetProvider } from 'react-helmet-async';
import { SnackbarProvider } from 'notistack';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store, persistor } from './app/store';
import ThemeProvider from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={2000}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <ThemeProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ThemeProvider>
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
