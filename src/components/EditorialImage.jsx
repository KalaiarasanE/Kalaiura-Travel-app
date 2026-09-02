/* ==============================================================================
   AERORA — EDITORIAL IMAGE COMPONENT
   Graceful loading states, fade-in transitions, and broken image prevention
   ============================================================================== */

import React, { useState } from 'react';
import { getFallbackImage } from '../services/images';

export function EditorialImage({
  src,
  alt = 'Editorial travel view',
  className = '',
  aspectRatio = '16/10',
  style = {},
  fallbackType = 'hero',
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const imageSrc = hasError ? getFallbackImage(fallbackType) : (src || getFallbackImage(fallbackType));

  return (
    <div
      className={`image-loader-wrap ${isLoaded ? 'loaded' : ''} ${className}`}
      style={{
        aspectRatio,
        position: 'relative',
        width: '100%',
        ...style
      }}
    >
      {!isLoaded && <div className="skeleton image-loader-placeholder" />}
      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block'
        }}
        {...props}
      />
    </div>
  );
}
