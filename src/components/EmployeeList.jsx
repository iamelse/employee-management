// src/components/EmployeeList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeTable from "./EmployeeTable";
import Modal from "./Modal";
import EmployeeForm from "./EmployeeForm";

export default function EmployeeList() {
  const [employees, setEmployees] = useState({
    items: [],
    totalItems: 0,
    pageNumber: 1,
    pageSize: 10,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5077/api/employees", {
        params: {
          pageNumber: employees.pageNumber,
          pageSize: employees.pageSize,
          searchTerm: searchTerm,
        },
      });
      setEmployees(res.data);
    } catch (error) {
      console.error("Gagal memuat data karyawan", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [employees.pageNumber, searchTerm]);

  const openAddModal = () => {
    setEditingEmployee(null);
    setModalOpen(true);
  };

  const openEditModal = (id) => {
    const emp = employees.items.find((e) => e.id === id);
    setEditingEmployee(emp);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingEmployee(null);
  };

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      if (editingEmployee) {
        // EDIT
        await axios.put(`http://localhost:5077/api/employees/${editingEmployee.id}`, data);
      } else {
        // TAMBAH
        await axios.post("http://localhost:5077/api/employees", data);
      }
      await fetchEmployees();
      closeModal();
    } catch (error) {
      alert("Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus karyawan ini?")) return;
    try {
      await axios.delete(`http://localhost:5077/api/employees/${id}`);
      await fetchEmployees();
    } catch (error) {
      alert("Gagal menghapus data");
    }
  };

  const totalPages = Math.ceil(employees.totalItems / employees.pageSize);

  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Cari nama karyawan..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setEmployees((prev) => ({ ...prev, pageNumber: 1 }));
          }}
          className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/2"
        />
        <button
          onClick={openAddModal}
          className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Tambah Karyawan
        </button>
      </div>

      <EmployeeTable
        employees={employees.items}
        onEdit={openEditModal}
        onDelete={handleDelete}
        loadingDelete={loading}
        loading={loading}
      />

      <div className="max-w-6xl mx-auto mt-4 flex flex-wrap gap-2 justify-center items-center">
        {/* Tombol Sebelumnya */}
        <button
            disabled={employees.pageNumber <= 1}
            onClick={() =>
            setEmployees((prev) => ({
                ...prev,
                pageNumber: prev.pageNumber - 1,
            }))
            }
            className="w-10 h-10 flex items-center justify-center bg-indigo-500 text-white rounded-md disabled:opacity-50"
        >
            <i className='bx bx-chevron-left text-xl'></i>
        </button>

        {/* Tombol Nomor Halaman */}
        {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            const isActive = page === employees.pageNumber;

            return (
            <button
                key={page}
                onClick={() =>
                setEmployees((prev) => ({
                    ...prev,
                    pageNumber: page,
                }))
                }
                className={`w-10 h-10 flex items-center justify-center rounded-md font-semibold ${
                isActive
                    ? "bg-indigo-700 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
            >
                {page}
            </button>
            );
        })}

        {/* Tombol Selanjutnya */}
        <button
            disabled={employees.pageNumber >= totalPages}
            onClick={() =>
            setEmployees((prev) => ({
                ...prev,
                pageNumber: prev.pageNumber + 1,
            }))
            }
            className="w-10 h-10 flex items-center justify-center bg-indigo-500 text-white rounded-md disabled:opacity-50"
        >
            <i className='bx bx-chevron-right text-xl'></i>
        </button>
      </div>

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