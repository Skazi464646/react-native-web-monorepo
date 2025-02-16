import React, { createContext, useContext, useState, ReactNode } from "react";
import { Alert,Platform } from "react-native";

// Define the context type
// Create the error context
const ErrorContext = createContext(undefined);

// Error Provider component
export const GlobalErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const setGlobalError = (errorMessage) => {
    setError(errorMessage);
    if (errorMessage) {
        if(!Platform.OS === 'web'){
          throw new Error();
            Alert.alert("Error", errorMessage, [{ text: "OK", onPress: () => setError(null) }]);
        }else{
            console.log('error happend')
        }
    }
  };

  return (
    <ErrorContext.Provider value={{ error, setGlobalError }}>
      {children}
    </ErrorContext.Provider>
  );
};

// Custom hook to use the error context
export const useGlobalError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useGlobalError must be used within a GlobalErrorProvider");
  }
  return context;
};
