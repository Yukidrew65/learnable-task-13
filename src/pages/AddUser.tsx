import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { ChevronLeftIcon } from "../components/Icons";

export default function AddUser() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <button className="back-link" onClick={() => navigate("/users")}>
        <ChevronLeftIcon size={20} />
        Directory
      </button>
      <header className="page-head">
        <div>
          <h1 className="title-large">New User</h1>
          <p className="title-sub">Add a person to the local directory.</p>
        </div>
      </header>
      <UserForm />
    </div>
  );
}
