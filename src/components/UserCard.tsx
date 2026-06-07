import { useNavigate } from "react-router-dom";
import type { User } from "../types/user";
import { useAppDispatch } from "../store/hooks";
import { deleteUser } from "../store/userSlice";
import { useToast } from "./Toast";
import { getAvatarColor, getInitials } from "../utils/avatar";
import { MailIcon, MapPinIcon, PencilIcon, TrashIcon } from "./Icons";

interface Props {
  user: User;
  index?: number;
}

export default function UserCard({ user, index = 0 }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const handleDelete = () => {
    if (
      window.confirm(
        `Delete ${user.name}? This removes them from the local directory.`
      )
    ) {
      dispatch(deleteUser(user.id));
      showToast(`${user.name} deleted`);
    }
  };

  return (
    <article
      className="card user-card"
      style={{ animationDelay: `${Math.min(index, 12) * 0.045}s` }}
    >
      <div
        className="user-card-body"
        role="button"
        tabIndex={0}
        onClick={() => navigate(`/users/${user.id}`)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            navigate(`/users/${user.id}`);
          }
        }}
      >
        <div
          className="avatar"
          style={{ background: getAvatarColor(user.name) }}
          aria-hidden="true"
        >
          {getInitials(user.name)}
        </div>
        <div className="user-meta">
          <div className="user-name">{user.name}</div>
          <div className="user-username">@{user.username}</div>
        </div>
      </div>

      <div className="user-rows">
        <div className="user-row">
          <MailIcon size={17} className="ic" />
          <span className="val">{user.email}</span>
        </div>
        <div className="user-row">
          <MapPinIcon size={17} className="ic" />
          <span className="val muted">
            {user.address.suite}, {user.address.street}, {user.address.city}{" "}
            {user.address.zipcode}
          </span>
        </div>
      </div>

      <div className="card-actions">
        <button
          className="edit"
          onClick={() => navigate(`/edit-user/${user.id}`)}
        >
          <PencilIcon size={16} />
          Edit
        </button>
        <button className="delete" onClick={handleDelete}>
          <TrashIcon size={16} />
          Delete
        </button>
      </div>
    </article>
  );
}
