import { useAuth } from "context/AuthContext";

export const ComponentePrueba = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      {user ? (
        <h2>Hola {user.nombre}</h2>
      ) : (
        <h2>No estás logueado</h2>
      )}
    </div>
  );
};