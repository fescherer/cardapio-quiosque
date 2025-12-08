type MenuItemProps = {
  name: string
  price: number
  note?: string
};

export default function MenuItem({ name, price, note }: MenuItemProps) {
  return (
    <div className="bg-base-200 flex items-center justify-between rounded-lg p-3 shadow-sm">
      <div>
        <p className="font-semibold">{name}</p>
        {note && <p className="text-warning text-sm">{note}</p>}
      </div>
      <p className="font-bold">
        $
        {price.toFixed(2)}
      </p>
    </div>
  );
}
