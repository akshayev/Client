// Image optimization utilities for better performance

/**
 * Get optimized image URL based on screen size and device
 * @param {string} baseUrl - Base image URL
 * @param {string} size - Size variant (thumbnail, small, medium, large)
 * @returns {string} - Optimized image URL
 */
export const getOptimizedImageUrl = (baseUrl, size = 'medium') => {
  if (!baseUrl) return '';
  
  // If it's already a processed image with size suffix, return as is
  if (baseUrl.includes('_thumbnail') || baseUrl.includes('_small') || 
      baseUrl.includes('_medium') || baseUrl.includes('_large')) {
    return baseUrl;
  }
  
  // For now, return the original URL
  // In production, you would replace this with actual size variants
  return baseUrl;
};

/**
 * Get responsive image sizes for different breakpoints
 * @param {string} containerSize - Container size (small, medium, large)
 * @returns {string} - Sizes attribute for img tag
 */
export const getResponsiveSizes = (containerSize = 'medium') => {
  const sizeMap = {
    small: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    medium: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
    large: '(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw',
    full: '100vw'
  };
  
  return sizeMap[containerSize] || sizeMap.medium;
};

/**
 * Preload critical images
 * @param {Array} imageUrls - Array of image URLs to preload
 */
export const preloadImages = (imageUrls) => {
  imageUrls.forEach(url => {
    if (url) {
      const img = new Image();
      img.src = url;
    }
  });
};

/**
 * Create a blur placeholder for images
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {string} - Base64 encoded blur placeholder
 */
export const createBlurPlaceholder = (width = 400, height = 300) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Create a simple gradient placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#1f2937');
  gradient.addColorStop(1, '#111827');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
};
