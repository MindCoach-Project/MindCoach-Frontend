/**
 * Utility functions for working with Cloudinary
 */

/**
 * Ensures a URL uses HTTPS instead of HTTP
 * @param {string} url - The URL to check and modify if needed
 * @returns {string} - The URL with HTTPS protocol
 */
export const ensureHttps = (url) => {
    if (url && url.startsWith("http://")) {
      return url.replace("http://", "https://")
    }
    return url
  }
  
  /**
   * Requests a secure URL from Cloudinary
   * @param {string} cloudName - Your Cloudinary cloud name
   * @param {string} publicId - The public ID of the image
   * @returns {string} - A secure URL for the image
   */
  export const getSecureUrl = (cloudName, publicId) => {
    return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`
  }
  
  /**
   * Extracts the public ID from a Cloudinary URL
   * @param {string} url - The Cloudinary URL
   * @returns {string} - The public ID
   */
  export const getPublicIdFromUrl = (url) => {
    if (!url) return ""
  
    // Extract the part after the last slash and before any query parameters
    const parts = url.split("/")
    const lastPart = parts[parts.length - 1]
    return lastPart.split("?")[0]
  }
  
  