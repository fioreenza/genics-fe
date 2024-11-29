import React from "react";
import Typography from "@/components/Typography";
import NextImage from "@/components/NextImage";
import { FaStar } from "react-icons/fa6";

interface TestimonialCardProps {
  testimonial: string;
  profileSrc: string;
  name: string;
  role: string;
  rating?: number;
}

function TestimonialCard({
  testimonial,
  profileSrc,
  name,
  role,
  rating = 5,
}: TestimonialCardProps) {
  return (
    <div className="shadow-lg border border-button p-10 space-y-4 rounded-xl flex flex-col justify-around items-center w-52 lg:w-72 text-center">
      <div className="flex justify-center space-x-1">
        {[...Array(rating)].map((_, index) => (
          <FaStar key={index} className="text-button" />
        ))}
      </div>
      <Typography variant="bs">{testimonial}</Typography>
      <NextImage src={profileSrc} alt={name} width={90} height={90} />
      <Typography>
        <span className="font-bold">{name}</span> <br /> {role}
      </Typography>
    </div>
  );
}

export default TestimonialCard;
