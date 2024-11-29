"use client"
import Typography from "@/components/Typography";
import ButtonNoLink from "@/components/button/buttonnolink";
import { useState, useEffect } from "react";

interface ForumChoiceProps {
  title?: string;
  choices?: string[];
  defaultChoice: string;
  handleFilter: (choice: string) => void;
}

export default function ForumChoice({ title = "Judul", choices = [], defaultChoice="", handleFilter=()=>{}}: ForumChoiceProps) {
  const [choose, setChoose] = useState<string>(defaultChoice);

  const handleClick = (choice: string) => {
    setChoose(choice);
    handleFilter(choice);
  }

  return (
    <div className="w-full flex flex-col gap-16">
      <Typography variant="h4" weight="semibold">{title}</Typography>
      <div className="flex flex-wrap gap-4 gap-x-8 lg:gap-x-16">
        {choices.map((choice, index) => (
          <ButtonNoLink onClick={() => handleClick(choice)} key={index} size="large" variant={choice === choose ? "primary" : "outline"}>{choice}</ButtonNoLink>
        ))}
      </div>
    </div>
  );
}
