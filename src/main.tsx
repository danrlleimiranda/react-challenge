import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './redux/index';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter basename="/">
    <Provider store={ store }>
      <App />
    </Provider>
    ,
  </HashRouter>,
);
