// app/property/[id]/page.tsx
import { notFound } from 'next/navigation';

type PropertyDetailPageProps = {
  params: Promise<{ id: string }>;
};
const mockData = [
  {
    id: '1',
    images: ['https://source.unsplash.com/random/800x600?house-1'],
    price: '$2,550,000',
    beds: 8,
    baths: 9,
    sqft: 4691,
    address: '1061 NW North River Dr, Miami, FL 33136',
    realtor: 'COMPASS FLORIDA, LLC.',
  },
  // ... add more mock properties
];

export default async function PropertyDetailPage({params}: PropertyDetailPageProps) {
  
  const { id } = await params;
  console.log("params id", id);

  const property = mockData.find((p) => p.id === id);

  if (!property) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{property.price}</h1>
      <p className="text-lg text-gray-700 mb-2">
        {property.beds} bds · {property.baths} ba · {property.sqft} sqft
      </p>
      <p className="text-md text-gray-600 mb-6">{property.address}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {property.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Property image ${i}`}
            className="rounded-lg w-full h-64 object-cover"
          />
        ))}
      </div>
      <p className="text-sm text-blue-600 mt-6">{property.realtor}</p>
    </div>
  );
}
