import { createContext, useContext, useMemo } from 'react';

const bookFormContext = createContext<{
  location?: string;
  filterCinema?: string;
  filterName?: string;
}>({});

export function BookForm({
  className,
  children,
}: {
  readonly className?: string;
  readonly children: React.ReactNode;
}) {
  const contextValue = useMemo(() => ({}), []);
  return (
    <bookFormContext.Provider value={contextValue}>
      {children}
    </bookFormContext.Provider>
  );
}

export function useBookForm() {
  const context = useContext(bookFormContext);
  if (context === undefined) {
    throw new Error('useBookForm must be used within a BookForm!');
  }

  return context;
}
