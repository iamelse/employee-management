// src/components/EmployeeForm.jsx
import React, { useEffect, useState } from "react";

const emptyJobPosition = { id: 1, jobName: "", startDate: "", endDate: "", salary: 0, status: "" };

export default function EmployeeForm({ initialData, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    jobPositions: [emptyJobPosition],
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        dateOfBirth: initialData.dateOfBirth?.slice(0, 10) || "",
        jobPositions: initialData.jobPositions.length ? initialData.jobPositions.map(j => ({
          ...j,
          startDate: j.startDate?.slice(0, 10) || "",
          endDate: j.endDate?.slice(0, 10) || "",
        })) : [emptyJobPosition],
      });
    } else {
      setForm({
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        jobPositions: [emptyJobPosition],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleJobChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      jobPositions: [{ ...prev.jobPositions[0], [name]: value }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="text-gray-700 font-medium">First Name *</span>
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          disabled={loading}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          autoComplete="given-name"
        />
      </label>

      <label className="block">
        <span className="text-gray-700 font-medium">Middle Name</span>
        <input
          type="text"
          name="middleName"
          value={form.middleName}
          onChange={handleChange}
          disabled={loading}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          autoComplete="additional-name"
        />
      </label>

      <label className="block">
        <span className="text-gray-700 font-medium">Last Name *</span>
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          disabled={loading}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          autoComplete="family-name"
        />
      </label>

      <label className="block">
        <span className="text-gray-700 font-medium">Date of Birth *</span>
        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
          disabled={loading}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          max={new Date().toISOString().slice(0, 10)}
        />
      </label>

      <label className="block">
        <span className="text-gray-700 font-medium">Gender *</span>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          disabled={loading}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">-- Pilih --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </label>

      <label className="block">
        <span className="text-gray-700 font-medium">Address *</span>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          disabled={loading}
          required
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>

      <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Job Position</h3>

      <label className="block">
        <span className="text-gray-700 font-medium">Job Name *</span>
        <input
          type="text"
          name="jobName"
          value={form.jobPositions[0].jobName}
          onChange={handleJobChange}
          disabled={loading}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>

      <label className="block">
        <span className="text-gray-700 font-medium">Start Date *</span>
        <input
          type="date"
          name="startDate"
          value={form.jobPositions[0].startDate}
          onChange={handleJobChange}
          disabled={loading}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>

      <label className="block">
        <span className="text-gray-700 font-medium">End Date</span>
        <input
          type="date"
          name="endDate"
          value={form.jobPositions[0].endDate}
          onChange={handleJobChange}
          disabled={loading}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          min={form.jobPositions[0].startDate}
        />
      </label>

      <label className="block">
        <span className="text-gray-700 font-medium">Salary *</span>
        <input
          type="number"
          name="salary"
          min={0}
          value={form.jobPositions[0].salary}
          onChange={handleJobChange}
          disabled={loading}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>

      <label className="block mb-6">
        <span className="text-gray-700 font-medium">Status *</span>
        <input
          type="text"
          name="status"
          value={form.jobPositions[0].status}
          onChange={handleJobChange}
          disabled={loading}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>

      <div className="flex justify-end gap-4">
        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Batal
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-indigo-600 px-6 py-2 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {loading ? (initialData ? "Memperbarui..." : "Menambah...") : (initialData ? "Update" : "Tambah")}
        </button>
      </div>
    </form>
  );
}