import { API_URL } from "./config";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  currentSalary: number;
}

export interface Projection {
  id: number;
  userId: number;
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  annualContribution: number;
  annualReturnRate: number;
  projectedSavings: number;
}

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${API_URL}/Users`);
  return res.json();
}

export async function getUserProjections(id: number): Promise<Projection[]> {
  const res = await fetch(`${API_URL}/RetirementProjections/user/${id}`);
  return res.json();
}

export async function createUser(user: Partial<User>): Promise<User> {
  const res = await fetch(`${API_URL}/Users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function createProjection(projection: Partial<Projection>): Promise<Projection> {
  const res = await fetch(`${API_URL}/RetirementProjections`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projection),
  });
  return res.json();
}

export async function getUserById(id: number): Promise<User> {
  const res = await fetch(`${API_URL}/Users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function updateUser(
  id: number,
  data: {
    firstName: string;
    lastName: string;
    age: number;
    currentSalary: number;
  }
): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update user");
  }
}

export async function deleteUser(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }
}
