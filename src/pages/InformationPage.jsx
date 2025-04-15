import React from "react";
import ProgressBar from "../components/ui/ProgressBar";
import CompletionForm from "../components/forms/CompletionForm";
import { useFormContext } from "../context/FormContext";
import sendEmails from "../utils/emailService";

const InformationPage = ({ goTo }) => {
  const { formData } = useFormContext();
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleComplete = async () => {
    setSending(true);
    setError(null);
    try {
      await sendEmails(formData);
      goTo(4);
    } catch (e) {
      setError("Failed to send emails. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <ProgressBar step={3} />
      <CompletionForm onBack={() => goTo(2)} onComplete={handleComplete} />
      {sending && <p className="text-blue-600 mt-2">Sending emails...</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default InformationPage;
