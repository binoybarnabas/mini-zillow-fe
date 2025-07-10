'use client';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Heart } from 'lucide-react';
import Link from 'next/link';

type PropertyCardProps = {
  id: string;
  images: string[];
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  address: string;
  realtor: string;
  realtorLogo: string;
};

export default function PropertyCard({
  id,
  images,
  price,
  beds,
  baths,
  sqft,
  address,
  realtor,
  realtorLogo,
}: PropertyCardProps) {
  const [sliderRef] = useKeenSlider({ loop: true, slides: { perView: 1 } });

  return (
    <Link href={`/property-finder/${id}`} className="hover:no-underline">
    <div className="max-w-sm rounded-xl overflow-hidden shadow-md bg-white relative transform transition duration-300 hover:scale-105">
      {/* Carousel */}
      <div className="relative h-56 w-full keen-slider rounded-t-xl" ref={sliderRef}>
        {images.map((imgUrl, i) => (
          <div key={i} className="keen-slider__slide relative">
            <Image
              src={imgUrl}
              alt={`Property ${i}`}
              fill
              className="object-cover"
              unoptimized // use this if the URLs are not from your domain
            />
          </div>
        ))}

        {/* Showcase Label */}
        <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
          ★ Showcase
        </div>

        {/* Heart Icon */}
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
          <Heart className="h-4 w-4 text-gray-600" />
        </div>

        {/* Dots (Static for now) */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, i) => (
            <div key={i} className="w-2 h-2 bg-gray-300 rounded-full" />
          ))}
        </div>

        {/* Realtor Badge */}
        <div className="absolute bottom-2 right-2">
          <Image
            src={realtorLogo}
            alt="Realtor Logo"
            width={80}
            height={20}
            unoptimized
          />
        </div>
      </div>

      {/* Property Info */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900">{price}</h2>
        <p className="text-sm text-gray-700 mt-1">
          <span className="font-medium">{beds}</span> bds ·{' '}
          <span className="font-medium">{baths}</span> ba ·{' '}
          <span className="font-medium">{sqft.toLocaleString()}</span> sqft - House for sale
        </p>
        <p className="text-sm text-gray-600 mt-1">{address}</p>
        <p className="text-xs text-blue-600 mt-1 font-medium">{realtor}</p>
      </div>
    </div>
    </Link>
  );
}
