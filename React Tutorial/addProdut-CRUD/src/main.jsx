import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App.jsx'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import store from './services/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
       <BrowserRouter>
          <App/>
       </BrowserRouter>
    </Provider>
  </StrictMode>
)
