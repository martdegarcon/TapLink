import { TonConnectUIProvider } from '@tonconnect/ui-react';

import { App } from './App';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import { publicUrl } from '@/utils/publicUrl';

function ErrorBoundaryError({ error }: { error: unknown }) {
  return (
    <div>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

export function Root() {
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <TonConnectUIProvider
        manifestUrl={publicUrl('tonconnect-manifest.json')}
      >
        <App/>
      </TonConnectUIProvider>
    </ErrorBoundary>
  );
}
