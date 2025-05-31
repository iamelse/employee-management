function calculateAge(dob) {
  if (!dob) return '-';
  const birthDate = new Date(dob);
  const diffMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(diffMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export default function EmployeeTable({ employees, onEdit, onDelete, loadingDelete }) {
    console.log(employees);
  if (!employees.length) {
    return (
      <p className="text-center text-gray-500 mt-6">
        Data karyawan tidak ditemukan.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto max-w-6xl mx-auto shadow-md rounded-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Nama Lengkap</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Gaji</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Umur</th>
            <th className="px-4 py-3 text-center text-sm font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => {
            const {
              id,
              firstName,
              middleName,
              lastName,
              dateOfBirth,
              jobPositions,
            } = employee;

            const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ');
            // Ambil salary dari posisi pertama (jika ada)
            const salary = jobPositions && jobPositions.length > 0 ? jobPositions[0].salary : 0;
            const age = calculateAge(dateOfBirth);

            return (
              <tr key={id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{id}</td>
                <td className="px-4 py-3 text-sm">{fullName || '-'}</td>
                <td className="px-4 py-3 text-sm">Rp {salary.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">{age} tahun</td>
                <td className="px-4 py-3 text-sm text-center space-x-2">
                  <button
                    onClick={() => onEdit(id)}
                    className="text-indigo-600 hover:text-indigo-900 font-semibold"
                    aria-label={`Edit ${fullName}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Hapus karyawan ${fullName}?`)) {
                        onDelete(id);
                      }
                    }}
                    disabled={loadingDelete}
                    className="text-red-600 hover:text-red-900 font-semibold disabled:opacity-50"
                    aria-label={`Hapus ${fullName}`}
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