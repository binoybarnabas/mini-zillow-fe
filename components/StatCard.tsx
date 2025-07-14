type Props = {
  label: string;
  value: number | string;
};

export default function StatCard({ label, value }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-xl font-bold text-gray-800">{value}</span>
    </div>
  );
}