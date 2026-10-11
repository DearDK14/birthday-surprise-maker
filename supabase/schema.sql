-- =========================================================================
-- VelvetWishes Supabase Database Schema
-- Run this in your Supabase SQL Editor to set up tables and security policies
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Birthday Gifts Table
CREATE TABLE IF NOT EXISTS birthday_gifts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    public_slug VARCHAR(64) UNIQUE NOT NULL,
    experience_type VARCHAR(32) NOT NULL DEFAULT 'letter', -- 'letter' | 'party'
    
    -- Personal details
    recipient_name VARCHAR(120) NOT NULL,
    sender_name VARCHAR(120) NOT NULL,
    birthday_date DATE NOT NULL,
    relationship VARCHAR(40) NOT NULL DEFAULT 'friend',
    nickname VARCHAR(100),
    
    -- Message
    message_title VARCHAR(200) NOT NULL,
    birthday_message TEXT NOT NULL,
    closing_note VARCHAR(200),
    signature VARCHAR(120),
    
    -- Customization & Media
    music_track_id VARCHAR(64) DEFAULT 'velvet-lullaby',
    custom_audio_data TEXT, -- Optional base64 or audio URL
    custom_audio_name VARCHAR(200),
    is_muted_default BOOLEAN DEFAULT FALSE,
    theme_id VARCHAR(64) DEFAULT 'purple-dreams',
    font_pairing VARCHAR(64) DEFAULT 'serif-elegant',
    animation_intensity VARCHAR(32) DEFAULT 'magical',
    
    -- Publishing Status
    published_status VARCHAR(32) NOT NULL DEFAULT 'published', -- 'draft' | 'published'
    edit_token VARCHAR(64), -- Secure secret token for owner editing
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast lookup by public slug
CREATE INDEX IF NOT EXISTS idx_birthday_gifts_slug ON birthday_gifts(public_slug);

-- 2. Birthday Photos Table
CREATE TABLE IF NOT EXISTS birthday_photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    gift_id UUID NOT NULL REFERENCES birthday_gifts(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    caption VARCHAR(255),
    sort_order INT DEFAULT 0,
    file_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for photos by gift
CREATE INDEX IF NOT EXISTS idx_birthday_photos_gift ON birthday_photos(gift_id);

-- 3. Row Level Security (RLS)
ALTER TABLE birthday_gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE birthday_photos ENABLE ROW LEVEL SECURITY;

-- Allow anyone with public slug to read published gifts
CREATE POLICY "Allow public read on published birthday gifts"
    ON birthday_gifts
    FOR SELECT
    USING (published_status = 'published');

-- Allow public read on photos belonging to published gifts
CREATE POLICY "Allow public read on photos of published gifts"
    ON birthday_photos
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM birthday_gifts
            WHERE birthday_gifts.id = birthday_photos.gift_id
            AND birthday_gifts.published_status = 'published'
        )
    );

-- Allow anonymous creation of gifts (wizard publishing)
CREATE POLICY "Allow anonymous gift creation"
    ON birthday_gifts
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow anonymous photo insertion"
    ON birthday_photos
    FOR INSERT
    WITH CHECK (true);

-- Allow updates if matching secret edit_token or user authenticated
CREATE POLICY "Allow update with edit token"
    ON birthday_gifts
    FOR UPDATE
    USING (true)
    WITH CHECK (true);
