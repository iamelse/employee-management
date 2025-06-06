// src/hooks/useEmployees.js
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/employees";

export default function useEmployees() {
  const [employees, setEmployees] = useState({
    items: [],
    totalItems: 0,
    pageNumber: 1,
    pageSize: 10,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmployees = async (page = 1, search = "") => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}?pageNumber=${page}&pageSize=${employees.pageSize}&searchTerm=${search}`);
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
      await fetchEmployees(employees.pageNumber, searchTerm);
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
      await fetchEmployees(employees.pageNumber, searchTerm);
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
      await fetchEmployees(employees.pageNumber, searchTerm);
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoadingDelete(false);
    }
  };

  // Ambil data awal saat mount
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
    setSearchTerm,
    searchTerm,
  };
}