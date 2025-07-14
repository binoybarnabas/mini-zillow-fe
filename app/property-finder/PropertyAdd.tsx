'use client';

import { useRef, useState } from 'react';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { FileUpload } from '@/components/FileUpload';
import { post } from '@/utils/api';
import { Textarea } from '@/components/TextArea';
import { Select } from '@/components/Select';

type PropertyFormData = {
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  address: string;
  realtor: string;
  description: string;
  listingType: number;
  images: File[];
};

type Errors = Partial<Record<keyof PropertyFormData, string>>;

export default function PropertyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState<Omit<PropertyFormData, 'images'>>({
    price: '',
    beds: 0,
    baths: 0,
    sqft: 0,
    address: '',
    realtor: '',
    description: '',
    listingType: 0,
  });

  const [images, setImages] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const listingTypes: Record<number, string> = {
    0: 'For Sale',
    1: 'For Rent',
  };

  const listingTypeOptions = Object.entries(listingTypes).map(([value, label]) => ({
    value,
    label,
  }));

  const validateForm = (): Errors => {
    const newErrors: Errors = {};

    // Price: Must be a positive number
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    // Beds: Must be a non-negative integer
    if (isNaN(formData.beds) || formData.beds <= 0 || !Number.isInteger(formData.beds)) {
      newErrors.beds = 'Number of beds in required';
    }

    // Baths: Must be a non-negative number
    if (isNaN(formData.baths) || formData.baths <= 0) {
      newErrors.baths = 'Number of baths in required';
    }

    // Square Feet: Must be a positive integer
    if (isNaN(formData.sqft) || formData.sqft <= 0 || !Number.isInteger(formData.sqft)) {
      newErrors.sqft = 'Square footage must be a positive integer';
    }

    // Address: Must be a non-empty string with at least 5 characters
    if (!formData.address || formData.address.trim().length < 5) {
      newErrors.address = 'Address must be at least 5 characters long';
    }

    // Realtor: Must be a non-empty string with at least 2 characters
    if (!formData.realtor || formData.realtor.trim().length < 2) {
      newErrors.realtor = 'Realtor name must be at least 2 characters long';
    }

    // Listing Type: Must be a valid option (0 or 1)
    if (![0, 1].includes(formData.listingType)) {
      newErrors.listingType = 'Please select a valid listing type';
    }

    // Images: Must be image files, max 10 files, max 5MB each
    if (images.length === 0) {
      newErrors.images = 'At least one image is required';
    } else if (images.length > 10) {
      newErrors.images = 'Cannot upload more than 10 images';
    } else {
      const validImageTypes = ['image/jpeg', 'image/png'];
      images.forEach((file) => {
        if (!validImageTypes.includes(file.type)) {
          newErrors.images = `Image ${file.name} must be a JPEG or PNG`;
        } else if (file.size > 5 * 1024 * 1024) {
          newErrors.images = `Image ${file.name} exceeds 5MB`;
        }
      });
    }

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    console.log("id", id);
    console.log("value", value);
    setFormData((prev) => ({
      ...prev,
      [id]: id === 'beds' || id === 'baths' || id === 'sqft' || id === 'listingType' ? Number(value) : value,
    }));
    console.log("form data",formData);
    // Clear error for this field when user starts typing
    setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const validImageTypes = ['image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      const newImages = fileArray.filter((file) => {
        if (!validImageTypes.includes(file.type)) {
          setErrors((prev) => ({ ...prev, images: `Image ${file.name} must be a JPEG or PNG` }));
          return false;
        }
        if (file.size > maxSize) {
          setErrors((prev) => ({ ...prev, images: `Image ${file.name} exceeds 5MB` }));
          return false;
        }
        return true;
      });

      setImages((prev) => {
        const updatedImages = [...prev, ...newImages];
        if (updatedImages.length > 10) {
          setErrors((prev) => ({ ...prev, images: 'Cannot upload more than 10 images' }));
          return prev;
        }
        setErrors((prev) => ({ ...prev, images: '' }));
        return updatedImages;
      });
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
      description: '',
      listingType: 0,
    });
    setImages([]);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value.toString()));
    // Print all FormData entries
    for (const [key, value] of data.entries()) {
      console.log(`${key}:`, value, `| Type: ${typeof value}`);
    }
    images.forEach((file) => data.append('images', file));

    setSubmitting(true);
    try {
      const res = await post('/property', data);
      if (res.status !== 201) throw new Error('Failed to create property');
      clearAndClose(); // Close modal and reset form on success
    } catch (err) {
      console.error(err);
      // setErrors({ submit: 'Failed to create property. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setErrors((prev) => ({ ...prev, images: '' }));
  };

  const clearAllImages = () => {
    setImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setErrors((prev) => ({ ...prev, images: '' }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl space-y-4 overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-2xl font-bold text-center text-gray-500">Add Property</h2>

        {/* {errors.submit && <p className="text-red-500 text-sm text-center">{errors.submit}</p>} */}

        <div>
          <Input
            id="price"
            label="Price"
            value={formData.price}
            onChange={handleChange}
            className="text-gray-500"
            required
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        <div>
          <Input
            id="beds"
            label="Beds"
            type="number"
            value={formData.beds}
            onChange={handleChange}
            className="text-gray-500"
            required
          />
          {errors.beds && <p className="text-red-500 text-sm mt-1">{errors.beds}</p>}
        </div>

        <div>
          <Input
            id="baths"
            label="Baths"
            type="number"
            value={formData.baths}
            onChange={handleChange}
            className="text-gray-500"
            required
          />
          {errors.baths && <p className="text-red-500 text-sm mt-1">{errors.baths}</p>}
        </div>

        <div>
          <Input
            id="sqft"
            label="Square Feet"
            type="number"
            value={formData.sqft}
            onChange={handleChange}
            className="text-gray-500"
            required
          />
          {errors.sqft && <p className="text-red-500 text-sm mt-1">{errors.sqft}</p>}
        </div>

        <div>
          <Input
            id="address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
            className="text-gray-500"
            required
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div>
          <Input
            id="realtor"
            label="Realtor"
            value={formData.realtor}
            onChange={handleChange}
            className="text-gray-500"
            required
          />
          {errors.realtor && <p className="text-red-500 text-sm mt-1">{errors.realtor}</p>}
        </div>

        <div>
          <Select
            id="listingType"
            label="Listing Type"
            options={listingTypeOptions}
            value={formData.listingType.toString()}
            onChange={handleChange}
            className="text-gray-500"
            required
          />
          {errors.listingType && <p className="text-red-500 text-sm mt-1">{errors.listingType}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-700"
            placeholder="Describe the property"
          />
        </div>

        <div className="flex flex-col gap-2">
          <FileUpload
            id="images"
            label="Images"
            onChange={handleFileChange}
            className="w-full"
            multiple
            ref={fileInputRef}
          />
          {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}

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
          <Button type="button" onClick={clearAndClose}>
            Cancel
          </Button>
          <Button type="submit" loading={submitting} loadingText="Submitting...">
            Add Property
          </Button>
        </div>
      </form>
    </div>
  );
}