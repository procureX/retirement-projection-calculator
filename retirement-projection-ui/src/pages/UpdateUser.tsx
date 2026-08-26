import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getUserById, updateUser } from "../apis/userApi";
import type { User } from "../apis/userApi";

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load existing user data
  useEffect(() => {
    if (!id) return;

    getUserById(Number(id))
      .then((data) => {
        setForm(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Update User Load Error:", err);
        setError("Unable to load user.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading user...</p>;
  if (error) return <p>{error}</p>;
  if (!form) return <p>No user found.</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateUser(Number(id), {
        firstName: form.firstName,
        lastName: form.lastName,
        age: Number(form.age),
        currentSalary: Number(form.currentSalary),
      });

      navigate(`/users/${id}`);
    } catch (err) {
      console.error("Update User Error:", err);
      alert("Failed to update user.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Link to={`/users/${id}`} style={{ textDecoration: "none" }}>
        ← Back to User Detail
      </Link>

      <h1>Update User</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
        }}
      >
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />

        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />

        <input
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
        />

        <input
          name="currentSalary"
          type="number"
          value={form.currentSalary}
          onChange={handleChange}
          placeholder="Current Salary"
        />

        <button
          type="submit"
          style={{
            padding: "0.75rem 1rem",
            background: "#28a745",
            color: "white",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
