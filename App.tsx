import React, { useState, useEffect, useCallback } from 'react';
import { Copy, Hash, Wand2, Loader2, Check } from 'lucide-react';
import { stringToHex, getContrastColor, hexToRgbString } from './utils/colorUtils';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [hexColor, setHexColor] = useState<string>('#e2e8f0');
  const [contrastColor, setContrastColor] = useState<string>('#000000');
  
  // UI State
  const [copied, setCopied] = useState(false);

  // Update deterministic color whenever input changes
  useEffect(() => {
    if (inputText.trim() === '') {
      setHexColor('#e2e8f0'); // Default grey
      setContrastColor('#000000');
    } else {
      const color = stringToHex(inputText);
      setHexColor(color);
      setContrastColor(getContrastColor(color));
    }
  }, [inputText]);

  const handleCopy = useCallback((textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);


  return (
    <div className="min-h-screen flex flex-col md:flex-row transition-colors duration-700 ease-in-out">
      
      {/* Left Panel: Controls */}
      <div className="w-full md:w-1/2 min-h-[50vh] p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white/95 backdrop-blur-sm z-10 shadow-2xl md:shadow-none">
        <div className="max-w-md mx-auto w-full space-y-8">
          
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              ChromaString
            </h1>
            <p className="text-slate-500 text-lg">
              Type anything. Get a color.
            </p>
          </div>

          <div className="space-y-4">
            <label htmlFor="input" className="block text-sm font-medium text-slate-700">
              Your Text
            </label>
            <div className="relative">
              <input
                type="text"
                id="input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter a word, name, or phrase..."
                className="block w-full rounded-xl border-slate-200 bg-slate-50 p-4 text-lg focus:border-indigo-500 focus:ring-indigo-500 shadow-sm transition-all outline-none border-2"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Hash className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
             <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-600">Deterministic Result</span>
             </div>
             <div 
                className="group relative h-24 rounded-xl flex items-center justify-between px-6 shadow-sm border border-slate-200 transition-all cursor-pointer overflow-hidden"
                style={{ backgroundColor: hexColor }}
                onClick={() => handleCopy(hexColor)}
             >
                <span className="font-mono text-xl font-bold tracking-wider z-10" style={{ color: contrastColor }}>
                  {hexColor}
                </span>
                
                <div className="flex items-center gap-2 z-10">
                  <span className="text-sm font-medium" style={{ color: contrastColor, opacity: 0.8 }}>
                    {copied ? 'Copied!' : 'Click to copy'}
                  </span>
                  {copied ? (
                    <Check className="w-5 h-5" style={{ color: contrastColor }} />
                  ) : (
                    <Copy className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: contrastColor }} />
                  )}
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
             </div>
          </div>



        </div>
      </div>

      {/* Right Panel: Immersive Preview */}
      <div 
        className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 md:relative transition-colors duration-500 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: hexColor }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-overlay" />
        
        <div className="relative text-center p-8 transform transition-transform duration-500 hover:scale-105">
           {inputText ? (
             <>
                <h2 
                  className="text-5xl md:text-7xl font-black tracking-tighter mb-4 break-words max-w-lg mx-auto leading-tight"
                  style={{ color: contrastColor }}
                >
                  {inputText}
                </h2>
                <div 
                  className="inline-block px-4 py-1 rounded-full text-sm font-mono opacity-60 bg-black/10 backdrop-blur-md"
                  style={{ color: contrastColor }}
                >
                  RGB({hexToRgbString(hexColor)})
                </div>
             </>
           ) : (
             <div className="text-center opacity-30 select-none">
               <div className="text-8xl mb-4">🎨</div>
               <p className="text-2xl font-light">Start typing to paint</p>
             </div>
           )}
        </div>
      </div>

    </div>
  );
};

export default App;