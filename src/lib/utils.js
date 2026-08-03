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
