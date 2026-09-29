import { NextResponse } from 'next/server';
import { removeAdminSession } from '@/lib/auth';

export async function POST() {
  try {
    await removeAdminSession();
    return NextResponse.json({ success: true, message: 'Tizimdan chiqildi' });
  } catch (error) {
    console.error('API Error in POST /api/auth/logout:', error);
    return NextResponse.json({ success: false, error: 'Chiqishda xatolik' }, { status: 500 });
  }
}
