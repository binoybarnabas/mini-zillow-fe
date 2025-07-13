'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { get } from '@/utils/api';
import { PropertyInfo } from '@/types/Property';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function isUUID(str: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
}

export default function PropertyDetailPage() {
  const params = useParams();
  const id = params?.id?.toString();

  const [property, setProperty] = useState<PropertyInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !isUUID(id)) {
      setError('Invalid property ID');
      return;
    }

    const fetchProperty = async () => {
      try {
        const res = await get<{ property: PropertyInfo }>(`/property/${id}`);
        if (!res.data.property) {
          setError('Property not found');
        } else {
          setProperty(res.data.property);
        }
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError('Failed to fetch property details');
      }
    };

    fetchProperty();
  }, [id]);

  if (error) {
    return (
      <div className="text-center text-red-600 py-10">
        {error}
      </div>
    );
  }

  if (!property) {
    return notFound;
  }

  // Final field-level validation (defensive)
  const { price, beds, baths, sqft, address, realtor, images } = property;
  if (!price || !beds || !baths || !sqft || !address || !realtor) {
    return (
      <div className="text-center text-red-600 py-10">
        Property details are incomplete.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{price}$</h1>
      <p className="text-lg text-gray-700 mb-2">
        {beds} bds · {baths} ba · {sqft} sqft
      </p>
      <p className="text-md text-gray-600 mb-6">{address}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.length > 0 ? (
          images.map((image, i) => (
            <Image
              key={i}
              src={image.url}
              alt={`Property image ${i}`}
              className="rounded-lg w-full h-64 object-cover"
              width={800}
              height={256}
              unoptimized
            />
          ))
        ) : (
          <p className="text-gray-500">No images available for this property.</p>
        )}
      </div>

      <p className="text-sm text-blue-600 mt-6">{realtor}</p>
    </div>
  );
}
