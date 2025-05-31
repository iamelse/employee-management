import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL + '/employees';

function EmployeeForm({ onSubmit, onCancel, initialData, loading }) {
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    jobPositions: [{ id: 1, jobName: "", startDate: "", endDate: "", salary: 0, status: "" }],
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        jobPositions: [{ id: 1, jobName: "", startDate: "", endDate: "", salary: 0, status: "" }],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleJobChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      jobPositions: [{ ...f.jobPositions[0], [name]: value }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md max-w-xl mx-auto mb-8">
      <h2 className="text-xl font-semibold mb-4">{initialData ? "Edit Karyawan" : "Tambah Karyawan"}</h2>

      <label className="block mb-3">
        <span className="block text-gray-700 mb-1">First Name</span>
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          disabled={loading}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      <label className="block mb-3">
        <span className="block text-gray-700 mb-1">Middle Name</span>
        <input
          type="text"
          name="middleName"
          value={form.middleName}
          onChange={handleChange}
          disabled={loading}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      <label className="block mb-3">
        <span className="block text-gray-700 mb-1">Last Name</span>
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          disabled={loading}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      <label className="block mb-3">
        <span className="block text-gray-700 mb-1">Date of Birth</span>
        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth.slice(0, 10)} // just yyyy-mm-dd
          onChange={handleChange}
          disabled={loading}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      <label className="block mb-3">
        <span className="block text-gray-700 mb-1">Gender</span>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          disabled={loading}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">-- Pilih --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </label>

      <label className="block mb-3">
        <span className="block text-gray-700 mb-1">Address</span>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          disabled={loading}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      <h3 className="text-lg font-semibold mb-2">Job Position</h3>

      <label className="block mb-3">
        <span className="block text-gray-700 mb-1">Job Name</span>
        <input
          type="text"
          name="jobName"
          value={form.jobPositions[0].jobName}
          onChange={handleJobChange}
          disabled={loading}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      <label className="block mb-3">
        <span className="block text-gray-700 mb-1">Start Date</span>
        <input
          type="date"
          name="startDate"
          value={form.jobPositions[0].startDate.slice(0, 10) || ""}
          onChange={handleJobChange}
          disabled={loading}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      <label className="block mb-3">
        <span className="block text-gray-700 mb-1">End Date</span>
        <input
          type="date"
          name="endDate"
          value={form.jobPositions[0].endDate ? form.jobPositions[0].endDate.slice(0, 10) : ""}
          onChange={handleJobChange}
          disabled={loading}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      <label className="block mb-3">
        <span className="block text-gray-700 mb-1">Salary</span>
        <input
          type="number"
          name="salary"
          value={form.jobPositions[0].salary}
          onChange={handleJobChange}
          disabled={loading}
          required
          min={0}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      <label className="block mb-6">
        <span className="block text-gray-700 mb-1">Status</span>
        <input
          type="text"
          name="status"
          value={form.jobPositions[0].status}
          onChange={handleJobChange}
          disabled={loading}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </label>

      <div className="flex justify-end gap-4">
        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
            disabled={loading}
          >
            Batal
          </button>
        )}
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Memproses..." : initialData ? "Update" : "Tambah"}
        </button>
      </div>
    </form>
  );
}

function EmployeeTable({ employees, onEdit, onDelete, loadingDelete }) {
  if (!employees.length) {
    return <p className="text-center text-gray-500 mt-6">Data karyawan tidak ditemukan.</p>;
  }

  return (
    <div className="overflow-x-auto max-w-6xl mx-auto shadow-md rounded-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Nama Lengkap</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Posisi</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Gaji</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Umur</th>
            <th className="px-4 py-3 text-center text-sm font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((emp) => {
            const job = emp.jobPositions[0] || {};
            const age = new Date().getFullYear() - new Date(emp.dateOfBirth).getFullYear();
            return (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{emp.id}</td>
                <td className="px-4 py-3 text-sm">
                  {emp.firstName} {emp.middleName} {emp.lastName}
                </td>
                <td className="px-4 py-3 text-sm">{job.jobName || "-"}</td>
                <td className="px-4 py-3 text-sm">Rp {job.salary?.toLocaleString() || "-"}</td>
                <td className="px-4 py-3 text-sm">{job.status || "-"}</td>
                <td className="px-4 py-3 text-sm">{age} tahun</td>
                <td className="px-4 py-3 text-sm text-center space-x-2">
                  <button
                    onClick={() => onEdit(emp.id)}
                    className="text-indigo-600 hover:text-indigo-900 font-semibold"
                    aria-label={`Edit ${emp.firstName}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Hapus karyawan ${emp.firstName}?`)) {
                        onDelete(emp.id);
                      }
                    }}
                    disabled={loadingDelete}
                    className="text-red-600 hover:text-red-900 font-semibold disabled:opacity-50"
                    aria-label={`Hapus ${emp.firstName}`}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch employees from API
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

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (employeeData) => {
    setLoading(true);
    setError(null);
    try {
      if (editingId) {
        // Update existing
        const res = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employeeData),
        });
        if (!res.ok) throw new Error("Gagal mengupdate data");
      } else {
        // Create new
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employeeData),
        });
        if (!res.ok) throw new Error("Gagal menambah data");
      }
      setEditingId(null);
      fetchEmployees();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoadingDelete(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus data");
      fetchEmployees();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => setEditingId(null);

  const employeeToEdit = employees.find((emp) => emp.id === editingId) || null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">Manajemen Karyawan</h1>

      <EmployeeForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialData={employeeToEdit}
        loading={loading}
      />

      {loading && <p className="text-center text-gray-500">Memuat data karyawan...</p>}

      {error && <p className="text-center text-red-600">Error: {error}</p>}

      <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loadingDelete={loadingDelete}
      />
    </div>
  );
}