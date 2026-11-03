/**
 * Global application providers wrapper
 * Can be extended with Redux Provider, QueryClientProvider, AuthProvider, etc.
 */
export default function AppProviders({ children }) {
  return (
    <>
      {children}
    </>
  );
}
