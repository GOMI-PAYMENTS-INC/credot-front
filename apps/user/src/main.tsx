import '@/index.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LicenseManager } from 'ag-grid-enterprise';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';
import ChannelService from '@/config/channelTalk';

import ErrorBoundary from './ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

/** ag-grid license */
LicenseManager.setLicenseKey(import.meta.env.VITE_APP_AG_GRID_LICENSE_KEY);

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
