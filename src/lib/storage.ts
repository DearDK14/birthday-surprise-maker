import { supabase, isSupabaseConfigured } from './supabaseClient';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export async function processAndUploadImage(file: File): Promise<UploadResult> {
  // 1. Validation
  if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
    return {
      success: false,
      error: `Invalid file type: ${file.name}. Only JPG, PNG, and WebP are supported.`,
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      success: false,
      error: `File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum size is 10MB.`,
    };
  }

  // 2. Compress/downscale slightly if above 1600px to ensure smooth fast loading
  try {
    const resizedDataUrl = await resizeImage(file, 1600, 1600, 0.88);

    // 3. If Supabase Storage is configured, upload to 'birthday-photos' bucket
    if (isSupabaseConfigured && supabase) {
      try {
        const fileExt = file.name.split('.').pop() || 'jpg';
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        // Convert base64 dataUrl back to Blob
        const blob = await fetch(resizedDataUrl).then(res => res.blob());

        const { error: uploadError } = await supabase.storage
          .from('birthday-photos')
          .upload(filePath, blob, { contentType: file.type, upsert: true });

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from('birthday-photos')
            .getPublicUrl(filePath);

          if (publicUrlData?.publicUrl) {
            return {
              success: true,
              url: publicUrlData.publicUrl,
            };
          }
        }
      } catch (storageErr) {
        console.warn('Supabase storage upload fallback to local dataUrl:', storageErr);
      }
    }

    // Default fast & reliable fallback: data URL
    return {
      success: true,
      url: resizedDataUrl,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Error processing image',
    };
  }
}

function resizeImage(file: File, maxWidth: number, maxHeight: number, quality: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image for processing'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
