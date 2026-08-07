export const effectiveStatus = (pass) => {
  if (pass.status === "pending") {
    const now = new Date();
    const visitDate = pass.visit_date; // yyyy-mm-dd
    const expiry = new Date(`${visitDate}T${pass.expiry_time}`);
    if (now > expiry) return "expired";
  }
  return pass.status;
};

export const isActionable = (pass) => {
  const s = effectiveStatus(pass);
  return s === "pending" || s === "checked_in";
};
