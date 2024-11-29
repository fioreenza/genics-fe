import React from "react";
import Typography from "@/components/Typography";
import NextImage from "@/components/NextImage";
import Button from "@/components/button/button";

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  buttonText: string;
  className?: string;
  buttonLink: string;
}

function FeatureCard({
  title,
  description,
  imageSrc,
  buttonText,
  className,
  buttonLink,
}: FeatureCardProps) {
  return (
    <div className={`flex flex-col w-[300px] space-y-4 md:space-y-0 md:space-x-12 md:w-fit justify-around items-center ${className}`}>
      <div className="bg-white w-fit p-8 rounded-full">
        <NextImage
          src={imageSrc}
          alt={title}
          width={180}
          height={180}
          className="w-[100px] md:w-[120px] lg:w-[180px] rounded-full"
        />
      </div>
      <div className="flex items-center md:items-start flex-col space-y-4  md:w-[30rem]">
        <Typography variant="t" weight="medium" className="text-center md:text-start">
          {title}
        </Typography>
        <Typography variant="bs" className="text-gray-400 text-center md:text-start">
          {description}
        </Typography>
        <Button size="small" href={buttonLink}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export default FeatureCard;
