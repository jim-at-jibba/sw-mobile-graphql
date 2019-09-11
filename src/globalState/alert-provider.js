import * as React from 'react';

export const AlertContext = React.createContext({});

export function AlertProvider({ children }) {
  const [isAlertOpen, setAlertOpen] = React.useState(false);
  const [alertType, setAlertType] = React.useState('info');
  const [alertMessage, setAlertMessage] = React.useState('');
  return (
    <AlertContext.Provider
      value={{
        isAlertOpen,
        setAlertOpen,
        alertType,
        setAlertType,
        alertMessage,
        setAlertMessage
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}
