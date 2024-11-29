"use client";

import React from "react";
import Typography from "@/components/Typography";
import NextImage from "@/components/NextImage";
import Button from "@/components/button/button";

interface PathCardProps {
  title: string;
  description: string;
  imageSrc: string;
  pathId: string;
}

function PathCard({
  title,
  description,
  imageSrc,
  pathId,
}: PathCardProps) {
  return (
    <div className="w-full h-full py-8  rounded-[10px] border border-normal flex flex-col gap-4 justify-center items-center px-6">
      <NextImage
        src={imageSrc}
        alt={title}
        width={200}
        height={200}
        imgClassName="rounded-full"
      />
      <Typography
        variant="t"
        weight="semibold"
        className="mt-2 text-left w-full"
      >
        {title}
      </Typography>
      <Typography
        variant="bl"
        weight="regular"
        className="text-left w-full"
      >
        {description}
      </Typography>
      <div className="flex flex-col gap-2 mt-4 items-center">
        <Button href={`/learning/paths/${pathId}`} size="large">
          Belajar Sekarang
        </Button>
      </div>
    </div>
  );
}

export default PathCard;