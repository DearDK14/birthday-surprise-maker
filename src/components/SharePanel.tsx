import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, ExternalLink, Download, Sparkles } from 'lucide-react';

interface SharePanelProps {
  slug: string;
  recipientName: string;
  compressedData?: string;
  onPreviewClick: () => void;
}

export const SharePanel: React.FC<SharePanelProps> = ({
  slug,
  recipientName,
  compressedData,
  onPreviewClick,
}) => {
  const [copied, setCopied] = useState(false);

  // Generate complete universal URL with compressed data fallback so it opens anywhere!
  const baseUrl = window.location.origin;
  const shareUrl = compressedData
    ? `${baseUrl}/#gift/${slug}?d=${compressedData}`
    : `${baseUrl}/#gift/${slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback copy
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById('gift-qr-code');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width + 40;
      canvas.height = img.height + 40;
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 20, 20);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `VelvetWishes_${slug}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#D4AF37]/40 max-w-2xl mx-auto space-y-8 text-left relative overflow-hidden">
      {/* Decorative Gold Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#F7E7B4]/50 rounded-full blur-3xl pointer-events-none" />

      {/* Celebration Header */}
      <div className="text-center space-y-2 relative z-10">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#C8102E] via-[#A00C24] to-[#C8102E] border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center mx-auto shadow-md shadow-red-200">
          <Sparkles className="w-8 h-8 text-[#D4AF37]" />
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
          Your Birthday Surprise is Published!
        </h3>
        <p className="text-xs sm:text-sm text-[#4A4A4A] max-w-md mx-auto leading-relaxed">
          Share this private link or QR code with{' '}
          <strong className="text-[#C8102E] font-bold">{recipientName || 'them'}</strong>. It will open the royal interactive surprise on any smartphone, tablet, or computer.
        </p>
      </div>

      {/* Share URL Box */}
      <div className="space-y-2 relative z-10">
        <label className="text-[11px] font-bold uppercase tracking-wider text-[#111111]">
          Shareable Website Link
        </label>
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-[#FAF6EB] border border-[#EBD9A5]">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="w-full bg-transparent px-3 py-1.5 text-xs text-[#111111] font-mono focus:outline-none select-all"
          />
          <button
            type="button"
            onClick={handleCopy}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-gradient-to-r from-[#C8102E] to-[#A00C24] hover:from-[#A00C24] hover:to-[#7A091B] text-white shadow-xs border border-[#D4AF37]/40'
            }`}
          >
            {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4 text-[#F7E7B4]" />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </div>

      {/* QR Code Presentation */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#FFFDF8] via-[#FAF6EB] to-[#F7E7B4]/50 border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center gap-6 justify-between shadow-2xs relative z-10">
        <div className="p-3.5 bg-white rounded-2xl shadow-sm border border-[#D4AF37]/50 shrink-0">
          <QRCodeSVG
            id="gift-qr-code"
            value={shareUrl}
            size={140}
            level="M"
            includeMargin={false}
            fgColor="#111111"
          />
        </div>

        <div className="space-y-2 text-center sm:text-left flex-1">
          <h4 className="font-serif text-base font-bold text-[#111111] flex items-center justify-center sm:justify-start gap-1.5">
            <span>Scan on Mobile</span>
            <Sparkles className="w-4 h-4 text-[#C8102E]" />
          </h4>
          <p className="text-xs text-[#4A4A4A] leading-relaxed">
            Print this QR code on a real greeting card or send the image directly for a delightful scan-to-open reveal!
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleDownloadQR}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#D4AF37] text-[#111111] hover:bg-[#FAF6EB] hover:text-[#C8102E] text-xs font-bold shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>Download QR Code Image</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Action: Gift Slug & Preview live page */}
      <div className="pt-4 border-t border-[#D4AF37]/25 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
        <span className="text-xs text-[#4A4A4A]">
          Gift Slug:{' '}
          <code className="font-mono text-[#C8102E] bg-[#F7E7B4]/60 px-2.5 py-1 rounded-md font-bold text-xs border border-[#D4AF37]/30">
            {slug}
          </code>
        </span>
        <button
          type="button"
          onClick={onPreviewClick}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C8102E] to-[#A00C24] hover:from-[#A00C24] hover:to-[#7A091B] text-white font-bold text-xs shadow-md hover:shadow-glow-red transition-all cursor-pointer border border-[#D4AF37]/40"
        >
          <ExternalLink className="w-4 h-4 text-[#F7E7B4]" />
          <span>Open Recipient Page</span>
        </button>
      </div>
    </div>
  );
};
