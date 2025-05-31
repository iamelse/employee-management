// src/App.jsx
import React, { useState } from "react";
import useEmployees from "./hooks/useEmployees";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeForm from "./components/EmployeeForm";
import Modal from "./components/Modal";

export default function App() {
  const {
    employees,
    loading,
    loadingDelete,
    error,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  } = useEmployees();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const openAddModal = () => {
    setEditingEmployee(null);
    setModalOpen(true);
  };

  const openEditModal = (id) => {
    const emp = employees.find((e) => e.id === id);
    setEditingEmployee(emp);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingEmployee(null);
  };

  const handleSubmit = async (data) => {
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, data);
      } else {
        await createEmployee(data);
      }
      closeModal();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <header className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-700">Daftar Karyawan</h1>
        <button
          onClick={openAddModal}
          className="rounded bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Tambah Karyawan
        </button>
      </header>

      {error && <p className="text-center text-red-600 mb-4">{error}</p>}

      <EmployeeTable
        employees={employees}
        onEdit={openEditModal}
        onDelete={handleDelete}
        loadingDelete={loadingDelete}
      />

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingEmployee ? "Edit Karyawan" : "Tambah Karyawan"}
      >
        <EmployeeForm
          initialData={editingEmployee}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          loading={loading}
        />
      </Modal>
    </div>
  );
}