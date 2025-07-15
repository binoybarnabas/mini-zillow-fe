'use client';
import { PropertyInfo } from '@/types/Property';
import Image from 'next/image';
import { Button } from './Button';

type Props = {
  property: PropertyInfo;
  onDelete: (id: string) => void;
  onEdit: (property: PropertyInfo) => void;
};

export default function AdminCard({ property, onDelete, onEdit }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-2">
      {property.images[0]?.url && (
        <Image
          src={property.images[0].url}
          alt={property.address}
          width={400}
          height={200}
          className="rounded-md object-cover h-48 w-full"
          unoptimized
        />
      )}
      <h2 className="text-lg font-semibold text-gray-800">{property.price} USD</h2>
      <p className="text-sm text-gray-600">
        {property.beds} beds · {property.baths} baths · {property.sqft} sqft
      </p>
      <p className="text-sm text-gray-500">{property.address}</p>
      <div className="flex justify-end gap-2 mt-2">
        <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={() => onDelete(property.id)}>Delete</Button>
        <Button className="bg-gray-500 text-white" onClick={() => onEdit(property)}>Edit</Button>
      </div>
    </div>
  );
}
