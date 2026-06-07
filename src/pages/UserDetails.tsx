import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  deleteUser,
  fetchUsers,
  selectUserById,
  selectUserStatus,
} from "../store/userSlice";
import { useToast } from "../components/Toast";
import { getAvatarColor, getInitials } from "../utils/avatar";
import {
  BuildingIcon,
  ChevronLeftIcon,
  GlobeIcon,
  MailIcon,
  PencilIcon,
  PhoneIcon,
  TrashIcon,
} from "../components/Icons";

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const status = useAppSelector(selectUserStatus);
  const user = useAppSelector(selectUserById(userId));

  useEffect(() => {
    if (status === "idle") dispatch(fetchUsers());
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="page">
        <div className="center-state">
          <div className="spinner" />
          <p>Loading…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page">
        <div className="center-state">
          <h3>User not found</h3>
          <p>This user may have been deleted.</p>
          <button className="btn btn-primary" onClick={() => navigate("/users")}>
            Back to Directory
          </button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Delete ${user.name}?`)) {
      dispatch(deleteUser(user.id));
      showToast(`${user.name} deleted`);
      navigate("/users");
    }
  };

  return (
    <div className="page">
      <button className="back-link" onClick={() => navigate("/users")}>
        <ChevronLeftIcon size={20} />
        Directory
      </button>

      <div className="detail-card">
        <div className="detail-hero">
          <div
            className="avatar avatar-lg"
            style={{ background: getAvatarColor(user.name) }}
            aria-hidden="true"
          >
            {getInitials(user.name)}
          </div>
          <div>
            <h1>{user.name}</h1>
            <div className="sub">@{user.username}</div>
          </div>
        </div>

        <div className="detail-section-label">Contact</div>
        <div className="detail-list">
          <div className="row">
            <span className="k">
              <MailIcon size={16} /> Email
            </span>
            <span className="v">
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </span>
          </div>
          <div className="row">
            <span className="k">
              <PhoneIcon size={16} /> Phone
            </span>
            <span className="v">{user.phone || "—"}</span>
          </div>
          <div className="row">
            <span className="k">
              <GlobeIcon size={16} /> Website
            </span>
            <span className="v">{user.website || "—"}</span>
          </div>
        </div>

        <div className="detail-section-label">Address</div>
        <div className="detail-list">
          <div className="row">
            <span className="k">Street</span>
            <span className="v">
              {user.address.suite}, {user.address.street}
            </span>
          </div>
          <div className="row">
            <span className="k">City</span>
            <span className="v">{user.address.city}</span>
          </div>
          <div className="row">
            <span className="k">Zip Code</span>
            <span className="v">{user.address.zipcode}</span>
          </div>
        </div>

        <div className="detail-section-label">Company</div>
        <div className="detail-list">
          <div className="row">
            <span className="k">
              <BuildingIcon size={16} /> Name
            </span>
            <span className="v">{user.company.name || "—"}</span>
          </div>
          {user.company.catchPhrase && (
            <div className="row">
              <span className="k">Tagline</span>
              <span className="v">{user.company.catchPhrase}</span>
            </div>
          )}
        </div>

        <div className="detail-footer">
          <button
            className="btn btn-secondary btn-lg"
            onClick={() => navigate(`/edit-user/${user.id}`)}
          >
            <PencilIcon size={17} />
            Edit
          </button>
          <button className="btn btn-destructive btn-lg" onClick={handleDelete}>
            <TrashIcon size={17} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
