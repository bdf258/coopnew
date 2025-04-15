import React from "react";

const ProgressBar = ({ step }) => {
  // Use emoji for the last step
  const steps = ["Co-op", "Members", "Finish"];
  return (
    <div className="w-full flex justify-center my-4">
      <div className="flex gap-2 items-center">
        {steps.map((label, idx) => (
          <div key={label} className="flex items-center gap-1">
            <div
              className={`w-24 h-6 rounded-full flex items-center justify-center text-xs font-bold
                ${step === idx + 1 ? "bg-[#064c39] text-white" : "bg-gray-200 text-gray-500"}`}
            >
              {label}
            </div>
            {idx < steps.length - 1 && <span className="w-6 h-1 bg-gray-300 rounded" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
