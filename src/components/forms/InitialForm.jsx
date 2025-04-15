import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { useFormContext } from "../../context/FormContext";

const PURPOSE_OPTIONS = [
  { value: "Housing", label: "to house ourselves" },
  { value: "Worker", label: "to work for ourselves" },
  { value: "Consumer", label: "to buy for ourselves" },
  { value: "Financial", label: "to save money for ourselves" }
];

const coopInfo = (
  <div>
    <p className="mb-2 font-semibold">What is a Cooperative?</p>
    <p className="text-sm mb-2">A cooperative is a people-centered enterprise owned and run by and for its members. Cooperatives bring people together to meet common needs and aspirations, sharing ownership and decision-making.</p>
    <a href="https://www.uk.coop/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Learn more at UK.coop</a>
  </div>
);

const InitialForm = ({ onNext }) => {
  const { formData, setFormData } = useFormContext();
  const [fields, setFields] = useState({
    coopName: formData.initial?.coopName || "",
    purpose: formData.initial?.purpose || PURPOSE_OPTIONS[0].value,
    description: formData.initial?.description || ""
  });
  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!fields.coopName.trim()) errs.coopName = "Co-op name required.";
    if (!fields.description.trim()) errs.description = "Description required.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setFormData(fd => ({ ...fd, initial: fields }));
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Start Your Cooperative</h2>
      <p className="mb-4 text-sm text-gray-600">
        This service helps you set up an unincorporated co-operative. It is the best way to start, and later can be easily turned into the exact kind of co-operative you need.
        <br /><br />
        All you need to start is the phone numbers and telephone numbers for the people involved.
      </p>
      <label className="block mb-1 mt-4 text-sm font-semibold">Name of co-operative</label>
      <Input name="coopName" value={fields.coopName} onChange={handleChange} error={errors.coopName} required />
      <label className="block mb-1 mt-4 text-sm font-semibold">Purpose of co-operative</label>
      <select name="purpose" value={fields.purpose} onChange={handleChange} className="mb-4 border rounded px-2 py-1">
        {PURPOSE_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <label className="block mb-1 mt-4 text-sm font-semibold">Description of co-operative</label>
      <textarea
        name="description"
        value={fields.description}
        onChange={handleChange}
        className="mb-2 border rounded px-2 py-1 w-full min-h-[80px]"
        required
      />
      <div className="mb-4 text-xs text-gray-500">
        what are you intending to do together. Be specific about what you have already agreed, and don't be afraid of stating that you haven't decided how you will do certain things.
      </div>
      <div className="flex items-center justify-between mt-4">
        <button type="button" className="text-blue-600 underline text-sm" onClick={() => setModalOpen(true)}>
          What is a Cooperative?
        </button>
        <Button type="submit">Next</Button>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="What is a Cooperative?">
        {coopInfo}
      </Modal>
    </form>
  );
};

export default InitialForm;
