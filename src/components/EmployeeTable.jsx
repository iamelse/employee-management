// src/components/EmployeeTable.jsx
import React from "react";

export default function EmployeeTable({ employees, onEdit, onDelete, loadingDelete }) {
  if (employees.length === 0) {
    return <p className="text-center text-gray-500 mt-6">Data karyawan tidak ditemukan.</p>;
  }

  return (
    <div className="overflow-x-auto max-w-6xl mx-auto shadow-md rounded-md">
      <table className="min-w-full divide-y divide-gray-200 bg-white rounded-md">
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
        <tbody className="divide-y divide-gray-200">
          {employees.items.map(emp => {
            const job = emp.jobPositions[0] || {};
            const birthYear = new Date(emp.dateOfBirth).getFullYear();
            const age = new Date().getFullYear() - birthYear;
            return (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{emp.id}</td>
                <td className="px-4 py-3 text-sm">{[emp.firstName, emp.middleName, emp.lastName].filter(Boolean).join(" ")}</td>
                <td className="px-4 py-3 text-sm">{job.jobName || "-"}</td>
                <td className="px-4 py-3 text-sm">{job.salary ? `Rp ${job.salary.toLocaleString()}` : "-"}</td>
                <td className="px-4 py-3 text-sm">{job.status || "-"}</td>
                <td className="px-4 py-3 text-sm">{age} tahun</td>
                <td className="px-4 py-3 text-sm text-center space-x-3">
                  <button
                    onClick={() => onEdit(emp.id)}
                    className="text-indigo-600 hover:text-indigo-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                    aria-label={`Edit ${emp.firstName}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Hapus karyawan ${emp.firstName}?`)) onDelete(emp.id);
                    }}
                    disabled={loadingDelete}
                    className="text-red-600 hover:text-red-900 font-semibold disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
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