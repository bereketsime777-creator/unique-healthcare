import { useEffect } from 'react';

/**
 * Hook to dynamically update OpenGraph and meta tags
 * Useful for CSR React apps to provide social sharing metadata
 */
export const useMetaTags = (meta = {}) => {
  useEffect(() => {
    // Set document title
    if (meta.title) {
      document.title = meta.title;
    }

    // Helper function to set or update meta tag
    const setMetaTag = (property, content, type = 'name') => {
      let tag = document.querySelector(`meta[${type}="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(type, property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Helper function to set or update OG tag
    const setOGTag = (property, content) => {
      setMetaTag(property, content, 'property');
    };

    // Set standard meta tags
    if (meta.description) {
      setMetaTag('description', meta.description);
    }

    if (meta.keywords) {
      setMetaTag('keywords', meta.keywords);
    }

    // Set OpenGraph tags
    if (meta.ogTitle) {
      setOGTag('og:title', meta.ogTitle);
    }

    if (meta.ogDescription) {
      setOGTag('og:description', meta.ogDescription);
    }

    if (meta.ogImage) {
      setOGTag('og:image', meta.ogImage);
      setOGTag('og:image:width', '1200');
      setOGTag('og:image:height', '630');
      setOGTag('og:image:type', 'image/jpeg');
    }

    if (meta.ogUrl) {
      setOGTag('og:url', meta.ogUrl);
    }

    if (meta.ogType) {
      setOGTag('og:type', meta.ogType);
    } else {
      setOGTag('og:type', 'website');
    }

    // Set site name
    if (meta.ogSiteName) {
      setOGTag('og:site_name', meta.ogSiteName);
    }

    // Set Twitter Card tags
    if (meta.twitterCard) {
      setMetaTag('twitter:card', meta.twitterCard);
    }

    if (meta.twitterTitle) {
      setMetaTag('twitter:title', meta.twitterTitle);
    }

    if (meta.twitterDescription) {
      setMetaTag('twitter:description', meta.twitterDescription);
    }

    if (meta.twitterImage) {
      setMetaTag('twitter:image', meta.twitterImage);
    }

    // Set canonical URL
    if (meta.canonical) {
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', meta.canonical);
    }

  }, [meta]);
};

/**
 * Hook to add JSON-LD structured data
 */
export const useJsonLd = (structuredData) => {
  useEffect(() => {
    if (!structuredData) return;

    // Remove old script tag if exists
    const oldScript = document.querySelector('script[type="application/ld+json"]');
    if (oldScript) {
      oldScript.remove();
    }

    // Create and add new script tag
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Cleanup
      script.remove();
    };
  }, [structuredData]);
};
