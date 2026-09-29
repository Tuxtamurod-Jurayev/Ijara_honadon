import fs from 'fs';
import path from 'path';
import { House, HouseStatus } from '@/types/house';
import { supabase, isSupabaseConfigured } from './supabase';

const dataFilePath = path.join(process.cwd(), 'data', 'houses.json');

const INITIAL_HOUSES: House[] = [
  {
    id: 'h-1',
    title: '2 xonali shinam xonadon ijaraga beriladi',
    description: 'Barcha qulayliklarga ega, zamonaviy taʼmirlangan xonadon. Transport qatnovi juda qulay, metro va bekatlar yaqinida. Uy toza va shinam, uzoq muddatga beriladi.',
    address: 'Namangan shahar, Davlatobod tumani, Navoiy ko‘chasi, 14-uy',
    latitude: 40.9983,
    longitude: 71.6726,
    rooms: 2,
    area: 64,
    price: 1800000,
    price_type: 'xonadon',
    phone: '+998 90 123 45 67',
    for_family: true,
    for_students: true,
    amenities: {
      refrigerator: true,
      tv: true,
      air_conditioner: true,
      washing_machine: true,
      wifi: true,
      furniture: true,
      kitchen: true,
      bathroom: true,
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    ],
    status: 'ACTIVE',
    created_at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'h-2',
    title: 'Talaba yigitlar yoki qizlar uchun qulay xonalar',
    description: 'Universitetga yaqin joylashgan, hamma sharoiti bor. Xonalar keng va yorug‘, dars qilish uchun barcha qulayliklar muhayyo. Kommunal to‘lovlar narx ichida.',
    address: 'Namangan shahar, Yangi Namangan tumani, Boburshoh ko‘chasi, 8-uy',
    latitude: 41.0054,
    longitude: 71.6612,
    rooms: 3,
    area: 88,
    price: 650000,
    price_type: 'odam_boshi',
    phone: '+998 91 987 65 43',
    for_family: false,
    for_students: true,
    amenities: {
      refrigerator: true,
      tv: false,
      air_conditioner: true,
      washing_machine: true,
      wifi: true,
      furniture: true,
      kitchen: true,
      bathroom: true,
    },
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
    ],
    status: 'ACTIVE',
    created_at: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'h-3',
    title: 'Yevro taʼmirlangan 3 xonali hashamatli xonadon',
    description: 'Shaharning qoq markazida, elit domda joylashgan. Qimmatbaho mebel va zamonaviy texnikalar bilan to‘liq jihozlangan. Faqat tartibli oilalar uchun uzoq muddatga.',
    address: 'Namangan shahar, Chorsu maydoni yaqinida, Amir Temur ko‘chasi, 45-uy',
    latitude: 40.9921,
    longitude: 71.6815,
    rooms: 3,
    area: 95,
    price: 3500000,
    price_type: 'xonadon',
    phone: '+998 93 456 78 90',
    for_family: true,
    for_students: false,
    amenities: {
      refrigerator: true,
      tv: true,
      air_conditioner: true,
      washing_machine: true,
      wifi: true,
      furniture: true,
      kitchen: true,
      bathroom: true,
    },
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80',
    ],
    status: 'ACTIVE',
    created_at: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'h-4',
    title: '1 xonali ixcham kvartira arzon narxda',
    description: 'Yangi qurilgan binoda joylashgan 1 xonali uy. Xonalari yorug‘, shaxsiy isitish tizimi (kotyol) bor. Talaba yoki yosh oilalar uchun ayni muddao.',
    address: 'Namangan shahar, 1-kichik nohiya, Guliston massivi, 12-uy',
    latitude: 41.0112,
    longitude: 71.6504,
    rooms: 1,
    area: 42,
    price: 1300000,
    price_type: 'xonadon',
    phone: '+998 94 321 00 11',
    for_family: true,
    for_students: true,
    amenities: {
      refrigerator: true,
      tv: false,
      air_conditioner: false,
      washing_machine: true,
      wifi: true,
      furniture: true,
      kitchen: true,
      bathroom: true,
    },
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    ],
    status: 'ACTIVE',
    created_at: new Date(Date.now() - 8 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 8 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'h-5',
    title: '4 xonali keng hovli uy ijaraga beriladi',
    description: 'Hovlisida mevali daraxtlar va avtomobil uchun garaj mavjud. Oila uchun juda qulay, tinch mahallada joylashgan.',
    address: 'Namangan shahar, To‘raqo‘rg‘on yo‘li, Bo‘ston mahallasi, 33-uy',
    latitude: 40.9856,
    longitude: 71.6421,
    rooms: 4,
    area: 140,
    price: 2700000,
    price_type: 'xonadon',
    phone: '+998 97 777 88 99',
    for_family: true,
    for_students: false,
    amenities: {
      refrigerator: true,
      tv: true,
      air_conditioner: true,
      washing_machine: true,
      wifi: true,
      furniture: true,
      kitchen: true,
      bathroom: true,
    },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    ],
    status: 'ACTIVE',
    created_at: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'h-6',
    title: 'Tibbiyot instituti talabalari uchun shinam xona',
    description: 'Institutga 5 daqiqalik piyoda yo‘l. Sharoitlari aʼlo darajada, internet doimiy ishlaydi.',
    address: 'Namangan shahar, Kosonsoy ko‘chasi, Tibbiyot kolleji ro‘parasida',
    latitude: 41.0189,
    longitude: 71.6842,
    rooms: 2,
    area: 50,
    price: 550000,
    price_type: 'odam_boshi',
    phone: '+998 99 111 22 33',
    for_family: false,
    for_students: true,
    amenities: {
      refrigerator: true,
      tv: false,
      air_conditioner: false,
      washing_machine: true,
      wifi: true,
      furniture: true,
      kitchen: true,
      bathroom: true,
    },
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
    ],
    status: 'ACTIVE',
    created_at: new Date(Date.now() - 12 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 12 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'h-7',
    title: 'Yangi kvartira (Hozirda band qilingan)',
    description: 'Ushbu xonadon hozirda ijaraga berilgan yoki vaqtincha nofaol.',
    address: 'Namangan shahar, Sardoba bozori atrofida, 2-uy',
    latitude: 40.9995,
    longitude: 71.6701,
    rooms: 2,
    area: 58,
    price: 1600000,
    price_type: 'xonadon',
    phone: '+998 90 555 44 33',
    for_family: true,
    for_students: false,
    amenities: {
      refrigerator: true,
      tv: true,
      air_conditioner: true,
      washing_machine: true,
      wifi: true,
      furniture: true,
      kitchen: true,
      bathroom: true,
    },
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502005229762-ee1b2b93e083?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    ],
    status: 'INACTIVE',
    created_at: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(),
  },
];

function ensureDataFile(): void {
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify(INITIAL_HOUSES, null, 2), 'utf-8');
  }
}

function readHousesFromFile(): House[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading houses.json:', err);
    return INITIAL_HOUSES;
  }
}

function writeHousesToFile(houses: House[]): void {
  ensureDataFile();
  fs.writeFileSync(dataFilePath, JSON.stringify(houses, null, 2), 'utf-8');
}

export async function getAllHouses(includeInactive = false): Promise<House[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('houses').select('*').order('created_at', { ascending: false });
      if (!includeInactive) {
        query = query.eq('status', 'ACTIVE');
      }
      const { data, error } = await query;
      if (!error && data) {
        return data as House[];
      }
    } catch (e) {
      console.warn('Supabase query failed, falling back to local file storage', e);
    }
  }

  const houses = readHousesFromFile();
  if (includeInactive) {
    return houses.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
  return houses
    .filter((h) => h.status === 'ACTIVE')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function getHouseById(id: string): Promise<House | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('houses').select('*').eq('id', id).single();
      if (!error && data) {
        return data as House;
      }
    } catch (e) {
      console.warn('Supabase fetch single house failed, falling back', e);
    }
  }

  const houses = readHousesFromFile();
  return houses.find((h) => h.id === id) || null;
}

export async function createHouse(houseData: Omit<House, 'id' | 'created_at' | 'updated_at'>): Promise<House> {
  const newHouse: House = {
    ...houseData,
    id: 'h-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('houses').insert([newHouse]).select().single();
      if (!error && data) {
        return data as House;
      }
    } catch (e) {
      console.warn('Supabase insert failed, storing locally', e);
    }
  }

  const houses = readHousesFromFile();
  houses.unshift(newHouse);
  writeHousesToFile(houses);
  return newHouse;
}

export async function updateHouse(id: string, updates: Partial<House>): Promise<House | null> {
  const updated_at = new Date().toISOString();

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('houses')
        .update({ ...updates, updated_at })
        .eq('id', id)
        .select()
        .single();
      if (!error && data) {
        return data as House;
      }
    } catch (e) {
      console.warn('Supabase update failed, updating locally', e);
    }
  }

  const houses = readHousesFromFile();
  const index = houses.findIndex((h) => h.id === id);
  if (index === -1) return null;

  houses[index] = {
    ...houses[index],
    ...updates,
    updated_at,
  };
  writeHousesToFile(houses);
  return houses[index];
}

export async function deleteHouse(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('houses').delete().eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase delete failed, deleting locally', e);
    }
  }

  const houses = readHousesFromFile();
  const filtered = houses.filter((h) => h.id !== id);
  if (filtered.length === houses.length) return false;

  writeHousesToFile(filtered);
  return true;
}

export async function toggleHouseStatus(id: string): Promise<House | null> {
  const house = await getHouseById(id);
  if (!house) return null;

  const nextStatus: HouseStatus = house.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
  return updateHouse(id, { status: nextStatus });
}

export async function getStats(): Promise<{ total: number; active: number; inactive: number; avgPrice: number }> {
  const houses = await getAllHouses(true);
  const total = houses.length;
  const active = houses.filter((h) => h.status === 'ACTIVE').length;
  const inactive = houses.filter((h) => h.status === 'INACTIVE').length;
  const sumPrice = houses.reduce((acc, h) => acc + (h.price || 0), 0);
  const avgPrice = total > 0 ? Math.round(sumPrice / total) : 0;

  return { total, active, inactive, avgPrice };
}
