export function Header() {
  return (
    <header className="grid grid-cols-3 p-4">
      <h1>Quiosque do Parque</h1>

      <div className="flex gap-4">
        <button className="rounded-sm border p-2">Bebidas</button>
        <button>Salgados</button>
        <button>Doces</button>
      </div>

      <div className="flex-1"></div>
    </header>
  );
}
