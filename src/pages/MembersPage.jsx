import React from "react";
import ProgressBar from "../components/ui/ProgressBar";
import MembersForm from "../components/forms/MembersForm";

const MembersPage = ({ goTo }) => (
  <div>
    <ProgressBar step={2} />
    <MembersForm onBack={() => goTo(1)} onNext={() => goTo(3)} />
  </div>
);

export default MembersPage;
