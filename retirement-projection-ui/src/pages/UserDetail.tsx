import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { deleteUser, getUserById } from "../apis/userApi";
import { getProjectionsForUser } from "../apis/projectionApi";
import type { User } from "../apis/userApi";
import ProjectionChart from "../components/ProjectionChart";

export default function UserDetail() {
  const { id } = useParams();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [projections, setProjections] = useState<any[]>([]);
  const [projLoading, setProjLoading] = useState(true);

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

  // Load projections
  useEffect(() => {
    if (!id) return;

    getProjectionsForUser(Number(id))
      .then((data) => {
        setProjections(data);
        setProjLoading(false);
      })
      .catch((err) => {
        console.error("Projection Load Error:", err);
        setProjLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading user...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>No user found.</p>;

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

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <Link
        to={`/users/${user.id}/edit`}
        style={{
          padding: "0.5rem 1rem",
          background: "#ffc107",
          color: "black",
          borderRadius: "6px",
          textDecoration: "none",
        }}>
          Update User
        </Link>
        <button
        onClick={async () => {await deleteUser(user.id);
          window.location.href = "/";}}
          style={{
            padding: "0.5rem 1rem",
            background: "#dc3545",
            color: "white",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}>
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
        }}>
          View Projections
        </Link>
      </div>

      <hr style={{ margin: "2rem 0" }} />

      <h2>Retirement Projections</h2>
      {!projLoading && projections.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          {projections.map((p) => (
            <div key={p.id} style={{ marginBottom: "2rem", minHeight: "300px" }}>
              <h3>Projection #{p.id}</h3>
              <ProjectionChart years={p.years} balances={p.balances} />
            </div>
          ))}
        </div>
      )}

      <Link
        to={`/users/${user.id}/projections/new`}
        style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.75rem 1rem",
          background: "#007bff",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        Create New Projection
      </Link>
    </div>
  );
}
