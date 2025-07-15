'use client';
import { useCallback, useEffect, useState } from 'react';
import { PropertyInfo } from '@/types/Property';
import { get, del } from '@/utils/api';
import AdminCard from '@/components/AdminCard';
import StatCard from '@/components/StatCard';
import PropertyModal from '../../components/PropertyForm';
import { useFormSubmit } from '@/contexts/FormSubmitContext';
import FullScreenLoader from '@/components/Loader';


export default function AdminDashboard() {
  const [properties, setProperties] = useState<PropertyInfo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState<PropertyInfo | null>(null);

  const handleEdit = (property: PropertyInfo) => {
    setPropertyToEdit(property);
    setIsModalOpen(true);
  };

    const [loading, setLoading] = useState(false);
    const { setOnFormSubmit } = useFormSubmit();
  
    const fetchProperties = useCallback(async () => {
      try {
        setLoading(true);
        const res = await get<{ properties: PropertyInfo[] }>('/admin/properties');
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

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this listing?');
    if (!confirmed) return;

    await del(`/admin/properties/${id}`);
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const totalListings = properties.length;
  const totalSqft = properties.reduce((acc, p) => acc + p.sqft, 0);
  const avgPrice = properties.length
    ? properties.reduce((acc, p) => acc + parseFloat(p.price), 0) / properties.length
    : 0;
    // Convert all price strings to numbers first
    
  const priceValues = properties.map(p => parseFloat(p.price));
  const minPrice = priceValues.length ? Math.min(...priceValues) : 0;
  const maxPrice = priceValues.length ? Math.max(...priceValues) : 0;
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {loading && <FullScreenLoader />}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
        <StatCard label="Total Listings" value={totalListings} />
        <StatCard label="Total Sqft" value={totalSqft} />
        <StatCard label="Avg. Price ($)" value={avgPrice.toFixed(0)} />
        <StatCard label="Minimum Price ($)" value={minPrice.toFixed(0)} />
        <StatCard label="Maximum Price ($)" value={maxPrice.toFixed(0)} />
      </div>

      {/* Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((property) => (
          <AdminCard key={property.id} property={property} onDelete={handleDelete} onEdit={handleEdit}/>
        ))}
      </div>
      <PropertyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} propertyToEdit={propertyToEdit}/>
    </div>
  );
}
