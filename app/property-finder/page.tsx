"use client";
import PropertyCard from "@/components/Card"; // renamed for clarity
import FullScreenLoader from "@/components/Loader";
import { useFormSubmit } from "@/contexts/FormSubmitContext";
import { PropertyInfo } from "@/types/Property";
import { get } from "@/utils/api";
import { useCallback, useEffect, useState } from "react";

const ViewProperties = () => {
  const [properties, setProperties] = useState<PropertyInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const { setOnFormSubmit } = useFormSubmit();

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      const res = await get<{ properties: PropertyInfo[] }>('/property/list');
      setProperties(res.data.properties);
    } catch (error) {
      console.error('Failed to fetch properties', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  useEffect(() => {
    setOnFormSubmit(() => fetchProperties);
  }, [fetchProperties, setOnFormSubmit]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
       {loading && <FullScreenLoader />}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Available Properties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property: PropertyInfo) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
};

export default ViewProperties;
