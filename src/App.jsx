// src/App.jsx
import React, { useState } from "react";
import useEmployees from "./hooks/useEmployees";
import EmployeeForm from "./components/EmployeeForm";
import Modal from "./components/Modal";
import EmployeeList from "./components/EmployeeList";

export default function App() {
  const {
    loading,
    error,
    createEmployee,
    updateEmployee,
  } = useEmployees();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <header className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-700">Daftar Karyawan</h1>
      </header>

      {error && <p className="text-center text-red-600 mb-4">{error}</p>}

      <EmployeeList />

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