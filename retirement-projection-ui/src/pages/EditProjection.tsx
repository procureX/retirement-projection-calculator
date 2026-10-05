import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProjectionById, updateProjection } from "../apis/projectionApi";

export default function EditProjection() {
  const { id, projId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [retirementAge, setRetirementAge] = useState<number>(0);
  const [annualContribution, setAnnualContribution] = useState<number>(0);
  const [expectedReturnRate, setExpectedReturnRate] = useState<number>(0);

  // Load projection + user
  useEffect(() => {
    if (!projId) return;

    getProjectionById(Number(projId))
      .then((p) => {
        setRetirementAge(p.retirementAge);
        setAnnualContribution(p.annualContribution);
        setExpectedReturnRate(p.expectedReturnRate);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Load Error:", err);
        setError("Unable to load projection.");
        setLoading(false);
      });
  }, [projId]);

  if (loading) return <p>Loading projection...</p>;
  if (error) return <p>{error}</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProjection(Number(projId), {
        userId: Number(id),
        retirementAge,
        annualContribution,
        expectedReturnRate,
      });

      navigate(`/users/${id}/projections`);
    } catch (err) {
      console.error(err);
      alert("Failed to update projection.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Link to={`/users/${id}/projections`} style={{ textDecoration: "none" }}>
        ← Back to Projections
      </Link>

      <h1>Edit Projection #{projId}</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
        }}
      >
        <label>
          Retirement Age:
          <input
            type="number"
            value={retirementAge}
            onChange={(e) => setRetirementAge(Number(e.target.value))}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </label>

        <label>
          Annual Contribution:
          <input
            type="number"
            value={annualContribution}
            onChange={(e) => setAnnualContribution(Number(e.target.value))}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </label>

        <label>
          Expected Return Rate (0.07 = 7%):
          <input
            type="number"
            step="0.01"
            value={expectedReturnRate}
            onChange={(e) => setExpectedReturnRate(Number(e.target.value))}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </label>

        <button
          type="submit"
          style={{
            padding: "0.75rem 1rem",
            background: "#28a745",
            color: "white",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
