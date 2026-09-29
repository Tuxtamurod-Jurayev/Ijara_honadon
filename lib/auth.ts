import { cookies } from 'next/headers';

const ADMIN_COOKIE_NAME = 'ijara_admin_session';

const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@ijara.uz',
  password: process.env.ADMIN_PASSWORD || 'admin123',
  name: 'Bosh Administrator',
};

export async function verifyAdminCredentials(email: string, pass: string): Promise<boolean> {
  const cleanEmail = email.trim().toLowerCase();
  return cleanEmail === DEFAULT_ADMIN.email.toLowerCase() && pass === DEFAULT_ADMIN.password;
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, 'authenticated_admin_token_2026', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function removeAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_COOKIE_NAME);
    return Boolean(session && session.value === 'authenticated_admin_token_2026');
  } catch {
    return false;
  }
}
