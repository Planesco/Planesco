"use client";

import Image from "next/image";
import { useState } from "react";

type StepIconProps = {
  src: string;
  stepNumber: number;
};

export default function StepIcon({ src, stepNumber }: StepIconProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="text-[18px] font-bold text-[#1C1E1F]" aria-hidden>
        {stepNumber}
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt=""
      width={28}
      height={28}
      className="object-contain"
      onError={() => setFailed(true)}
    />
  );
}
