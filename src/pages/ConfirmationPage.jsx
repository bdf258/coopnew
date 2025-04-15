import React from "react";
import { useFormContext } from "../context/FormContext";

const ConfirmationPage = () => {
  const { formData } = useFormContext();
  const { initial, members } = formData;
  return (
    <div className="bg-white p-6 rounded shadow mt-4">
      <h2 className="text-lg font-bold mb-2 text-green-700">Success!</h2>
      <p className="mb-4">Your cooperative association information has been submitted and emailed to all participants and the administrator.</p>
      <h3 className="font-semibold mb-2">Summary</h3>
      <div className="mb-2">
        <strong>Purpose:</strong> {initial?.purpose || "-"}
      </div>
      <div className="mb-2">
        <strong>Members:</strong>
        <ul className="list-disc ml-6">
          {members?.map((m, i) => (
            <li key={i}>{m.fullName} ({m.email}) - {m.role}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Next: Check your email for confirmation and resources. For support, contact <a href="mailto:andrew@joinstead.com" className="underline text-blue-600">andrew@joinstead.com</a>.
      </div>
    </div>
  );
};

export default ConfirmationPage;
