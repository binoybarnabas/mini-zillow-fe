import PropertyCard from "@/components/Card"; // renamed for clarity

const ViewProperties = () => {
  const properties = [
    {
      id:"1",
      images: [
        'https://source.unsplash.com/random/800x600?house-1',
        'https://source.unsplash.com/random/800x600?house-2',
        'https://source.unsplash.com/random/800x600?house-3',
      ],
      price: '$2,550,000',
      beds: 8,
      baths: 9,
      sqft: 4691,
      address: '1061 NW North River Dr, Miami, FL 33136',
      realtor: 'COMPASS FLORIDA, LLC.',
      realtorLogo: 'https://miami-realtors.com/logo.png',
    },
    {
      id:"2",
      images: [
        'https://source.unsplash.com/random/800x600?house-4',
        'https://source.unsplash.com/random/800x600?house-5',
        'https://source.unsplash.com/random/800x600?house-6',
      ],
      price: '$1,450,000',
      beds: 5,
      baths: 4,
      sqft: 3210,
      address: '502 Ocean Drive, Miami Beach, FL 33139',
      realtor: 'SUNSHINE REALTY',
      realtorLogo: 'https://miami-realtors.com/logo.png',
    },
    {
    id:"3",
      images: [
        'https://source.unsplash.com/random/800x600?house-7',
        'https://source.unsplash.com/random/800x600?house-8',
        'https://source.unsplash.com/random/800x600?house-9',
      ],
      price: '$980,000',
      beds: 4,
      baths: 3,
      sqft: 2890,
      address: '120 Palm Ave, Miami Beach, FL 33139',
      realtor: 'ELITE HOMES INC.',
      realtorLogo: 'https://miami-realtors.com/logo.png',
    },
    {
        id:"4",
      images: [
        'https://source.unsplash.com/random/800x600?house-7',
        'https://source.unsplash.com/random/800x600?house-8',
        'https://source.unsplash.com/random/800x600?house-9',
      ],
      price: '$980,000',
      beds: 4,
      baths: 3,
      sqft: 2890,
      address: '120 Palm Ave, Miami Beach, FL 33139',
      realtor: 'ELITE HOMES INC.',
      realtorLogo: 'https://miami-realtors.com/logo.png',
    },
    {
        id:"5",
      images: [
        'https://source.unsplash.com/random/800x600?house-7',
        'https://source.unsplash.com/random/800x600?house-8',
        'https://source.unsplash.com/random/800x600?house-9',
      ],
      price: '$980,000',
      beds: 4,
      baths: 3,
      sqft: 2890,
      address: '120 Palm Ave, Miami Beach, FL 33139',
      realtor: 'ELITE HOMES INC.',
      realtorLogo: 'https://miami-realtors.com/logo.png',
    },
    {
        id:"6",
      images: [
        'https://source.unsplash.com/random/800x600?house-7',
        'https://source.unsplash.com/random/800x600?house-8',
        'https://source.unsplash.com/random/800x600?house-9',
      ],
      price: '$980,000',
      beds: 4,
      baths: 3,
      sqft: 2890,
      address: '120 Palm Ave, Miami Beach, FL 33139',
      realtor: 'ELITE HOMES INC.',
      realtorLogo: 'https://miami-realtors.com/logo.png',
    },
    {
        id:"7",
      images: [
        'https://source.unsplash.com/random/800x600?house-7',
        'https://source.unsplash.com/random/800x600?house-8',
        'https://source.unsplash.com/random/800x600?house-9',
      ],
      price: '$980,000',
      beds: 4,
      baths: 3,
      sqft: 2890,
      address: '120 Palm Ave, Miami Beach, FL 33139',
      realtor: 'ELITE HOMES INC.',
      realtorLogo: 'https://miami-realtors.com/logo.png',
    },
    // Add more properties here...
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Available Properties</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property, index) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
};

export default ViewProperties;
