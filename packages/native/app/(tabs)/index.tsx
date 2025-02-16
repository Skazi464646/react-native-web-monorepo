import { GlobalErrorProvider } from "shared";
import NativeApp from './NativeApp';
import GlobalErrorComponent from "./GlobalErrorComponent";
import CustomErrorBoundary from "../../components/CustomErrorBoundary";

export default function HomeScreen() {


  return (
    <CustomErrorBoundary>
      <GlobalErrorProvider>
        <NativeApp />
        <GlobalErrorComponent />
      </GlobalErrorProvider>
    </CustomErrorBoundary>

  );
}

