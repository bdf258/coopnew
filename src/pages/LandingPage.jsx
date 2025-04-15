import React from "react";
import ProgressBar from "../components/ui/ProgressBar";
import InitialForm from "../components/forms/InitialForm";

const LandingPage = ({ goTo }) => (
  <div>
    <ProgressBar step={1} />
    <InitialForm onNext={() => goTo(2)} />
  </div>
);

export default LandingPage;
