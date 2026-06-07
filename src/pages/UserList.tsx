import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchUsers,
  selectAllUsers,
  selectUserError,
  selectUserStatus,
} from "../store/userSlice";
import UserCard from "../components/UserCard";
import { PlusIcon, SearchIcon, UsersIcon } from "../components/Icons";

function SkeletonGrid() {
  return (
    <div className="user-grid" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="sk-row">
            <div className="sk sk-avatar" />
            <div style={{ flex: 1 }}>
              <div className="sk" style={{ height: 16, width: "55%" }} />
              <div
                className="sk"
                style={{ height: 12, width: "35%", marginTop: 8 }}
              />
            </div>
          </div>
          <div className="sk" style={{ height: 12, marginTop: 22 }} />
          <div
            className="sk"
            style={{ height: 12, width: "80%", marginTop: 10 }}
          />
        </div>
      ))}
    </div>
  );
}

export default function UserList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector(selectAllUsers);
  const status = useAppSelector(selectUserStatus);
  const error = useAppSelector(selectUserError);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.address.city.toLowerCase().includes(q)
    );
  }, [users, query]);

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1 className="title-large">Directory</h1>
          <p className="title-sub">
            {status === "loading"
              ? "Loading users…"
              : `${users.length} ${users.length === 1 ? "person" : "people"}`}
          </p>
        </div>
        <button className="btn btn-primary btn-lg" onClick={() => navigate("/add-user")}>
          <PlusIcon size={18} />
          Add User
        </button>
      </header>

      {status !== "loading" && users.length > 0 && (
        <div className="search">
          <SearchIcon size={18} className="search-icon" />
          <input
            type="search"
            placeholder="Search by name, email, or city"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search users"
          />
        </div>
      )}

      {status === "loading" && <SkeletonGrid />}

      {status === "failed" && (
        <div className="center-state">
          <h3>Couldn’t load users</h3>
          <p>{error}</p>
          <button
            className="btn btn-secondary"
            onClick={() => dispatch(fetchUsers())}
          >
            Try Again
          </button>
        </div>
      )}

      {status === "succeeded" && filtered.length === 0 && (
        <div className="center-state">
          <UsersIcon size={42} />
          <h3>{query ? "No matches" : "No users yet"}</h3>
          <p>
            {query
              ? "Try a different search term."
              : "Add your first user to get started."}
          </p>
          {!query && (
            <button
              className="btn btn-primary"
              onClick={() => navigate("/add-user")}
            >
              <PlusIcon size={16} />
              Add User
            </button>
          )}
        </div>
      )}

      {status === "succeeded" && filtered.length > 0 && (
        <div className="user-grid">
          {filtered.map((user, i) => (
            <UserCard key={user.id} user={user} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
