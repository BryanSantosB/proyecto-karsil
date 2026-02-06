// dashboard/DashboardHome.jsx
const stats = [
  { label: "Reclamos abiertos", value: 12 },
  { label: "Envíos en curso", value: 8 },
  { label: "Usuarios activos", value: 34 },
];

export const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">
        Resumen general
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map(stat => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow p-6"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-3xl font-bold text-primary-primary">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
