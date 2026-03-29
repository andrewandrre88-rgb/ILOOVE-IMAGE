import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Download, Loader2, FileCode, Copy, Check } from 'lucide-react';

export default function HtmlToImage() {
  const [html, setHtml] = useState('<div style="padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 20px; text-align: center; font-family: sans-serif;">\n  <h1 style="margin: 0; font-size: 40px;">Hello iLoveIMG!</h1>\n  <p style="font-size: 20px; opacity: 0.8;">Convert your HTML to beautiful images instantly.</p>\n</div>');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const previewRef = useRef<HTMLDivElement>(null);

  const handleConvert = async () => {
    if (!previewRef.current) return;
    setIsProcessing(true);
    
    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: 2, // Higher quality
        useCORS: true,
      });
      
      setProcessedUrl(canvas.toDataURL('image/png'));
    } catch (error) {
      console.error('Failed to convert HTML to image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">HTML to Image</h1>
          <p className="text-xl text-gray-600">Convert your HTML and CSS snippets into high-quality images.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Editor */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">HTML Editor</h2>
                <button 
                  onClick={handleCopy}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? 'COPIED' : 'COPY CODE'}</span>
                </button>
              </div>
              
              <textarea 
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="w-full h-80 p-4 bg-gray-900 text-green-400 font-mono text-xs rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-600 transition-all resize-none"
                spellCheck={false}
              />

              <button
                onClick={handleConvert}
                disabled={isProcessing}
                className="w-full bg-red-600 text-white py-4 rounded-2xl font-black text-lg tracking-widest hover:bg-red-700 transition-all shadow-xl flex items-center justify-center space-x-3 disabled:opacity-50 uppercase"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>CONVERTING...</span>
                  </>
                ) : (
                  <>
                    <FileCode className="h-6 w-6" />
                    <span>Convert to Image</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="text-blue-900 font-bold mb-2 uppercase tracking-tight text-sm">Pro Tip</h3>
              <p className="text-blue-800 text-xs leading-relaxed">
                You can use inline styles to style your HTML. External stylesheets are not supported in this client-side version. 
                Perfect for creating social media cards, code snippets, or UI components.
              </p>
            </div>
          </div>

          {/* Preview & Result */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Live Preview</h2>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 min-h-[200px] flex items-center justify-center overflow-auto">
                <div 
                  ref={previewRef}
                  dangerouslySetInnerHTML={{ __html: html }}
                  className="inline-block"
                />
              </div>
            </div>

            {processedUrl && (
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-100 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-green-900 uppercase tracking-tight">Result Image</h2>
                  <a
                    href={processedUrl}
                    download="html_to_image.png"
                    className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold text-xs tracking-widest hover:bg-green-700 transition-all flex items-center space-x-2 uppercase"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </a>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-center">
                  <img 
                    src={processedUrl} 
                    alt="Result" 
                    className="max-w-full rounded-lg shadow-md"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
