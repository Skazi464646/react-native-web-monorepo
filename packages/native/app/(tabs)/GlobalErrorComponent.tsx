import React, { useEffect } from "react";
import { Alert } from "react-native";
import { useGlobalError } from "shared";

const GlobalErrorComponent = () => {
  const { error, setGlobalError } = useGlobalError();

  useEffect(() => {
    const caller :any = setGlobalError
    if (error) {
      Alert.alert("Error", error, [{ text: "OK", onPress: () =>{
        if(typeof caller === 'function' ){
            caller(null);
        }

      } }]);
    }
  }, [error]);

  return null; // This component does not render anything, just listens for errors
};

export default GlobalErrorComponent;
