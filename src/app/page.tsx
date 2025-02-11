'use client'

import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, RefreshCw } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Home() {
  const [url, setUrl] = useState('');
  const [qrSize, setQrSize] = useState(256);

  const downloadQR = () => {
    if (!url) {
      Swal.fire({
        icon: 'error',
        title: 'Hata!',
        text: 'Lütfen bir URL veya metin girin.',
        confirmButtonText: 'Tamam',
      });
      return;
    }
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'mc-qr-code.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const resetForm = () => {
    setUrl('');
    setQrSize(256);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
            MC QR Generator
          </h1>
          <p className="text-blue-200 text-lg md:text-xl">
            Hızlı ve kolay QR kod oluşturucu
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-blue-100 mb-2 text-lg">
                  URL veya Metin
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-blue-300/30 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>

              <div>
                <label className="block text-blue-100 mb-2 text-lg">
                  QR Kod Boyutu
                </label>
                <input
                  type="range"
                  min="128"
                  max="512"
                  value={qrSize}
                  onChange={(e) => setQrSize(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-blue-200 text-sm mt-1">{qrSize}px</div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={downloadQR}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Download size={20} />
                  İndir
                </button>
                <button
                  onClick={resetForm}
                  className="flex-1 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw size={20} />
                  Sıfırla
                </button>
              </div>
            </div>

            {/* QR Code Display */}
            <div className="flex items-center justify-center bg-white/5 rounded-xl p-6">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <QRCodeCanvas
                  value={url || 'https://example.com'}
                  size={qrSize}
                  level="H"
                  includeMargin={true}
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-blue-200">
          <p>&copy; {new Date().getFullYear()} MC app QR Generator. <a href="https://mehmetc.dev" target="_blank" rel="noopener noreferrer">Mehmet ÇİMEN</a> Tüm hakları saklıdır.</p>
        </footer>
      </div>
    </main>
  );
}