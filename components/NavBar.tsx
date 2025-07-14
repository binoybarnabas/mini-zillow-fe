'use client';
import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { X, Search, User, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import PropertyModal from '@/app/property-finder/PropertyAdd';
import { useRouter } from 'next/navigation';
import LinkWithLoader from './LinkLoader';

export default function SearchNavBar() {
  const [location, setLocation] = useState('Miami, FL');
  const [modalOpen, setModalOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<{ role: string } | null>({role: 'admin'});

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);

  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 z-50 w-full bg-white px-4 py-3 border-b">
      <div className="flex flex-wrap gap-3 items-center w-full justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Location Input */}
          <div className="flex items-center border rounded px-2 py-1 w-full sm:w-64">
            <Input
              id="navsearch"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search location"
              className="border-none p-0 focus:ring-0 focus:outline-none w-full text-gray-800"
            />
            {location && (
              <button onClick={() => setLocation('')} className="p-1 text-gray-800 hover:text-gray-700">
                <X size={16} />
              </button>
            )}
            <button className="p-1 text-gray-800 hover:text-gray-900">
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
            className="text-gray-800"
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
            className="text-gray-800"
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
            className="text-gray-800"
          />
        </div>
          
        
        {/* Right Section: Add Property + Profile */}
        <div className="flex items-center gap-7">
          {/* Admin Panel link (visible only to admin users) */}
          {user?.role === 'admin' && (
            <div className="flex flex-wrap gap-5 items-center">
            <LinkWithLoader
              href="/admin"
              className="text-lg text-blue-400 hover:text-blue-600 transition-all duration-300 hover:underline hover:scale-105 inline-block"
            >
              Dashboard
            </LinkWithLoader>
            </div>  
          )}

          <Button
            onClick={() => setModalOpen(true)}
            className="px-3 py-1 text-sm rounded-md whitespace-nowrap"
          >
            Add New Property
          </Button>

          {/* Profile Button */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-1 text-sm text-gray-800 border rounded-md hover:bg-gray-100"
            >
              <User size={16} />
              <ChevronDown size={14} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Property Modal */}
      <PropertyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
