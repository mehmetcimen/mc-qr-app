'use client'

import { useState } from 'react';
import Image from "next/image";
import { QRCodeSVG } from 'qrcode.react';
import { Loader2, Download, RotateCcw  } from 'lucide-react';
import { showSuccess, showError, showWarning, showConfirm } from '@/utils/sweetAlert';

export default function Home() {
  const [qrCodeData, setQrCodeData] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    const inputqrCode = (document.getElementById('txtQrCode') as HTMLInputElement).value;
    
    if (!inputqrCode) {
      showWarning('Lütfen bir metin giriniz.');
      return;
    }

    setIsLoading(true);
    try {
      setQrCodeData(inputqrCode);
    } catch (error) {
      console.error('QR kod oluşturma hatası:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const downloadSVG = () => {
    const svg = document.querySelector('.qr-code-svg') as SVGSVGElement;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'qrcode.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadPNG = () => {
    const svg = document.querySelector('.qr-code-svg') as SVGSVGElement;
    if (!svg) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = 250; // QR kod boyutu
    
    // Canvas boyutunu ayarla
    canvas.width = size;
    canvas.height = size;
    
    if (ctx) {
      // Arka planı beyaz yap
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, size, size);
      
      // SVG'yi data URL'e çevir
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);
      
      const img = document.createElement('img');
      
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        
        // Canvas'ı PNG olarak indir
        canvas.toBlob((blob) => {
          if (!blob) return;
          
          const pngUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = pngUrl;
          link.download = 'qrcode.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(pngUrl);
        }, 'image/png');
      };
      
      img.src = url;
    }
  };


  const handleReset = () => {
    setQrCodeData('');
    const input = document.getElementById('txtQrCode') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-8 w-full max-w-4xl">
          <input
            id="txtQrCode"
            type="text"
            placeholder="Metin,url  giriniz..."
            className="px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full text-lg"
          />
          <button 
            onClick={handleClick}
            disabled={isLoading}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Oluştur
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          {isLoading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-16 h-16 animate-spin text-blue-500" />
              <p className="text-lg text-gray-600">QR Kod Oluşturuluyor...</p>
            </div>
          ) : qrCodeData && (
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white p-4 rounded-lg">
                <QRCodeSVG
                  value={qrCodeData}
                  size={250}
                  className="qr-code-svg"
                  level="H"
                  includeMargin={true}
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={downloadSVG}
                  className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  SVG İndir
                </button>
                <button
                  onClick={downloadPNG}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  PNG İndir
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <RotateCcw  className="w-5 h-5" />
                  Yeni QR Oluştur
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://mehmetc.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mehmet ÇİMEN 
        </a>
      </footer>
    </div>
  );
}