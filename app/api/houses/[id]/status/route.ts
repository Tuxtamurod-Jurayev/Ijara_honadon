import { NextRequest, NextResponse } from 'next/server';
import { toggleHouseStatus, updateHouse } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Ruxsat berilmagan' }, { status: 401 });
    }

    const { id } = await context.params;
    let body: { status?: 'ACTIVE' | 'INACTIVE' } = {};
    try {
      body = await request.json();
    } catch {
      // Body may be empty if just toggling
    }

    let updated;
    if (body.status === 'ACTIVE' || body.status === 'INACTIVE') {
      updated = await updateHouse(id, { status: body.status });
    } else {
      updated = await toggleHouseStatus(id);
    }

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Xonadon topilmadi' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('API Error in PATCH /api/houses/[id]/status:', error);
    return NextResponse.json({ success: false, error: 'Statusni yangilashda xatolik' }, { status: 500 });
  }
}
