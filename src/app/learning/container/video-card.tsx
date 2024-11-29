"use client"

import React from "react";
import Link from "next/link";
import NextImage from "@/components/NextImage";

interface VideoCardProps {
  title: string;
  imageSrc: string;
  link: string;
}

function VideoCard({
  title,
  imageSrc,
  link,
}: VideoCardProps) {
  return (
    <Link href={link} className="w-[500px] h-[300px]">
      <NextImage
        src={imageSrc}
        alt={title}
        width={400}
        height={300}
        imgClassName="rounded-md"
      />
    </Link>
  );
}

export default VideoCard;