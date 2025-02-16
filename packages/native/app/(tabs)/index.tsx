import { GlobalErrorProvider } from "shared";
import NativeApp from './NativeApp';
import GlobalErrorComponent from "./GlobalErrorComponent";

export default function HomeScreen() {


  return (
    <GlobalErrorProvider>
      <NativeApp />
      <GlobalErrorComponent />
    </GlobalErrorProvider>
  );
}

