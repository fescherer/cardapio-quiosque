import CategorySection from './components/category-section';
import menu from './data/data.json';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl p-4">
      <h1 className="mb-8 text-center text-4xl font-bold">☕ My Parent`s Café</h1>
      <CategorySection title="Drinks" items={menu.drinks} image="/images/drinks.jpg" />
      <CategorySection title="Foods" items={menu.foods} image="/images/foods.jpg" />
      <CategorySection title="Desserts" items={menu.desserts} image="/images/desserts.jpg" />
    </main>
  );
}
