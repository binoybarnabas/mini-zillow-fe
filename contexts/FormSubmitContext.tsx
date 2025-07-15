'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type FormSubmitContextType = {
  onFormSubmit: () => void;
  setOnFormSubmit: (cb: () => void) => void;
};

const FormSubmitContext = createContext<FormSubmitContextType>({
  onFormSubmit: () => {},
  setOnFormSubmit: () => {},
});

export const useFormSubmit = () => useContext(FormSubmitContext);

export const FormSubmitProvider = ({ children }: { children: ReactNode }) => {
  const [onFormSubmit, setOnFormSubmit] = useState<() => void>(() => () => {});

  return (
    <FormSubmitContext.Provider value={{ onFormSubmit, setOnFormSubmit }}>
      {children}
    </FormSubmitContext.Provider>
  );
};
