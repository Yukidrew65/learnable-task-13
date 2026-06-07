import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { PlusIcon, UsersIcon } from "./Icons";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <nav className="navbar">
        <div className="navbar-inner">
          <NavLink to="/users" className="brand">
            <span className="brand-glyph">
              <UsersIcon size={16} />
            </span>
            Users
          </NavLink>

          <div className="nav-links">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
            >
              Directory
            </NavLink>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/add-user")}
              style={{ marginLeft: 8 }}
            >
              <PlusIcon size={16} />
              Add User
            </button>
          </div>
        </div>
      </nav>

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
