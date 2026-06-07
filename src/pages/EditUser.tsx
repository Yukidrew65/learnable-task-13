import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../components/UserForm";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchUsers,
  selectUserById,
  selectUserStatus,
} from "../store/userSlice";
import { ChevronLeftIcon } from "../components/Icons";

export default function EditUser() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
          <button className="btn btn-primary" onClick={() => navigate("/users")}>
            Back to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <button
        className="back-link"
        onClick={() => navigate(`/users/${user.id}`)}
      >
        <ChevronLeftIcon size={20} />
        {user.name}
      </button>
      <header className="page-head">
        <div>
          <h1 className="title-large">Edit User</h1>
          <p className="title-sub">Update {user.name}’s details.</p>
        </div>
      </header>
      <UserForm initialUser={user} />
    </div>
  );
}
