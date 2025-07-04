import { ThemeProvider } from './context/ThemeContext.tsx';
import { ToastProvider } from './context/ToastContext.tsx';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { storeRedux } from './app/store.ts';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import './styles/index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <Provider store={storeRedux}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
);
