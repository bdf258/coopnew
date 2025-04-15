import React, { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useFormContext } from "../../context/FormContext";
import sendEmails from "../../utils/emailService";

const ROLES = ["Member", "Secretary", "Treasurer", "Chair"];

const MembersForm = ({ onBack, onNext }) => {
  const { formData, setFormData } = useFormContext();
  const lead = formData.initial || {};
  const initialMembers = formData.members.length
    ? formData.members
    : [
        {
          fullName: lead.fullName || "",
          email: lead.email || "",
          phone: lead.phone || "",
          role: "Member",
        },
        { fullName: "", email: "", phone: "", role: "Member" },
        { fullName: "", email: "", phone: "", role: "Member" },
      ];
  const [members, setMembers] = useState(initialMembers);
  const [errors, setErrors] = useState([]);
  const [sending, setSending] = useState(false);
  const [emailError, setEmailError] = useState(null);

  useEffect(() => {
    setMembers((ms) => [
      {
        ...ms[0],
        fullName: lead.fullName || "",
        email: lead.email || "",
        phone: lead.phone || "",
      },
      ...ms.slice(1),
    ]);
    // eslint-disable-next-line
  }, [lead.fullName, lead.email, lead.phone]);

  const validate = () => {
    const errs = [];
    let hasSecretary = false, hasTreasurer = false, hasChair = false;
    members.forEach((m, i) => {
      const e = {};
      if (!m.fullName.trim()) e.fullName = "Name required.";
      if (!m.email.trim()) e.email = "Email required.";
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m.email)) e.email = "Invalid email.";
      if (m.role === "Secretary") hasSecretary = true;
      if (m.role === "Treasurer") hasTreasurer = true;
      if (m.role === "Chair") hasChair = true;
      errs.push(e);
    });
    if (members.length < 3) errs.form = "At least 3 members required.";
    if (!hasSecretary) errs.form = "One member must be Secretary.";
    if (!hasTreasurer) errs.form = "One member must be Treasurer.";
    if (!hasChair) errs.form = "One member must be Chair.";
    const secretaryIdx = members.findIndex(m => m.role === "Secretary");
    const treasurerIdx = members.findIndex(m => m.role === "Treasurer");
    const chairIdx = members.findIndex(m => m.role === "Chair");
    if (secretaryIdx !== -1 && secretaryIdx === treasurerIdx) errs.form = "Secretary and Treasurer must be different.";
    if (secretaryIdx !== -1 && secretaryIdx === chairIdx) errs.form = "Secretary and Chair must be different.";
    if (treasurerIdx !== -1 && treasurerIdx === chairIdx) errs.form = "Treasurer and Chair must be different.";
    return errs;
  };

  const handleChange = (idx, field, value) => {
    setMembers(ms => ms.map((m, i) => i === idx ? { ...m, [field]: value } : m));
  };

  const addMember = () => setMembers(ms => [...ms, { fullName: "", email: "", phone: "", role: "Member" }]);
  const removeMember = idx => setMembers(ms => ms.length > 3 ? ms.filter((_, i) => i !== idx) : ms);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(null);
    const errs = validate();
    setErrors(errs);
    if (!errs.form && errs.every(e => Object.keys(e).length === 0)) {
      setSending(true);
      // Save members to context
      setFormData(fd => ({ ...fd, members }));
      try {
        // Send all form data (including initial) to all emails and admin
        await sendEmails({ ...formData, members });
        setSending(false);
        onNext();
      } catch (err) {
        setSending(false);
        // Log error but allow user to proceed
        setEmailError("Failed to send emails. You may proceed, but some recipients may not receive an email.");
        onNext();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Add Cooperative Members</h2>
      <p className="mb-2 text-sm text-gray-600">
        Please add at least 3 members and assign the roles below.<br />
        <span className="block mt-2"><strong>Secretary</strong>: responsible for the legal status of the co-operative and making sure that it is abiding by all relevant regulations.</span>
        <span className="block"><strong>Treasurer</strong>: responsible for handling the finances of the co-operative, holding the money, and managing expenses.</span>
        <span className="block"><strong>Chair</strong>: responsible for calling and holding meetings of the co-operative members, taking minutes, and being the public face</span>
      </p>
      {errors.form && <div className="text-red-600 mb-2 text-sm">{errors.form}</div>}
      {emailError && <div className="text-red-600 mb-2 text-sm">{emailError}</div>}
      {members.map((member, idx) => (
        <div key={idx} className="mb-4 border-b pb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Member {idx + 1}{idx === 0 && " (You)"}</span>
            {members.length > 3 && idx !== 0 && (
              <button type="button" className="text-xs text-red-500" onClick={() => removeMember(idx)}>
                Remove
              </button>
            )}
          </div>
          <Input label="Full Name" value={member.fullName} onChange={e => handleChange(idx, "fullName", e.target.value)} error={errors[idx]?.fullName} required />
          <Input label="Email Address" type="email" value={member.email} onChange={e => handleChange(idx, "email", e.target.value)} error={errors[idx]?.email} required />
          <Input label="Phone Number" type="tel" value={member.phone} onChange={e => handleChange(idx, "phone", e.target.value)} />
          <label className="block text-sm mb-1">Role</label>
          <select className="mb-2 border rounded px-2 py-1" value={member.role} onChange={e => handleChange(idx, "role", e.target.value)}>
            {ROLES.map(role => {
              const taken = members.some((m, i) => i !== idx && m.role === role && role !== "Member");
              return (
                <option key={role} value={role} disabled={taken} style={taken ? { color: '#aaa' } : {}}>
                  {role}
                </option>
              );
            })}
          </select>
        </div>
      ))}
      <Button type="button" className="mb-4" onClick={addMember}>Add Member</Button>
      <div className="flex justify-between">
        <Button type="button" onClick={onBack} className="bg-gray-300 text-gray-800 hover:bg-gray-400">Back</Button>
        <Button type="submit" disabled={sending}>{sending ? "Sending..." : "Next"}</Button>
      </div>
    </form>
  );
};

export default MembersForm;
