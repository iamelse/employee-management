// src/hooks/useEmployees.js
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/employees";

export default function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Gagal mengambil data");
      const data = await res.json();
      setEmployees(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (employeeData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      });
      if (!res.ok) throw new Error("Gagal menambah data");
      await fetchEmployees();
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (id, employeeData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      });
      if (!res.ok) throw new Error("Gagal mengupdate data");
      await fetchEmployees();
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    setLoadingDelete(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus data");
      await fetchEmployees();
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoadingDelete(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    loading,
    loadingDelete,
    error,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    fetchEmployees,
  };
}