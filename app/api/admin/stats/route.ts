import { NextResponse } from 'next/server';
import { getStats } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Ruxsat berilmagan' }, { status: 401 });
    }

    const stats = await getStats();
    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    console.error('API Error in GET /api/admin/stats:', error);
    return NextResponse.json({ success: false, error: 'Statistikani yuklashda xatolik' }, { status: 500 });
  }
}
