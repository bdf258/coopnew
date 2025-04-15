import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const USER_ID = process.env.REACT_APP_EMAILJS_USER_ID;

const sendEmails = async (formData) => {
  const memberEmails = formData.members.map((m) => m.email);
  // Format all form data as a readable message
  const message = `Co-op setup submission:\n\n` +
    `Co-op Name: ${formData.initial?.coopName || ""}\nPurpose: ${formData.initial?.purpose || ""}\nDescription: ${formData.initial?.description || ""}` +
    `\n\nMembers:\n` +
    (formData.members || []).map((m, i) => `Member ${i + 1}:\n  Name: ${m.fullName}\n  Email: ${m.email}\n  Phone: ${m.phone}\n  Role: ${m.role}`).join("\n\n");

  const emailVars = {
    email: "ben@dunnflores.com",
    message,
    name: formData.initial?.coopName || "New Co-op Submission",
    time: new Date().toLocaleString(),
  };
  try {
    // Send to admin
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, emailVars, USER_ID);
  } catch (err) {
    console.error("Failed to send email to admin:", err);
  }
  // Send to all members
  for (const email of memberEmails) {
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, { ...emailVars, email }, USER_ID);
    } catch (err) {
      console.error(`Failed to send email to member: ${email}`, err);
    }
  }
};

export default sendEmails;
