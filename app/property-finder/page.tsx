"use client";
import PropertyCard from "@/components/Card"; // renamed for clarity
import { PropertyInfo } from "@/types/Property";
import { get } from "@/utils/api";
import { useEffect, useState } from "react";

const ViewProperties = () => {
  const [properties, setProperties] = useState<PropertyInfo[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await get<{ properties: PropertyInfo[] }>('/property/list');
      setProperties(res.data.properties);
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Available Properties</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property:any) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
};

export default ViewProperties;
