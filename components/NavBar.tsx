'use client';
import { useState } from 'react';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { X, Search } from 'lucide-react';

export default function SearchNavBar() {
  const [location, setLocation] = useState('Miami, FL');
  const [filters, setFilters] = useState({
    saleType: '',
    price: '',
    beds: '',
    homeType: '',
    more: '',
  });

  const handleFilterChange = (field: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="fixed top-0 z-50 w-full bg-white px-4 py-3 border-b">
      <div className="flex flex-wrap gap-3 items-center">
        {/* Location Input */}
        <div className="flex items-center border rounded px-2 py-1 w-full sm:w-64">
          <Input
            id = "navsearch"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search location"
            className="border-none p-0 focus:ring-0 focus:outline-none w-full"
          />
          {location && (
            <button onClick={() => setLocation('')} className="p-1 text-gray-500 hover:text-gray-700">
              <X size={16} />
            </button>
          )}
          <button className="p-1 text-gray-600 hover:text-gray-800">
            <Search size={16} />
          </button>
        </div>

        {/* Filters using Select */}
        <Select
          id="saleType"
          options={[
            { value: '', label: 'For Sale' },
            { value: 'rent', label: 'For Rent' },
            { value: 'sold', label: 'Recently Sold' },
          ]}
          value={filters.saleType}
          onChange={handleFilterChange('saleType')}
        />

        <Select
          id="price"
          options={[
            { value: '', label: 'Price' },
            { value: '0-500k', label: '$0 - $500k' },
            { value: '500k-1m', label: '$500k - $1M' },
            { value: '1m+', label: '$1M+' },
          ]}
          value={filters.price}
          onChange={handleFilterChange('price')}
        />

        <Select
          id="beds"
          options={[
            { value: '', label: 'Beds & Baths' },
            { value: '1-1', label: '1 Bed · 1 Bath' },
            { value: '2-2', label: '2 Beds · 2 Baths' },
            { value: '3-2', label: '3 Beds · 2 Baths' },
          ]}
          value={filters.beds}
          onChange={handleFilterChange('beds')}
        />

        <Select
          id="homeType"
          options={[
            { value: '', label: 'Home Type' },
            { value: 'house', label: 'House' },
            { value: 'apartment', label: 'Apartment' },
            { value: 'condo', label: 'Condo' },
          ]}
          value={filters.homeType}
          onChange={handleFilterChange('homeType')}
        />

        <Select
          id="more"
          options={[
            { value: '', label: 'More' },
            { value: 'garage', label: 'Has Garage' },
            { value: 'pool', label: 'Has Pool' },
            { value: 'basement', label: 'Has Basement' },
          ]}
          value={filters.more}
          onChange={handleFilterChange('more')}
        />
      </div>
    </div>
  );
}
