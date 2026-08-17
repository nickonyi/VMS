import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

export const roleOptions = [
  {
    value: "resident",
    label: "Resident",
    description: "Invite and manage your guests",
  },
  {
    value: "guard",
    label: "Security Guard",
    description: "Scan and verify visitors at the gate",
  },
  {
    value: "admin",
    label: "Administrator",
    description: "Manage users and view analytics",
  },
];

export const VISIT_PURPOSES = [
  { value: "family", label: "Family visit" },
  { value: "delivery", label: "Delivery" },
  { value: "maintenance", label: "Maintenance" },
  { value: "business", label: "Business" },
  { value: "other", label: "Other" },
];

export const ROLE_HOME = {
  resident: "/resident",
  contractor: "/resident",
  guard: "/guard",
  admin: "/admin",
};

export const DEMO = {
  resident: { email: "resident@demo.com", label: "Resident" },
  guard: { email: "guard@demo.com", label: "Security Guard" },
  admin: { email: "admin@demo.com", label: "Administrator" },
};

export function formatDate(value) {
  const d = typeof value === "string" ? new Date(value) : value;

  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(value) {
  const d = typeof value === "string" ? new Date(value) : value;

  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatDateTime(value) {
  if (!value) return "—";

  return new Date(value).toLocaleString("en-US", {
    timeZone: APP_TIMEZONE,
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function combineDateAndTime(date, time) {
  return `${date}T${time}:00`;
}

export function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export const filters = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "checked_in", label: "Checked In" },
  { value: "checked_out", label: "Checked Out" },
  { value: "expired", label: "Expired" },
  { value: "cancelled", label: "Cancelled" },
];
