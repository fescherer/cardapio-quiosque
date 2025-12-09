'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type MenuItem = {
  name: string
  price: number
  note?: string
};

type MenuData = {
  drinks: MenuItem[]
  foods: MenuItem[]
  desserts: MenuItem[]
};

export default function AdminEdit() {
  const [menu, setMenu] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  // protect route
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAdmin = localStorage.getItem('cafe_admin');
      if (!isAdmin) {
        router.push('/admin');
      }
    }
  }, [router]);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setMenu(data))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (
    category: keyof MenuData,
    index: number,
    field: 'price' | 'note',
    value: string,
  ) => {
    if (!menu) return;
    const updated = { ...menu };
    if (field === 'price') {
      updated[category][index].price = parseFloat(value) || 0;
    }
    else {
      updated[category][index].note = value;
    }
    setMenu(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('/api/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(menu),
    });
    setSaving(false);
    if (res.ok) {
      alert('Menu updated!');
    }
    else {
      alert('Error saving menu.');
    }
  };

  if (loading) return <p className="p-4">Loading menu...</p>;

  if (!menu) return <p className="text-error p-4">Error loading menu</p>;
  console.log(menu);
  return (
    <main className="mx-auto max-w-3xl p-4">
      <h1 className="mb-6 text-3xl font-bold">Edit Menu</h1>
      {Object.entries(menu).map(([category, items]) => (
        <div key={category} className="mb-8">
          <h2 className="mb-3 text-xl font-semibold capitalize">{category}</h2>
          <div className="space-y-4">
            {items.map((item, i) => (
              <div key={i} className="card bg-base-200 p-4 shadow-sm">
                <p className="font-semibold">{item.name}</p>
                <div className="mt-2 flex gap-2">
                  <input
                    type="number"
                    step="0.01"
                    className="input input-bordered w-24"
                    value={item.price}
                    onChange={e =>
                      handleChange(category as keyof MenuData, i, 'price', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Note"
                    className="input input-bordered flex-1"
                    value={item.note || ''}
                    onChange={e =>
                      handleChange(category as keyof MenuData, i, 'note', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        className={`btn btn-primary ${saving ? 'loading' : ''}`}
        onClick={handleSave}
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </main>
  );
}
