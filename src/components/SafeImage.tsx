'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src?: string;
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  fallbackSrc = '/images/portfolio/hero/home.jpg',
  alt,
  ...props
}: SafeImageProps) {
  // Start with the real src so server-rendered HTML shows the intended image (no fallback flash).
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || 'Ethereal Spaces'}
      onError={() => {
        if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc);
      }}
    />
  );
}
