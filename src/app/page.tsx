import CategorySection from './components/category-section';
import menu from '../data/db.json';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl p-4">
      <h1 className="mb-8 text-center text-4xl font-bold">🌴 Lanchonete do Quiosque do Parque</h1>
      <CategorySection title="Bebibas" items={menu.drinks} image="/images/drinks.jpg" />
      <CategorySection title="Salgados" items={menu.foods} image="/images/foods.jpg" />
      <CategorySection title="Sobremesas" items={menu.desserts} image="/images/desserts.jpg" />
    </main>
  );
}
