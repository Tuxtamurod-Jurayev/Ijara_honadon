# IJARA XONADONI — WEB PLATFORMASI

Zamonaviy ijara xonadonlarini qidirish, ko‘rish va boshqarish uchun mo‘ljallangan to‘liq web-platforma (Next.js 16, TypeScript, Tailwind CSS, Supabase PostgreSQL, Leaflet OpenStreetMap).

---

## 🌟 Asosiy Imkoniyatlar

### 👤 Oddiy Foydalanuvchi (User)
- **Ro‘yxatdan o‘tish yoki login shart emas**: Saytga kirib to‘g‘ridan-to‘g‘ri reklamalarni ko‘rish mumkin.
- **Faqat ACTIVE reklamalar**: Faqat faol va mavjud uylar ko‘rinadi.
- **Keng qamrovli Qidiruv va Filtr**:
  - Manzil va tumanlar bo‘yicha qidiruv (masalan: *Namangan shahar, Davlatobod, Chorsu...*)
  - Minimal va maksimal narx bo‘yicha filtr
  - Xonalar soni bo‘yicha tezkor tanlov (*1, 2, 3, 4+*)
  - Kimlar uchun (*Oilaviy, Talabalar*)
  - Narx turi (*Xonadon uchun, Xona uchun, Odam boshiga*)
  - Qulayliklar (*Konditsioner, Televizor, Muzlatkich, Wi-Fi, Kir yuvish mashinasi, Mebel, Oshxona, Hammom*)
- **Batafsil sahifa**:
  - **3 ta rasm galereyasi** (Asosiy katta rasm + 2 ta yon rasm + to‘liq hajmda ochish)
  - Xonadon qulayliklari (aniq belgilar bilan)
  - **Interaktiv xarita (OpenStreetMap + Leaflet)** orqali xonadonning aniq lokatsiyasi
  - Google Xarita va Yandex Xaritada bitta tugma bilan ochish
  - To‘g‘ridan-to‘g‘ri telefon qilish (`tel:`) tugmasi

---

### 🛡️ Admin Panel (`/admin`)
- **Xavfsiz login**: `/admin/login` (Cookie asosidagi himoyalangan sessiya)
- **Dashboard**:
  - JAMI xonadonlar soni
  - ACTIVE xonadonlar soni
  - INACTIVE xonadonlar soni
  - O‘rtacha oylik ijara narxi
- **To‘liq CRUD**:
  - **Create**: Yangi xonadon qo‘shish (Sarlavha, Manzil, Xaritadan koordinatani belgilash, 3 ta rasm yuklash/havola, narx, telefon, qulayliklar)
  - **Read**: Barcha xonadonlarni ko‘rish (Active va Inactive)
  - **Update**: Xonadon ma’lumotlarini, rasmlarini va lokatsiyasini tahrirlash
  - **Delete**: Xonadonni o‘chirish (tasdiqlash modali bilan: *"Haqiqatan ham ushbu reklamani o‘chirmoqchimisiz?"*)
  - **Active / Inactive Status Switch**: Jadvalning o‘zida bitta tugma orqali statusni tezkor o‘zgartirish

---

## 🚀 Texnologiyalar

| Bo‘lim | Texnologiya |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS |
| **Ikonkalar** | Lucide React |
| **Xarita** | Leaflet + OpenStreetMap (bepul, API kalit talab qilmaydi) |
| **Backend & API** | Next.js API Routes (Route Handlers) |
| **Ma’lumotlar bazasi** | Supabase PostgreSQL (+ Mahalliy JSON avtomatik fallback) |
| **Rasm saqlash** | Supabase Storage (`house-images` bucketi) |
| **Deployment** | GitHub + Vercel moslashuvi |

---

## 🛠️ Loyihani Mahalliy Ishga Tushirish

### 1. Bog‘liqliklarni o‘rnatish:
```bash
npm install
```

### 2. Dasturni ishga tushirish (Dev server):
```bash
npm run dev
```

Brauzerda oching:
- **Asosiy sayt**: [http://localhost:3000](http://localhost:3000)
- **Admin panel**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 🔑 Standart Admin Ma’lumotlari

| Maydon | Qiymat |
|---|---|
| **Email** | `admin@ijara.uz` |
| **Parol** | `admin123` |

*(Login sahifasida bitta tugma orqali avtomatik to‘ldirish tugmasi ham mavjud)*

---

## 🗄️ Supabase Ma’lumotlar Bazasini Ulash

Loyiha mahalliy rejimda o‘rnatilgan zaxira ma’lumotlar bilan **hech qanday sozlamalarsiz ham darhol ishlaydi**.

Agar Supabase bilan bog‘lamoqchi bo‘lsangiz:

1. [Supabase.com](https://supabase.com) saytida yangi loyiha oching.
2. `supabase/schema.sql` fayli ichidagi SQL kodini Supabase **SQL Editor** bo‘limiga nusxalab, **Run** tugmasini bosing.
3. Loyiha ildizidagi `.env.local` fayliga quyidagi o‘zgaruvchilarni kiriting:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
ADMIN_EMAIL=admin@ijara.uz
ADMIN_PASSWORD=admin123
```

---

## ☁️ GitHub va Vercel’ga Joylash (Deployment)

1. **Git commit & push**:
   ```bash
   git add .
   git commit -m "Ijara Xonadoni to'liq platformasi tayyor"
   git push origin main
   ```

2. **Vercel**:
   - [vercel.com](https://vercel.com) ga kiring va GitHub repozitoriyangizni ulang.
   - Environment Variables bo‘limida `NEXT_PUBLIC_SUPABASE_URL` va `NEXT_PUBLIC_SUPABASE_ANON_KEY` ni kiriting.
   - **Deploy** tugmasini bosing.
