import { API_URL } from "./config";

export interface ProjectionInput {
  userId: number;
  retirementAge: number;
  annualContribution: number;
  expectedReturnRate: number;
}

export async function createProjection(input: ProjectionInput) {
  const res = await fetch(`${API_URL}/RetirementProjections`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) throw new Error("Failed to create projection");
  return res.json();
}

export async function getProjectionsForUser(userId: number) {
  const res = await fetch(`${API_URL}/Users/${userId}/projections`);
  if (!res.ok) throw new Error("Failed to load projections");
  return res.json();
}

export async function deleteProjection(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/RetirementProjections/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete projection");
  }
}
