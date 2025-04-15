import React from "react";
import Layout from "./components/layout/Layout";
import { FormProvider } from "./context/FormContext";
import LandingPage from "./pages/LandingPage";
import MembersPage from "./pages/MembersPage";
import InformationPage from "./pages/InformationPage";
import ConfirmationPage from "./pages/ConfirmationPage";

function App() {
  const [step, setStep] = React.useState(1);

  const goTo = (s) => setStep(s);

  return (
    <FormProvider>
      <Layout>
        {/* Progress Bar */}
        {/* Stepper logic */}
        {step === 1 && <LandingPage goTo={goTo} />}
        {step === 2 && <MembersPage goTo={goTo} />}
        {step === 3 && <InformationPage goTo={goTo} />}
        {step === 4 && <ConfirmationPage goTo={goTo} />}
      </Layout>
    </FormProvider>
  );
}

export default App;
