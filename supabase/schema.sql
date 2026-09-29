-- =========================================================
-- IJARA XONADONI — SUPABASE DATABASE SCHEMA & POLICIES
-- =========================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. HOUSES TABLE
CREATE TABLE IF NOT EXISTS public.houses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL DEFAULT 40.9983,
    longitude DOUBLE PRECISION NOT NULL DEFAULT 71.6726,
    rooms INTEGER NOT NULL DEFAULT 1,
    area NUMERIC NOT NULL DEFAULT 40,
    price NUMERIC NOT NULL DEFAULT 1000000,
    price_type VARCHAR(50) NOT NULL DEFAULT 'xonadon', -- 'odam_boshi', 'xona', 'xonadon'
    phone VARCHAR(50) NOT NULL,
    for_family BOOLEAN NOT NULL DEFAULT true,
    for_students BOOLEAN NOT NULL DEFAULT true,
    amenities JSONB NOT NULL DEFAULT '{
        "refrigerator": true,
        "tv": true,
        "air_conditioner": true,
        "washing_machine": true,
        "wifi": true,
        "furniture": true,
        "kitchen": true,
        "bathroom": true
    }'::jsonb,
    images JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of 3 image URLs
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE' or 'INACTIVE'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast status and created_at sorting
CREATE INDEX IF NOT EXISTS idx_houses_status ON public.houses(status);
CREATE INDEX IF NOT EXISTS idx_houses_created_at ON public.houses(created_at DESC);

-- 2. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.houses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous & public read access ONLY to ACTIVE houses
CREATE POLICY "Public users can view active houses" 
ON public.houses 
FOR SELECT 
USING (status = 'ACTIVE');

-- Allow authenticated users (Admins) full access
CREATE POLICY "Admins can view and manage all houses" 
ON public.houses 
FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- 3. STORAGE BUCKET FOR HOUSE IMAGES
INSERT INTO storage.buckets (id, name, public)
VALUES ('house-images', 'house-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public can view images
CREATE POLICY "Public house images are viewable by everyone"
ON storage.objects FOR SELECT
USING (bucket_id = 'house-images');

-- Authenticated admins can upload house images
CREATE POLICY "Admins can upload house images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'house-images');

-- Authenticated admins can update/delete house images
CREATE POLICY "Admins can update and delete house images"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'house-images');
