"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
};

export function BookCover({ src, alt }: Props) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      className="max-h-[360px] w-auto shadow-xl ring-1 ring-ink/10"
      onError={() => setHidden(true)}
    />
  );
}
