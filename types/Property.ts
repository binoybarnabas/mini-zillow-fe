export type Blob = {
  id: string;
  url: string;
  propertyId: string;
};

export type PropertyInfo = {
  id: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  address: string;
  realtor: string;
  images: Blob[];
};
