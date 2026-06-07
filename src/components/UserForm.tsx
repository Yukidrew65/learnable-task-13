import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { NewUser, User } from "../types/user";
import { useAppDispatch } from "../store/hooks";
import { addUser, updateUser } from "../store/userSlice";
import { useToast } from "./Toast";

interface Props {
  /** When provided the form is in edit mode and is prefilled. */
  initialUser?: User;
}

interface FormState {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  company: string;
}

function toFormState(user?: User): FormState {
  return {
    name: user?.name ?? "",
    username: user?.username ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    website: user?.website ?? "",
    street: user?.address.street ?? "",
    suite: user?.address.suite ?? "",
    city: user?.address.city ?? "",
    zipcode: user?.address.zipcode ?? "",
    company: user?.company.name ?? "",
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function UserForm({ initialUser }: Props) {
  const isEdit = Boolean(initialUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const [form, setForm] = useState<FormState>(toFormState(initialUser));
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const set =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next: { name?: string; email?: string } = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!EMAIL_RE.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate() || submitting) return;
    setSubmitting(true);

    const payload: NewUser = {
      name: form.name.trim(),
      username:
        form.username.trim() ||
        form.name.trim().toLowerCase().replace(/\s+/g, ""),
      email: form.email.trim(),
      phone: form.phone.trim(),
      website: form.website.trim(),
      address: {
        street: form.street.trim(),
        suite: form.suite.trim(),
        city: form.city.trim(),
        zipcode: form.zipcode.trim(),
        geo: initialUser?.address.geo,
      },
      company: {
        name: form.company.trim(),
        catchPhrase: initialUser?.company.catchPhrase,
        bs: initialUser?.company.bs,
      },
    };

    try {
      if (isEdit && initialUser) {
        const updated = await dispatch(
          updateUser({ ...payload, id: initialUser.id })
        ).unwrap();
        showToast("Changes saved");
        navigate(`/users/${updated.id}`);
      } else {
        await dispatch(addUser(payload)).unwrap();
        showToast("User added");
        navigate("/users");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-wrap">
      <div className="form-group-title">Profile</div>
      <div className="form-group">
        <div className={"field" + (errors.name ? " invalid" : "")}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={form.name}
            onChange={set("name")}
            placeholder="Full name"
            autoComplete="off"
          />
        </div>
        {errors.name && <div className="field-error">{errors.name}</div>}

        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={form.username}
            onChange={set("username")}
            placeholder="Optional"
            autoComplete="off"
          />
        </div>

        <div className={"field" + (errors.email ? " invalid" : "")}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="name@example.com"
            autoComplete="off"
          />
        </div>
        {errors.email && <div className="field-error">{errors.email}</div>}

        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            value={form.phone}
            onChange={set("phone")}
            placeholder="Optional"
          />
        </div>

        <div className="field">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            value={form.website}
            onChange={set("website")}
            placeholder="Optional"
          />
        </div>
      </div>

      <div className="form-group-title">Address</div>
      <div className="form-group">
        <div className="field">
          <label htmlFor="street">Street</label>
          <input id="street" value={form.street} onChange={set("street")} />
        </div>
        <div className="field">
          <label htmlFor="suite">Suite</label>
          <input id="suite" value={form.suite} onChange={set("suite")} />
        </div>
        <div className="field">
          <label htmlFor="city">City</label>
          <input id="city" value={form.city} onChange={set("city")} />
        </div>
        <div className="field">
          <label htmlFor="zipcode">Zip Code</label>
          <input id="zipcode" value={form.zipcode} onChange={set("zipcode")} />
        </div>
      </div>

      <div className="form-group-title">Company</div>
      <div className="form-group">
        <div className="field">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            value={form.company}
            onChange={set("company")}
            placeholder="Optional"
          />
        </div>
      </div>

      <div className="form-actions">
        <button
          className="btn btn-secondary btn-lg"
          onClick={() => navigate(-1)}
          type="button"
        >
          Cancel
        </button>
        <button
          className="btn btn-primary btn-lg"
          onClick={handleSubmit}
          disabled={submitting}
          type="button"
        >
          {isEdit ? "Save Changes" : "Add User"}
        </button>
      </div>
    </div>
  );
}
