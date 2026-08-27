import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getUserById, deleteUser } from "../apis/userApi";
import type { User } from "../apis/userApi";

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user
  useEffect(() => {
    if (!id) return;

    getUserById(Number(id))
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("User Detail Error:", err);
        setError("Unable to load user.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading user...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>No user found.</p>;

  const handleDelete = async () => {
    await deleteUser(user.id);
    navigate("/");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        ← Back to Dashboard
      </Link>

      <h1>{user.firstName} {user.lastName}</h1>

      <div style={{ marginTop: "1rem" }}>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Current Salary:</strong> ${user.currentSalary.toLocaleString()}</p>
      </div>

      {/* ONLY THE UPDATE/DELETE/VIEW BUTTONS */}
      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <Link
          to={`/users/${user.id}/edit`}
          style={{
            padding: "0.5rem 1rem",
            background: "#ffc107",
            color: "black",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          Update User
        </Link>

        <button
          onClick={handleDelete}
          style={{
            padding: "0.5rem 1rem",
            background: "#dc3545",
            color: "white",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Delete User
        </button>

        <Link
          to={`/users/${user.id}/projections`}
          style={{
            padding: "0.5rem 1rem",
            background: "#007bff",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          View Projections
        </Link>
      </div>
    </div>
  );
}
