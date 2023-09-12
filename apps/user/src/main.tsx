import '@/index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ChannelService from '@/config/channelTalk';

import ErrorBoundary from './ErrorBoundary';
// import HackleConfig from '@/config/HackleConfig';
import App from '@/App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

ChannelService.boot({ pluginKey: import.meta.env.VITE_CHANNELTALK_PLUGIN });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ErrorBoundary>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </ErrorBoundary>,
);
