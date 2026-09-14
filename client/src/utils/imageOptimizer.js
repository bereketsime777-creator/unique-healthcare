/**
 * Image Optimizer Utility
 * Generates optimized Cloudinary image URLs with transformations
 * 
 * Optimizations:
 * - f_auto: Automatic format selection (JPEG/WebP)
 * - q_auto: Automatic quality optimization
 * - w_[width]: Responsive width sizing
 * - dpr_auto: Device pixel ratio auto-scaling
 */

/**
 * Get optimized image URL for product cards and thumbnails
 * Used for smaller images that need to load quickly on mobile
 * @param {string} imageUrl - Original Cloudinary image URL
 * @param {number} width - Width in pixels (default: 300)
 * @returns {string} Optimized image URL
 */
export const getOptimizedCardImage = (imageUrl, width = 300) => {
  if (!imageUrl || !imageUrl.includes('cloudinary')) {
    return imageUrl;
  }
  
  // Extract the base URL and file ID
  const parts = imageUrl.split('/upload/');
  if (parts.length !== 2) return imageUrl;
  
  const [baseUrl] = parts;
  const fileId = parts[1];
  
  // Add transformations: f_auto (auto format), q_auto (auto quality), w_ (width)
  return `${baseUrl}/upload/f_auto,q_auto,w_${width},dpr_auto/${fileId}`;
};

/**
 * Get optimized image URL for product detail pages
 * Used for larger images that are above the fold and need good quality
 * @param {string} imageUrl - Original Cloudinary image URL
 * @param {number} width - Width in pixels (default: 600)
 * @returns {string} Optimized image URL
 */
export const getOptimizedDetailImage = (imageUrl, width = 600) => {
  if (!imageUrl || !imageUrl.includes('cloudinary')) {
    return imageUrl;
  }
  
  // Extract the base URL and file ID
  const parts = imageUrl.split('/upload/');
  if (parts.length !== 2) return imageUrl;
  
  const [baseUrl] = parts;
  const fileId = parts[1];
  
  // Add transformations with higher width for detail page
  return `${baseUrl}/upload/f_auto,q_auto,w_${width},dpr_auto/${fileId}`;
};

/**
 * Get optimized image URL with custom width
 * Flexible function for any custom width requirements
 * @param {string} imageUrl - Original Cloudinary image URL
 * @param {number} width - Width in pixels
 * @returns {string} Optimized image URL
 */
export const getOptimizedImage = (imageUrl, width = 400) => {
  if (!imageUrl || !imageUrl.includes('cloudinary')) {
    return imageUrl;
  }
  
  const parts = imageUrl.split('/upload/');
  if (parts.length !== 2) return imageUrl;
  
  const [baseUrl] = parts;
  const fileId = parts[1];
  
  return `${baseUrl}/upload/f_auto,q_auto,w_${width},dpr_auto/${fileId}`;
};

/**
 * Get responsive image srcset for modern browsers
 * Returns string suitable for img srcset attribute
 * @param {string} imageUrl - Original Cloudinary image URL
 * @returns {string} srcset string with multiple widths
 */
export const getResponsiveImageSrcset = (imageUrl) => {
  if (!imageUrl || !imageUrl.includes('cloudinary')) {
    return '';
  }
  
  const card300 = getOptimizedCardImage(imageUrl, 300);
  const card400 = getOptimizedCardImage(imageUrl, 400);
  const card600 = getOptimizedCardImage(imageUrl, 600);
  
  return `${card300} 300w, ${card400} 400w, ${card600} 600w`;
};

/**
 * Safe wrapper - returns original URL if optimization fails
 * Ensures images always display, even if optimization encounters issues
 * @param {string} imageUrl - Original image URL
 * @param {string} type - Type: 'card' or 'detail'
 * @returns {string} Optimized or original URL
 */
export const getSafeOptimizedImage = (imageUrl, type = 'card') => {
  try {
    if (!imageUrl) return '';
    
    if (type === 'detail') {
      return getOptimizedDetailImage(imageUrl);
    }
    
    return getOptimizedCardImage(imageUrl);
  } catch (error) {
    // Silently fail and return original URL
    console.warn('Image optimization error:', error);
    return imageUrl || '';
  }
};
