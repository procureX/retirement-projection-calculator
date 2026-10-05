import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserById } from "../apis/userApi";
import { getProjectionsForUser, deleteProjection } from "../apis/projectionApi";
import type { User } from "../apis/userApi";
import ProjectionChart from "../components/ProjectionChart";

export default function UserProjections() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [projections, setProjections] = useState<any[]>([]);
  const [loadingProj, setLoadingProj] = useState(true);

  // Load user
  useEffect(() => {
    if (!id) return;

    getUserById(Number(id))
      .then((data) => {
        setUser(data);
        setLoadingUser(false);
      })
      .catch((err) => {
        console.error("User Load Error:", err);
        setError("Unable to load user.");
        setLoadingUser(false);
      });
  }, [id]);

  // Load projections
  useEffect(() => {
    if (!id) return;

    getProjectionsForUser(Number(id))
      .then((data) => {
        setProjections(data);
        setLoadingProj(false);
      })
      .catch((err) => {
        console.error("Projection Load Error:", err);
        setLoadingProj(false);
      });
  }, [id]);

  if (loadingUser) return <p>Loading user...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>No user found.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <Link to={`/users/${id}`} style={{ textDecoration: "none" }}>
        ← Back to User Detail
      </Link>

      <h1>Retirement Projections for {user.firstName} {user.lastName}</h1>

      <Link
        to={`/users/${id}/projections/new`}
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

      <hr style={{ margin: "2rem 0" }} />

      {!loadingProj && projections.length > 0 ? (
        <div style={{ marginTop: "1rem" }}>
          {projections.map((p) => (
            <div key={p.id} style={{ marginBottom: "2rem", minHeight: "300px" }}>
              <h3>Projection #{p.id}</h3>

              <button
                onClick={async () => {
                  try {
                    await deleteProjection(p.id);
                    setProjections(prev => prev.filter(x => x.id !== p.id));
                  } catch (err) {
                    console.error(err);
                    alert("Failed to delete projection.");
                  }
                }}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#dc3545",
                  color: "white",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  marginBottom: "1rem",
                }}
              >
                Delete Projection
              </button>

              <Link to={`/users/${id}/projections/${p.id}/edit`}
              style={{
                padding: "0.5rem 1rem",
                background: "#ffc107",
                color: "black",
                borderRadius: "6px",
                textDecoration: "none",
                marginRight: "1rem",
              }}
            >
              Edit Projection
            </Link>

            <ProjectionChart years={p.years} balances={p.balances} />
            </div>
          ))}
        </div>
      ) : (
        <p>No projections found.</p>
      )}
    </div>
  );
}

