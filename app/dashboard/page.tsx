import EmployeesLocation from "./@locations/_components/EmployeesLocation";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ store?: string }>; // Ahora es una Promesa
}) {
  // 1. Descomprimir los parámetros de búsqueda
  const { store } = await searchParams;

  return (
    <>
      <div className="h-full w-4/12">
          <div className="h-[90vh] overflow-hidden overflow-y-auto">
            <EmployeesLocation store={store} />
          </div>
      </div>
    </>
  );
}