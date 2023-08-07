import '@/index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import HackleConfig from '@/config/HackleConfig';
import App from '@/App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HackleConfig>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HackleConfig>,
);
