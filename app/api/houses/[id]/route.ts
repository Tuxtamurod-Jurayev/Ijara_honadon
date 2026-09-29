import { NextRequest, NextResponse } from 'next/server';
import { getHouseById, updateHouse, deleteHouse } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const house = await getHouseById(id);

    if (!house) {
      return NextResponse.json({ success: false, error: 'Xonadon topilmadi' }, { status: 404 });
    }

    // If house is inactive, check admin authentication
    if (house.status === 'INACTIVE') {
      const isAuth = await isAdminAuthenticated();
      if (!isAuth) {
        return NextResponse.json({ success: false, error: 'Xonadon topilmadi yoki faol emas' }, { status: 404 });
      }
    }

    return NextResponse.json({ success: true, data: house });
  } catch (error) {
    console.error('API Error in GET /api/houses/[id]:', error);
    return NextResponse.json({ success: false, error: 'Maʼlumotni yuklashda xatolik' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Ruxsat berilmagan' }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();

    const existing = await getHouseById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Tahrirlanadigan xonadon topilmadi' }, { status: 404 });
    }

    const updated = await updateHouse(id, {
      ...body,
      latitude: body.latitude !== undefined ? Number(body.latitude) : existing.latitude,
      longitude: body.longitude !== undefined ? Number(body.longitude) : existing.longitude,
      rooms: body.rooms !== undefined ? Number(body.rooms) : existing.rooms,
      area: body.area !== undefined ? Number(body.area) : existing.area,
      price: body.price !== undefined ? Number(body.price) : existing.price,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('API Error in PUT /api/houses/[id]:', error);
    return NextResponse.json({ success: false, error: 'Xonadonni yangilashda xatolik' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Ruxsat berilmagan' }, { status: 401 });
    }

    const { id } = await context.params;
    const success = await deleteHouse(id);

    if (!success) {
      return NextResponse.json({ success: false, error: 'O‘chiriladigan xonadon topilmadi' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Xonadon muvaffaqiyatli o‘chirildi' });
  } catch (error) {
    console.error('API Error in DELETE /api/houses/[id]:', error);
    return NextResponse.json({ success: false, error: 'Xonadonni o‘chirishda xatolik' }, { status: 500 });
  }
}
