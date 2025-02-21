import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './[locale]/App';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Import the i18n configuration

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

<React.StrictMode>    <App />

</React.StrictMode>

    
);

