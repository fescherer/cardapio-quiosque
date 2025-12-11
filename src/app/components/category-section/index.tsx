import Image from 'next/image';
import MenuItem from '../menu-item';

type CategoryProps = {
  title: string
  items: { name: string, price: number, note?: string }[]
  image?: string
};

export default function CategorySection({ title, items, image }: CategoryProps) {
  return (
    <section className="my-6">
      <h2 className="mb-3 text-2xl font-bold">{title}</h2>
      {/* {image && <Image width={250} height={250} src={image} alt={title} className="mb-4 w-full rounded-xl" />} */}
      <div className="space-y-2">
        {items.map((item, i) => (
          <MenuItem key={i} {...item} />
        ))}
      </div>
    </section>
  );
}
