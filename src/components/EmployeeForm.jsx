import React, { useEffect, useState } from 'react';

export default function EmployeeForm({ onSubmit, onCancel, initialData, loading }) {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [jobName, setJobName] = useState('');
  const [salary, setSalary] = useState('');

  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.firstName || '');
      setMiddleName(initialData.middleName || '');
      setLastName(initialData.lastName || '');
      setDateOfBirth(initialData.dateOfBirth ? initialData.dateOfBirth.slice(0,10) : ''); // format yyyy-mm-dd
      if (initialData.jobPositions && initialData.jobPositions.length > 0) {
        setJobName(initialData.jobPositions[0].jobName || '');
        setSalary(initialData.jobPositions[0].salary?.toString() || '');
      } else {
        setJobName('');
        setSalary('');
      }
    } else {
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setDateOfBirth('');
      setJobName('');
      setSalary('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !dateOfBirth.trim() ||
      !jobName.trim() ||
      salary === ''
    ) {
      alert('Semua field wajib diisi!');
      return;
    }

    const employeePayload = {
      firstName: firstName.trim(),
      middleName: middleName.trim(),
      lastName: lastName.trim(),
      dateOfBirth,
      jobPositions: [
        {
          jobName: jobName.trim(),
          salary: Number(salary),
          startDate: new Date().toISOString(), // bisa kamu ubah sesuai kebutuhan
          endDate: new Date().toISOString(),   // placeholder, sesuaikan kalau perlu
          status: 'active', // contoh status
        },
      ],
    };

    onSubmit(employeePayload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto mb-8"
      aria-label="Form karyawan"
    >
      <h2 className="text-xl font-semibold mb-4">{initialData ? 'Edit Karyawan' : 'Tambah Karyawan'}</h2>

      <label className="block mb-3">
        <span className="block text-gray-700 mb-1">First Name</span>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          disabled={loading}
          required
        />
      </label>

      <label className="block mb-3">
        <span className="block text-gray-700 mb-1">Middle Name</span>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          placeholder="Middle Name (optional)"
          disabled={loading}
        />
      </label>

      <label className="block mb-3">
        <span className="block text-gray-700 mb-1">Last Name</span>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          disabled={loading}
          required
        />
      </label>

      <label className="block mb-3">
        <span className="block text-gray-700 mb-1">Date of Birth</span>
        <input
          type="date"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          disabled={loading}
          required
        />
      </label>

      <label className="block mb-3">
        <span className="block text-gray-700 mb-1">Job Name</span>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
          placeholder="Job Position"
          disabled={loading}
          required
        />
      </label>

      <label className="block mb-6">
        <span className="block text-gray-700 mb-1">Salary</span>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Salary"
          disabled={loading}
          required
          min={0}
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
          {loading ? 'Memproses...' : initialData ? 'Update' : 'Tambah'}
        </button>
      </div>
    </form>
  );
}