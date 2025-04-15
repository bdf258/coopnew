import React, { createContext, useContext, useState, useEffect } from "react";

const FormContext = createContext();

const LOCAL_KEY = "coop_form_data";

export function FormProvider({ children }) {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = window.localStorage.getItem(LOCAL_KEY);
      return saved ? JSON.parse(saved) : { initial: {}, members: [] };
    } catch {
      return { initial: {}, members: [] };
    }
  });

  useEffect(() => {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));
  }, [formData]);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}
