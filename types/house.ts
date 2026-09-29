export type PriceType = 'odam_boshi' | 'xona' | 'xonadon';
export type HouseStatus = 'ACTIVE' | 'INACTIVE';

export interface HouseAmenities {
  refrigerator: boolean;    // Muzlatkich
  tv: boolean;              // Televizor
  air_conditioner: boolean; // Konditsioner
  washing_machine: boolean; // Kir yuvish mashinasi
  wifi: boolean;            // Wi-Fi
  furniture: boolean;       // Mebel
  kitchen: boolean;         // Oshxona
  bathroom: boolean;        // Hammom
}

export interface House {
  id: string;
  title: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  rooms: number;
  area: number;             // m²
  price: number;            // monthly sum
  price_type: PriceType;    // Odam boshiga / xona uchun / xonadon uchun
  phone: string;
  for_family: boolean;
  for_students: boolean;
  amenities: HouseAmenities;
  images: string[];         // Exactly 3 images: [image1, image2, image3]
  status: HouseStatus;
  created_at: string;
  updated_at: string;
}

export interface HouseFilterParams {
  search?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
  rooms?: number | 'all';
  priceType?: PriceType | 'all';
  forFamily?: boolean;
  forStudents?: boolean;
  amenities?: Partial<Record<keyof HouseAmenities, boolean>>;
  status?: HouseStatus | 'all';
}
