import { NextRequest, NextResponse } from 'next/server';
import { getAllHouses, createHouse } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';
import { House, PriceType } from '@/types/house';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('all') === 'true';
    const search = searchParams.get('search')?.toLowerCase();
    const address = searchParams.get('address')?.toLowerCase();
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : null;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null;
    const rooms = searchParams.get('rooms');
    const priceType = searchParams.get('priceType') as PriceType | 'all' | null;
    const forFamily = searchParams.get('forFamily') === 'true';
    const forStudents = searchParams.get('forStudents') === 'true';

    // If requesting inactive, verify admin authentication
    let houses: House[] = [];
    if (includeInactive) {
      const isAuth = await isAdminAuthenticated();
      if (!isAuth) {
        // Return only active if not authenticated as admin
        houses = await getAllHouses(false);
      } else {
        houses = await getAllHouses(true);
      }
    } else {
      houses = await getAllHouses(false);
    }

    // Apply in-memory filtering for rich multi-parameter search
    let filtered = houses;

    if (search) {
      filtered = filtered.filter(
        (h) =>
          h.title.toLowerCase().includes(search) ||
          h.address.toLowerCase().includes(search) ||
          h.description.toLowerCase().includes(search)
      );
    }

    if (address) {
      filtered = filtered.filter((h) => h.address.toLowerCase().includes(address));
    }

    if (minPrice !== null && !isNaN(minPrice)) {
      filtered = filtered.filter((h) => h.price >= minPrice);
    }

    if (maxPrice !== null && !isNaN(maxPrice)) {
      filtered = filtered.filter((h) => h.price <= maxPrice);
    }

    if (rooms && rooms !== 'all') {
      if (rooms === '4+') {
        filtered = filtered.filter((h) => h.rooms >= 4);
      } else {
        const roomNum = Number(rooms);
        if (!isNaN(roomNum)) {
          filtered = filtered.filter((h) => h.rooms === roomNum);
        }
      }
    }

    if (priceType && priceType !== 'all') {
      filtered = filtered.filter((h) => h.price_type === priceType);
    }

    if (forFamily) {
      filtered = filtered.filter((h) => h.for_family === true);
    }

    if (forStudents) {
      filtered = filtered.filter((h) => h.for_students === true);
    }

    // Amenity filters
    const amenities = ['refrigerator', 'tv', 'air_conditioner', 'washing_machine', 'wifi', 'furniture', 'kitchen', 'bathroom'] as const;
    for (const am of amenities) {
      if (searchParams.get(am) === 'true') {
        filtered = filtered.filter((h) => h.amenities && h.amenities[am] === true);
      }
    }

    return NextResponse.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    console.error('API Error in GET /api/houses:', error);
    return NextResponse.json({ success: false, error: 'Xonadonlarni yuklashda xatolik' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Ruxsat berilmagan (Avtorizatsiyadan o\'ting)' }, { status: 401 });
    }

    const body = await request.json();

    // Validation
    if (!body.title || !body.address || !body.price || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Majburiy maydonlar to‘ldirilmadi (Sarlavha, Manzil, Narx, Telefon)' },
        { status: 400 }
      );
    }

    // Images validation - exactly 3 images
    const images = Array.isArray(body.images) && body.images.length === 3 ? body.images : [
      body.images?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      body.images?.[1] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      body.images?.[2] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    ];

    const house = await createHouse({
      title: body.title,
      description: body.description || '',
      address: body.address,
      latitude: Number(body.latitude) || 40.9983,
      longitude: Number(body.longitude) || 71.6726,
      rooms: Number(body.rooms) || 1,
      area: Number(body.area) || 40,
      price: Number(body.price) || 0,
      price_type: body.price_type || 'xonadon',
      phone: body.phone,
      for_family: Boolean(body.for_family),
      for_students: Boolean(body.for_students),
      amenities: {
        refrigerator: Boolean(body.amenities?.refrigerator),
        tv: Boolean(body.amenities?.tv),
        air_conditioner: Boolean(body.amenities?.air_conditioner),
        washing_machine: Boolean(body.amenities?.washing_machine),
        wifi: Boolean(body.amenities?.wifi),
        furniture: Boolean(body.amenities?.furniture),
        kitchen: Boolean(body.amenities?.kitchen),
        bathroom: Boolean(body.amenities?.bathroom),
      },
      images,
      status: body.status === 'INACTIVE' ? 'INACTIVE' : 'ACTIVE',
    });

    return NextResponse.json({ success: true, data: house }, { status: 201 });
  } catch (error) {
    console.error('API Error in POST /api/houses:', error);
    return NextResponse.json({ success: false, error: 'Xonadon yaratishda xatolik yuz berdi' }, { status: 500 });
  }
}
