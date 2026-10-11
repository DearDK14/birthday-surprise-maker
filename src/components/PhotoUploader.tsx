import React, { useState, useRef } from 'react';
import { Upload, X, ArrowUp, ArrowDown, Image as ImageIcon, AlertCircle, Sparkles } from 'lucide-react';
import { PhotoItem } from '../types/birthday';
import { processAndUploadImage } from '../lib/storage';

interface PhotoUploaderProps {
  photos: PhotoItem[];
  onAddPhoto: (photo: PhotoItem) => void;
  onRemovePhoto: (id: string) => void;
  onReorderPhotos: (photos: PhotoItem[]) => void;
  onUpdateCaption: (id: string, caption: string) => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  photos,
  onAddPhoto,
  onRemovePhoto,
  onReorderPhotos,
  onUpdateCaption,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setErrorMessage(null);
    setIsUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const result = await processAndUploadImage(file);

      if (result.success && result.url) {
        const newPhoto: PhotoItem = {
          id: `photo_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          url: result.url,
          caption: '',
          sortOrder: photos.length + i,
          fileName: file.name,
        };
        onAddPhoto(newPhoto);
      } else {
        setErrorMessage(result.error || 'Failed to upload photo.');
      }
    }

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const movePhoto = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= photos.length) return;

    const newPhotos = [...photos];
    const [moved] = newPhotos.splice(index, 1);
    newPhotos.splice(targetIndex, 0, moved);
    onReorderPhotos(newPhotos);
  };

  return (
    <div className="space-y-6">
      {/* Upload Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 relative ${
          isDragging
            ? 'border-[#C8102E] bg-[#F7E7B4]/50 scale-[1.01]'
            : 'border-[#D4AF37] bg-[#FAF6EB]/60 hover:bg-[#FAF6EB] hover:border-[#C8102E]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/jpg"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF6EB] border border-[#D4AF37]/50 text-[#C8102E] flex items-center justify-center mb-3 shadow-inner">
            {isUploading ? (
              <div className="w-6 h-6 border-2 border-[#C8102E] border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload className="w-7 h-7 text-[#C8102E]" />
            )}
          </div>
          <h4 className="text-base font-bold text-[#111111] mb-1">
            {isUploading ? 'Optimizing photographs...' : 'Click to upload or drag & drop'}
          </h4>
          <p className="text-xs text-[#666666] mb-2">
            Upload beautiful moments of the birthday person (JPG, PNG, WebP up to 10MB)
          </p>
          <div className="inline-flex items-center gap-1.5 text-xs text-[#111111] bg-white px-3 py-1 rounded-full border border-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Multiple photos supported</span>
          </div>
        </div>
      </div>

      {/* Error Notice */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-[#C8102E] text-xs flex items-center gap-2 font-bold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Photos List / Gallery */}
      {photos.length === 0 ? (
        <div className="p-8 rounded-2xl border border-dashed border-[#D4AF37]/40 text-center bg-white/50">
          <ImageIcon className="w-10 h-10 text-[#D4AF37] mx-auto mb-2" />
          <p className="text-sm font-bold text-[#111111]">No memories added yet</p>
          <p className="text-xs text-[#666666] mt-1 max-w-xs mx-auto">
            Adding photographs creates an emotional, heartwarming photo memories gallery in their birthday surprise.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#666666] px-1">
            <span>{photos.length} {photos.length === 1 ? 'photograph' : 'photographs'} added</span>
            <span>Drag or use arrows to rearrange</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="bg-white rounded-xl border border-[#D4AF37]/40 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
              >
                {/* Image Preview Thumbnail */}
                <div className="relative h-44 bg-[#FAF6EB] overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.caption || `Memory ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Photo Order Badge */}
                  <div className="absolute top-2 left-2 bg-[#111111]/85 backdrop-blur-sm text-[#F7E7B4] text-[11px] font-bold px-2 py-0.5 rounded-md border border-[#D4AF37]/40">
                    #{index + 1}
                  </div>

                  {/* Actions overlay */}
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onRemovePhoto(photo.id)}
                      className="p-1.5 rounded-full bg-[#C8102E] text-white hover:bg-[#A00C24] transition-colors shadow-sm cursor-pointer"
                      title="Remove photograph"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Caption and Reorder Controls */}
                <div className="p-3 bg-white flex flex-col gap-2 flex-1 justify-between">
                  <div>
                    <label className="text-[11px] font-bold text-[#111111] block mb-1">
                      Caption (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Our favorite summer trip..."
                      value={photo.caption || ''}
                      onChange={(e) => onUpdateCaption(photo.id, e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[#EBD9A5] focus:border-[#C8102E] focus:outline-none focus:ring-1 focus:ring-[#F7E7B4]"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#FAF6EB]">
                    <span className="text-[10px] text-[#666666] truncate max-w-[120px]">
                      {photo.fileName || 'Photo'}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => movePhoto(index, 'up')}
                        className={`p-1 rounded text-[#111111] hover:bg-[#F7E7B4] hover:text-[#C8102E] cursor-pointer ${
                          index === 0 ? 'opacity-30 cursor-not-allowed' : ''
                        }`}
                        title="Move Earlier"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={index === photos.length - 1}
                        onClick={() => movePhoto(index, 'down')}
                        className={`p-1 rounded text-[#111111] hover:bg-[#F7E7B4] hover:text-[#C8102E] cursor-pointer ${
                          index === photos.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
                        }`}
                        title="Move Later"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
