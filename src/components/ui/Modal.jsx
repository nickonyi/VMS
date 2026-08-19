import { useEffect, useState } from "react";
import { X, Power, UserPlus } from "lucide-react";
import { cn } from "../../lib/utils";
import { updateProfile, createProfileViaSignup } from "../../hooks/useProfiles";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  className,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl",
          "animate-[slideUp_0.2s_ease-out] max-h-[92vh] overflow-y-auto",
          className,
        )}
      >
        <div className="sticky top-0 flex items-start justify-between gap-4 p-5 sm:p-6 bg-white border-b border-slate-100">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-slate-500 mt-0.5">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 -mr-1 -mt-1 h-9 w-9 inline-flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5 sm:p-6">{children}</div>
      </div>
    </div>
  );
}

export function EditUserModal({ user, onClose, onSaved, onToast }) {
  const [fullName, setFullName] = useState(user.full_name);
  const [role, setRole] = useState(user.role);
  const [unit, setUnit] = useState(user.unit ?? "");
  const [email, setEmail] = useState(user.email ?? "");
  const [phone, setPhone] = useState(user.phone ?? "");
  const [active, setActive] = useState(user.status === "active");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await updateProfile(user.id, {
        fullName: fullName.trim(),
        role,
        email,
        unit: unit.trim() || null,
        phone: phone.trim() || null,
        active,
      });
      onToast("User updated successfully.", "success");
      onSaved();
    } catch (err) {
      onToast(
        err instanceof Error ? err.message : "Failed to update user.",
        "error",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      open
      onClose={onClose}
      title="Edit User"
      description={`${user.full_name}`}
    >
      <div className="space-y-4">
        <Input
          label="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Select
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="resident">Resident</option>
          <option value="guard">Security Guard</option>
          <option value="contractor">Contractor</option>
          <option value="admin">Administrator</option>
        </Select>
        <Input
          label="Unit"
          disabled={true}
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          placeholder="e.g. A-204"
        />
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@mail.com"
        />
        <Input
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1 555 000 1234"
        />
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
          />
          <span className="text-sm text-slate-700 flex items-center gap-1.5">
            <Power className="h-4 w-4" /> Account active
          </span>
        </label>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button loading={saving} onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export function CreateUserModal({ onClose, onSaved, onToast }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("resident");
  const [unit, setUnit] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleCreate() {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      onToast("Name, email, and password are required.", "error");
      return;
    }
    if (password.length < 6) {
      onToast("Password must be at least 6 characters.", "error");
      return;
    }
    setSaving(true);
    try {
      await createProfileViaSignup({
        email: email.trim(),
        password,
        fullName: fullName.trim(),
        role,
        unit: unit.trim() || undefined,
        phone: phone.trim() || undefined,
      });
      onToast("User created successfully.", "success");
      onSaved();
    } catch (err) {
      onToast(
        err instanceof Error ? err.message : "Failed to create user.",
        "error",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      open
      onClose={onClose}
      title="Add New User"
      description="Create a new resident, guard, or admin account."
    >
      <div className="space-y-4">
        <Input
          label="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Jane Doe"
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@example.com"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
        />
        <Select
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="resident">Resident</option>
          <option value="guard">Security Guard</option>
          <option value="contractor">Contractor</option>
          <option value="admin">Administrator</option>
        </Select>
        {role === "resident" && (
          <Input
            label="Unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="e.g. A-204"
          />
        )}
        <Input
          label="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1 555 000 1234"
        />
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button loading={saving} onClick={handleCreate}>
            <UserPlus className="h-4 w-4" /> Create User
          </Button>
        </div>
      </div>
    </Modal>
  );
}
