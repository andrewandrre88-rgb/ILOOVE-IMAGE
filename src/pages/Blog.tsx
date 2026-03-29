import { motion } from 'motion/react';
import BlogCard from '../components/BlogCard';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const blogPosts = [
  {
    slug: "compress-images-faster-loading",
    title: "How to compress images for faster website loading",
    excerpt: "Slow websites kill conversions. Learn how to use our compression tool to reduce file sizes by up to 80% without visible quality loss.",
    date: "March 27, 2026",
    category: "Optimization",
    imageUrl: "https://picsum.photos/seed/compress-blog/600/400",
    content: `
# How to compress images for faster website loading

In today's digital landscape, speed is everything. A one-second delay in page load time can lead to a 7% reduction in conversions. One of the primary culprits for slow websites is unoptimized images.

## Why Compression Matters
Large image files consume significant bandwidth and take longer for browsers to download. By compressing your images, you can:
- Improve SEO rankings (Google loves fast sites)
- Reduce bounce rates
- Save storage space on your server
- Provide a better experience for mobile users on limited data plans

## How to Use Our Tool
1. **Upload your images**: Simply drag and drop your files into the compression zone.
2. **Choose your level**: Our smart algorithm automatically finds the best balance between size and quality.
3. **Download**: Get your optimized images instantly.

## Best Practices
Always aim for images under 200KB for full-width banners and under 50KB for smaller assets. Using modern formats like WebP can also help, but standard JPG compression remains a universal standard for compatibility.
    `
  },
  {
    slug: "resize-images-social-media",
    title: "How to resize images for Instagram and social media",
    excerpt: "Stop getting your photos cropped awkwardly. Master the perfect aspect ratios for every social platform using our Resize tool.",
    date: "March 25, 2026",
    category: "Social Media",
    imageUrl: "https://picsum.photos/seed/resize-blog/600/400",
    content: `
# How to resize images for Instagram and social media

Social media platforms are constantly changing their recommended image sizes. Posting the wrong dimensions can lead to awkward cropping or pixelated images.

## Standard Sizes for 2026
- **Instagram Feed**: 1080 x 1080 (Square) or 1080 x 1350 (Portrait)
- **Instagram Stories**: 1080 x 1920
- **Facebook Cover**: 820 x 312
- **Twitter Header**: 1500 x 500

## Why Resizing is Better Than Cropping
When you resize, you maintain the entire content of your image while adjusting its dimensions. This is crucial for maintaining brand consistency across different platforms.

## Pro Tip
Always start with the highest resolution possible. It's easy to scale down, but scaling up will always result in quality loss.
    `
  },
  {
    slug: "crop-images-perfect-composition",
    title: "How to crop images without losing perfect composition",
    excerpt: "The rule of thirds is your friend. Discover how to use our visual cropping tool to highlight the best parts of your photography.",
    date: "March 22, 2026",
    category: "Photography",
    imageUrl: "https://picsum.photos/seed/crop-blog/600/400",
    content: `
# How to crop images without losing perfect composition

Cropping is more than just removing unwanted edges; it's a powerful tool for storytelling and composition.

## The Rule of Thirds
Imagine your image is divided into a 3x3 grid. Placing your subject along these lines or at their intersections creates a more balanced and engaging photo. Our cropping tool includes a grid overlay to help you align perfectly.

## Changing the Focus
Sometimes a wide shot has a hidden gem inside. By cropping tightly on a specific detail, you can create a completely different mood or message.

## Aspect Ratios
Don't forget that cropping often changes the aspect ratio. If you're printing, stick to standard sizes like 4x6 or 8x10 to avoid issues later.
    `
  },
  {
    slug: "convert-png-to-jpg-smaller-files",
    title: "How to convert PNG to JPG for smaller file sizes",
    excerpt: "Transparent backgrounds are great, but sometimes you just need a small file. Learn when and how to convert your PNGs to JPG.",
    date: "March 20, 2026",
    category: "Conversion",
    imageUrl: "https://picsum.photos/seed/png-blog/600/400",
    content: `
# How to convert PNG to JPG for smaller file sizes

PNG and JPG serve different purposes. Knowing when to switch can save you megabytes of space.

## PNG vs. JPG
- **PNG**: Best for graphics with transparency, text-heavy images, and screenshots. It uses lossless compression.
- **JPG**: Best for photographs and complex images. It uses lossy compression, which results in much smaller files.

## When to Convert
If your PNG doesn't have a transparent background and is a photograph, converting it to JPG can reduce the file size by 70-90% with almost no visible difference.

## Our Conversion Process
Our tool handles the conversion server-side to ensure the highest fidelity. We automatically flatten transparency to a white background (the industry standard) when moving to JPG.
    `
  },
  {
    slug: "jpg-to-png-high-quality",
    title: "How to turn your JPG photos into high-quality PNGs",
    excerpt: "Need to preserve every pixel? We'll show you how to convert JPG to PNG and why it matters for your digital assets.",
    date: "March 18, 2026",
    category: "Conversion",
    imageUrl: "https://picsum.photos/seed/jpg-blog/600/400",
    content: `
# How to turn your JPG photos into high-quality PNGs

While JPG is great for storage, PNG is the king of editing.

## Why Convert to PNG?
If you plan on editing a photo multiple times, saving it as a JPG each time will degrade the quality (generation loss). Converting to PNG first allows you to save as many times as you want without further degradation.

## Use Cases
- Graphic design projects
- Professional printing
- Archiving important memories
- Creating assets for video editing

## Limitations
Remember that converting a low-quality JPG to PNG won't "fix" the quality. It just prevents it from getting worse.
    `
  },
  {
    slug: "edit-photos-online-pro",
    title: "How to edit photos online like a pro for free",
    excerpt: "You don't need expensive software. Explore our Photo Editor's filters, text overlays, and adjustment tools to enhance your shots.",
    date: "March 15, 2026",
    category: "Editing",
    imageUrl: "https://picsum.photos/seed/editor-blog/600/400",
    content: `
# How to edit photos online like a pro for free

Professional photo editing is now accessible to everyone through our online suite.

## Essential Adjustments
- **Brightness & Contrast**: The foundation of any good edit.
- **Saturation**: Make colors pop or go for a moody black and white.
- **Sharpening**: Bring out the details in your subject.

## Using Filters
Filters aren't just for Instagram. Use them subtly to unify a series of photos or set a specific tone for your brand.

## Adding Text and Elements
Our editor allows you to add professional typography and shapes. This is perfect for creating quick social media ads or blog headers without opening Photoshop.
    `
  },
  {
    slug: "watermark-images-copyright",
    title: "How to watermark your images to protect your copyright",
    excerpt: "Don't let others steal your work. Learn how to add subtle, professional watermarks to your entire image library in bulk.",
    date: "March 12, 2026",
    category: "Security",
    imageUrl: "https://picsum.photos/seed/watermark-blog/600/400",
    content: `
# How to watermark your images to protect your copyright

In the age of AI and easy downloads, protecting your visual assets is more important than ever.

## Types of Watermarks
- **Text**: Your name or website URL.
- **Logo**: A transparent PNG of your brand mark.
- **Tiled**: A repeating pattern for maximum security.

## Best Practices for Placement
A good watermark should be visible enough to deter theft but subtle enough not to ruin the viewing experience. Placing it in a corner or integrated into a busy area of the photo makes it harder to remove with AI tools.

## Bulk Processing
Our tool allows you to upload hundreds of images and apply the same watermark to all of them in seconds, saving you hours of manual work.
    `
  },
  {
    slug: "viral-memes-generator",
    title: "How to make viral memes in seconds with our generator",
    excerpt: "Timing is everything in the meme world. Use our popular templates and quick text editor to join the conversation instantly.",
    date: "March 10, 2026",
    category: "Creative",
    imageUrl: "https://picsum.photos/seed/meme-blog/600/400",
    content: `
# How to make viral memes in seconds with our generator

Memes are the universal language of the internet. Here's how to master them.

## Finding the Right Template
We keep our library updated with the latest trending formats. Browse by "New" or "Popular" to find the perfect canvas for your joke.

## Typography Matters
The "Impact" font is classic, but modern memes often use clean sans-serifs. Our generator gives you the flexibility to choose what fits your style.

## Exporting for Success
Memes should be lightweight. Our generator automatically optimizes the output so it loads instantly on Discord, Reddit, or Twitter.
    `
  },
  {
    slug: "rotate-multiple-images-workflow",
    title: "How to rotate multiple images at once for better workflow",
    excerpt: "Fix your orientation issues in bulk. We'll show you how to rotate hundreds of landscape or portrait images in one click.",
    date: "March 08, 2026",
    category: "Workflow",
    imageUrl: "https://picsum.photos/seed/rotate-blog/600/400",
    content: `
# How to rotate multiple images at once for better workflow

Nothing slows down a project like having to rotate 500 photos individually.

## Smart Rotation
Our tool can detect the orientation of your images. You can choose to rotate only the portrait shots or only the landscape ones, which is a massive time-saver for photographers.

## Why Orientation Metadata Fails
Sometimes cameras save "rotation flags" that don't work everywhere. Our tool physically rotates the pixels, ensuring your images look correct on every device and platform.

## Quality Preservation
We use lossless rotation techniques for JPGs whenever possible, meaning you don't lose any detail when fixing the orientation.
    `
  },
  {
    slug: "html-to-image-high-res",
    title: "How to convert any HTML webpage into a high-res image",
    excerpt: "Need a screenshot of a full page? Learn how to use our HTML to Image tool to capture pixel-perfect web designs.",
    date: "March 05, 2026",
    category: "Development",
    imageUrl: "https://picsum.photos/seed/html-blog/600/400",
    content: `
# How to convert any HTML webpage into a high-res image

Capturing web design for portfolios or bug reports shouldn't be hard.

## Why Use a Tool Instead of a Screenshot?
Standard screenshots are limited by your screen resolution. Our HTML to Image tool renders the page on our high-performance servers, allowing for:
- Full-page captures (no scrolling needed)
- High-DPI (Retina) quality
- Consistent rendering across different devices

## How to Use
1. **Paste the URL**: Enter the web address you want to capture.
2. **Select Format**: Choose between JPG for smaller files or SVG for vector-like scalability.
3. **Capture**: Wait a few seconds for our engine to render and download.

## Use Cases
- Design portfolios
- Archiving web content
- Social media sharing of articles
- Visual regression testing
    `
  }
];

export default function Blog() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-blue-600 font-bold hover:translate-x-[-4px] transition-transform mb-6">
            <ChevronLeft className="mr-1 h-5 w-5" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase mb-4">
            Our <span className="text-blue-600">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Tips, tricks, and tutorials to help you master image editing and web performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard 
              key={index} 
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              category={post.category}
              imageUrl={post.imageUrl}
              slug={post.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
