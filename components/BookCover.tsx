"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  sizeClass?: string;
  eager?: boolean;
};

export function BookCover({
  src,
  alt,
  sizeClass = "max-h-[260px] sm:max-h-[320px] md:max-h-[400px]",
  eager = true,
}: Props) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      className={`block w-auto shadow-lg ring-1 ring-ink/10 ${sizeClass}`}
      onError={() => setHidden(true)}
    />
  );
}
