// src/data/products.js

export const products = [
  {
    id: 'prod_001',
    name: '"City Glow" T-Shirt',
    type: 'Merchandise',
    price: 29.99,
    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=600', // Placeholder image
    description: 'High-quality cotton t-shirt featuring the "Metropolis Glow" photograph. Available in multiple sizes.',
    details: {
      material: '100% Ring-Spun Cotton',
      sizes: ['S', 'M', 'L', 'XL'],
    }
  },
  {
    id: 'prod_002',
    name: 'Crimson Peaks - 4K Print',
    type: 'Photo',
    price: 49.99,
    image: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'A stunning high-resolution digital print of the "Crimson Peaks". Perfect for large format printing.',
    details: {
      resolution: '7680x4320 (8K)',
      format: 'JPEG, RAW',
    }
  },
  {
    id: 'prod_003',
    name: 'Ocean Waves Loop',
    type: 'Video',
    price: 79.99,
    image: 'https://images.pexels.com/photos/2881063/pexels-photo-2881063.jpeg?auto=compress&cs=tinysrgb&w=600', // Placeholder video thumbnail
    description: 'A seamless 15-second video loop of serene ocean waves. Shot in 4K ProRes.',
    details: {
      duration: '15 seconds',
      format: 'MP4, MOV',
      resolution: '3840x2160 (4K)',
    }
  },
  {
    id: 'prod_004',
    name: 'Signature Logo Mug',
    type: 'Merchandise',
    price: 18.50,
    image: 'https://images.pexels.com/photos/302896/pexels-photo-302896.jpeg?auto=compress&cs=tinysrgb&w=600', // Placeholder image
    description: 'A sturdy ceramic mug with our signature logo. Dishwasher and microwave safe.',
    details: {
      material: 'Ceramic',
      capacity: '11 oz (325 ml)',
    }
  },
  {
    id: 'prod_005',
    name: 'Misty Bridge - Wallpaper',
    type: 'Photo',
    price: 19.99,
    image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'An atmospheric shot perfect for desktop or mobile wallpapers. Includes multiple aspect ratios.',
    details: {
      resolution: '5120x2880 (5K)',
      format: 'PNG',
    }
  },
  {
    id: 'prod_006',
    name: 'Forest Light - 4K Print',
    type: 'Photo',
    price: 49.99,
    image: 'https://images.pexels.com/photos/1528640/pexels-photo-1528640.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'An ethereal high-resolution digital print of sunbeams in a forest.',
    details: {
      resolution: '7680x4320 (8K)',
      format: 'JPEG, RAW',
    }
  },
];