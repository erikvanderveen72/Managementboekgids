"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  maxHeight?: number;
  eager?: boolean;
};

export function BookCover({ src, alt, maxHeight = 360, eager = true }: Props) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      className="w-auto shadow-lg ring-1 ring-ink/10"
      style={{ maxHeight: `${maxHeight}px` }}
      onError={() => setHidden(true)}
    />
  );
}
