'use client';

import { useRef, useState } from 'react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { FileUpload } from '@/components/FileUpload';

type PropertyFormData = {
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  address: string;
  realtor: string;
  realtorLogo: string;
  images: File[];
};

export default function PropertyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState<Omit<PropertyFormData, 'images'>>({
    price: '',
    beds: 0,
    baths: 0,
    sqft: 0,
    address: '',
    realtor: '',
    realtorLogo: '',
  });

  const [images, setImages] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log("Files selected:", files);
    if (files) {
      const fileArray = Array.from(files);
      console.log("File array:", fileArray);
      setImages(prev => [...prev, ...fileArray]); // Append new files to existing images
      console.log("images",images);
      console.log("Updated images state:", [...images, ...fileArray].length);
    }
  };

  const clearAndClose = () => {
    setFormData({
        price: '',
        beds: 0,
        baths: 0,
        sqft: 0,
        address: '',
        realtor: '',
        realtorLogo: '',
    });

    setImages([]);

    onClose();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value.toString()));
    images.forEach(file => data.append('images', file));

    setSubmitting(true);
    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        body: data,
      });
      if (!res.ok) throw new Error('Failed to create property');
      onClose(); // close modal on success
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllImages = () => {
    setImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset file input
    }
  };

  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl space-y-4 overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-2xl font-bold text-center">Add Property</h2>

        <Input id="price" label="Price" value={formData.price} onChange={handleChange} required />
        <Input id="beds" label="Beds" type="number" value={formData.beds} onChange={handleChange} required />
        <Input id="baths" label="Baths" type="number" value={formData.baths} onChange={handleChange} required />
        <Input id="sqft" label="Square Feet" type="number" value={formData.sqft} onChange={handleChange} required />
        <Input id="address" label="Address" value={formData.address} onChange={handleChange} required />
        <Input id="realtor" label="Realtor" value={formData.realtor} onChange={handleChange} required />
        <Input id="realtorLogo" label="Realtor Logo URL" value={formData.realtorLogo} onChange={handleChange} required />

        <div className="flex flex-col gap-2">
          <FileUpload
            id="images"
            label="Images"
            onChange={handleFileChange}
            className="w-full"
            multiple
            ref={fileInputRef}
          />

          {images.length > 0 && (
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              <div className="flex justify-between items-center">
                <span className="font-medium">Selected Images:</span>
                <div className="w-22">
                    <Button
                    type="button"
                    onClick={clearAllImages}
                    className="text-red-500 hover:text-red-700 text-sm"
                    >
                    Clear All
                    </Button>
                </div>  
              </div>
              <ul className="list-disc list-inside">
                {images.map((file, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{file.name}</span>
                    <div className="w-22">
                        <Button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="text-red-500 hover:text-red-700 text-sm"
                        >
                        Remove
                        </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" onClick={clearAndClose}>Cancel</Button>
          <Button type="submit" loading={submitting} loadingText="Submitting...">Add Property</Button>
        </div>
      </form>
    </div>
  );
}
