"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiPost } from "@/lib/api";
import type { RegisterRequest, RegisterResponse } from "@/types/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState<RegisterRequest>({
    name: "",
    lastName: "",
    email: "",
    emailconfirmed: "",
    password: "",
    phoneNumber: "",
    billingAddress: "",
    billingAddress2: "",
    postalCode: "",
    idCountry: 0,
    idProvince: 0,
    idCity: 0,
    idRole: 3,
  });

  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      const res: RegisterResponse = await apiPost("/User/CreateUser", form);
      console.log(res);
      router.push("/login");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Cannot create user");
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nombre"
      />
      <input
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        placeholder="Apellido"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="emailconfirmed"
        value={form.emailconfirmed}
        onChange={handleChange}
        placeholder="Confirmar Email"
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Contraseña"
      />

      <button type="submit">Crear cuenta</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
