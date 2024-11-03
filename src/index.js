import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router , Route , Routes} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import ThemeProvider from './components/ThemeProvider';
import AuthProvider  from './components/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ThemeProvider>
        <Router>
          <AuthProvider>
            <Routes>
            <Route path = "/*" element={<App />} />
            </Routes>
          </AuthProvider>
        </Router>
      </ThemeProvider>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
