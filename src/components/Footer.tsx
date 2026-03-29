import { Github, Twitter, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">iLoveIMG</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Tools</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Compress IMAGE</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Resize IMAGE</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Crop IMAGE</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Convert to JPG</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Social</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Github className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        {/* SEO Keyword Section */}
        <div className="pt-12 pb-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-xs text-gray-500 leading-relaxed">
            <div>
              <h4 className="text-gray-400 font-bold mb-3 uppercase tracking-widest">Image Optimization</h4>
              <p>
                Our <a href="/compress" className="hover:text-blue-400">online image compressor</a> helps you reduce file sizes for JPG, PNG, SVG, and GIF formats. 
                Optimizing images is crucial for web performance and SEO. Use our <a href="/resize" className="hover:text-blue-400">image resizer</a> to 
                perfectly fit your website's layout and improve Core Web Vitals.
              </p>
            </div>
            <div>
              <h4 className="text-gray-400 font-bold mb-3 uppercase tracking-widest">Format Conversion</h4>
              <p>
                Easily <a href="/convert-to-jpg" className="hover:text-blue-400">convert PNG to JPG</a> or transform your images into high-quality formats. 
                Our <a href="/convert-to-jpg" className="hover:text-blue-400">online image converter</a> supports bulk processing, making it the best 
                choice for photographers and web developers looking for efficient workflows.
              </p>
            </div>
            <div>
              <h4 className="text-gray-400 font-bold mb-3 uppercase tracking-widest">Creative Tools</h4>
              <p>
                Create viral content with our <a href="/meme" className="hover:text-blue-400">meme generator</a> or use the <a href="/crop" className="hover:text-blue-400">image cropper</a> 
                to highlight the best parts of your photos. Protect your work with our <a href="#" className="hover:text-blue-400">watermark tool</a> 
                and edit like a pro with our comprehensive <a href="#" className="hover:text-blue-400">online photo editor</a>.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} iLoveIMG Clone. All rights reserved.</p>
          <p className="mt-2">The ultimate suite for free online image editing and optimization.</p>
        </div>
      </div>
    </footer>
  );
}
