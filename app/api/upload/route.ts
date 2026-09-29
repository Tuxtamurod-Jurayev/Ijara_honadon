import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Ruxsat berilmagan' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'Fayl topilmadi' }, { status: 400 });
    }

    // Size limit: 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: 'Fayl hajmi 5MB dan oshmasligi kerak' }, { status: 400 });
    }

    // MIME type check
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: 'Faqat JPG, PNG, WEBP formatdagi rasmlar qabul qilinadi' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const extension = file.name.split('.').pop() || 'jpg';
    const filename = `house_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${extension}`;

    // Try Supabase Storage first if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.storage
          .from('house-images')
          .upload(filename, buffer, {
            contentType: file.type,
            upsert: true,
          });

        if (!error && data) {
          const { data: publicUrlData } = supabase.storage
            .from('house-images')
            .getPublicUrl(filename);

          return NextResponse.json({
            success: true,
            url: publicUrlData.publicUrl,
            filename,
          });
        }
      } catch (err) {
        console.warn('Supabase storage upload failed, saving to local public folder', err);
      }
    }

    // Local uploads directory fallback
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const filePath = path.join(uploadsDir, filename);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
    });
  } catch (error) {
    console.error('API Error in POST /api/upload:', error);
    return NextResponse.json({ success: false, error: 'Rasm yuklashda xatolik yuz berdi' }, { status: 500 });
  }
}
