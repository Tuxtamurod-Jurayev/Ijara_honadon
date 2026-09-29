import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials, setAdminSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email va parol kiritilishi shart' }, { status: 400 });
    }

    const isValid = await verifyAdminCredentials(email, password);
    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Email yoki parol noto‘g‘ri' }, { status: 401 });
    }

    await setAdminSession();
    return NextResponse.json({
      success: true,
      message: 'Tizimga muvaffaqiyatli kirildi',
      user: { name: 'Administrator', email },
    });
  } catch (error) {
    console.error('API Error in POST /api/auth/login:', error);
    return NextResponse.json({ success: false, error: 'Kirishda xatolik yuz berdi' }, { status: 500 });
  }
}
