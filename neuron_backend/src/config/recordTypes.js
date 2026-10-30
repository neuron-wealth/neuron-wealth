// Every website form that saves a submission. Drives validation, storage, the admin
// record screens and the dashboard.
const STANDARD_STATUSES = ["New", "In review", "Closed"];

const field = (key, label, kind, extra = {}) => ({ key, label, kind, max: 200, required: false, ...extra });

const PEARL_COUNTS_NOW = ["0", "1", "2", "3 or more"];
const PEARL_COUNTS_DECADE = ["0 - 1", "2 - 3", "4 - 5", "6 or more"];
const PEARL_OBJECTIVES = [
  "Becoming rich, faster",
  "Maximizing return",
  "Optimizing tax and better after-tax return",
  "Managing and Sustaining Wealth",
  "Streamline investments, compliance and finances",
];
const PEARL_REASONS = [
  "I have money",
  "I have reputation",
  "I have connections",
  "NWA can better manage my wealth, taxes and compliance",
  "NWA can simplify financial life for me and/or my family",
  "Both are good at heart and can grow together",
];

const RECORD_TYPES = {
  enquiries: {
    model: "Enquiry",
    label: "Contact Enquiry",
    plural: "Contact Enquiries",
    description: "Messages sent from the Contact Us form.",
    statuses: STANDARD_STATUSES,
    publicForm: true,
    columns: { primary: "name", secondary: "email", topic: "subject", topicLabel: "Subject" },
    fields: [
      field("name", "Full Name", "text", { required: true, max: 120, requiredMessage: "Full name is required." }),
      field("email", "Email", "email", { required: true, max: 160, requiredMessage: "A valid email address is required." }),
      field("organization", "Organization", "text", { max: 160 }),
      field("subject", "Subject", "text", { required: true, max: 200, requiredMessage: "Subject is required." }),
      field("message", "Message", "textarea", { required: true, max: 5000, requiredMessage: "Advisory overview/message is required." }),
    ],
    successMessage:
      "Thank you! Your confidential advisory enquiry has been received. Our advisory desk will get in touch with you shortly.",
  },
  callbacks: {
    model: "CallbackRequest",
    label: "Call Back Request",
    plural: "Call Back Requests",
    description: "Requests from the Request a Call Back forms.",
    statuses: STANDARD_STATUSES,
    publicForm: true,
    columns: { primary: "name", secondary: "phone", topic: "service", topicLabel: "Service" },
    fields: [
      field("name", "Name", "text", { required: true, max: 120, requiredMessage: "Please enter your name." }),
      field("phone", "Phone", "phone", { required: true, max: 30, requiredMessage: "Please enter a valid phone number." }),
      field("service", "Service", "text", { max: 120 }),
    ],
    successMessage: "Thank you! Your call back request has been received. Our team will call you shortly.",
  },
  assessments: {
    model: "PearlAssessment",
    label: "Pearl Assessment",
    plural: "Pearl Assessments",
    description: "Answers from the Interested in Becoming a Pearl? form.",
    statuses: STANDARD_STATUSES,
    publicForm: true,
    columns: { primary: "name", secondary: "email", topic: "objective", topicLabel: "Primary Objective" },
    fields: [
      field("name", "Name", "text", { required: true, max: 120, requiredMessage: "Please provide your name." }),
      field("email", "Email", "email", { required: true, max: 160, requiredMessage: "Please provide a valid email address." }),
      field("mobile", "Mobile", "phone", { required: true, max: 30, requiredMessage: "Please provide your mobile number." }),
      field("advisorsNow", "Investment advisors or mutual fund distributors / agents currently working with", "select", {
        required: true,
        options: PEARL_COUNTS_NOW,
        requiredMessage: "Please answer Question 1 (Current advisors / agents).",
      }),
      field("advisorsDecade", "Investment advisors or agents worked with during last 10 years (including current)", "select", {
        required: true,
        options: PEARL_COUNTS_DECADE,
        requiredMessage: "Please answer Question 2 (Advisors in last 10 years).",
      }),
      field("taxAdvisorsDecade", "CAs or tax advisors worked with during last 10 years (including current)", "select", {
        required: true,
        options: PEARL_COUNTS_DECADE,
        requiredMessage: "Please answer Question 3 (Tax advisors in last 10 years).",
      }),
      field("objective", "Primary (No. 1) objective of associating with us", "select", {
        required: true,
        options: PEARL_OBJECTIVES,
        requiredMessage: "Please choose your Primary Objective (Question 4).",
      }),
      field("reason", "Primary (No. 1) reason why NWA should associate with you", "select", {
        required: true,
        options: PEARL_REASONS,
        requiredMessage: "Please choose your Primary Reason for Association (Question 5).",
      }),
      field("additionalInfo", "Any other information", "textarea", { max: 3000 }),
    ],
    successMessage:
      "Thank you! Your assessment has been received. Our advisory partners will review it in confidence and get in touch with you.",
  },
  subscribers: {
    model: "Subscriber",
    label: "Newsletter Subscriber",
    plural: "Newsletter Subscribers",
    description: "Email addresses from the Subscribe to Neuron Wealth Connect form.",
    statuses: ["Subscribed", "Unsubscribed"],
    publicForm: true,
    uniqueField: "email",
    columns: { primary: "email", secondary: "name", topic: "", topicLabel: "" },
    fields: [
      field("email", "Email", "email", { required: true, max: 160, requiredMessage: "Please enter a valid email address." }),
      field("name", "Name", "text", { max: 120 }),
    ],
    successMessage: "Thank you for subscribing to Neuron Wealth Connect.",
  },
  careers: {
    model: "Career",
    label: "Career Application",
    plural: "Career Applications",
    description: "Job applications held by the admin.",
    statuses: STANDARD_STATUSES,
    publicForm: false,
    columns: { primary: "name", secondary: "email", topic: "role", topicLabel: "Role" },
    fields: [
      field("name", "Name", "text", { required: true, max: 120, requiredMessage: "Name is required." }),
      field("email", "Email", "email", { required: true, max: 160, requiredMessage: "A valid email address is required." }),
      field("role", "Role", "text", { max: 120 }),
      field("phone", "Phone", "phone", { max: 30 }),
      field("resumeUrl", "Resume Link", "url", { max: 500 }),
      field("message", "Message", "textarea", { max: 5000 }),
    ],
    successMessage: "Thank you! Your application has been received.",
  },
};

const RECORD_KEYS = Object.keys(RECORD_TYPES);

// Admin-only fields every record carries.
const NOTES_MAX = 3000;
const SOURCE_MAX = 200;

function publicDefinition(key) {
  const def = RECORD_TYPES[key];
  return {
    key,
    label: def.label,
    plural: def.plural,
    description: def.description,
    statuses: def.statuses,
    columns: def.columns,
    publicForm: def.publicForm,
    fields: def.fields.map(({ requiredMessage, ...rest }) => rest),
  };
}

module.exports = { RECORD_TYPES, RECORD_KEYS, STANDARD_STATUSES, NOTES_MAX, SOURCE_MAX, publicDefinition };
