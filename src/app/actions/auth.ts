'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAdmin(formData: FormData) {
  const user = formData.get('user') as string;
  const pass = formData.get('pass') as string;

  // The user should be "cele" (case-insensitive)
  // The password should be "nairda" (case-sensitive)
  if (user?.toLowerCase() === 'cele' && pass === 'nairda') {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    return { success: true };
  }

  return { success: false, error: 'Usuario o contraseña incorrectos' };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}
