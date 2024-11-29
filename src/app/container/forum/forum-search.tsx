import ButtonNoLink from "@/components/button/buttonnolink";
import Input from "@/components/form/inputnoicon";
import { CiSearch } from "react-icons/ci";
import { useRef } from "react";

interface ForumSearchProps {
  onClick: (search: string) => void;
}

export default function ForumSearch({ onClick = () => {} }: ForumSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    if (inputRef.current) {
      onClick(inputRef.current.value);
    }
  };
  return (
    <div className="w-full flex gap-5">
      <Input
        placeholder="Cari forum berdasarkan Judul, Topik, atau Kategori"
        inputClassName="border-2 border-[#458FF6] focus:outline-none px-[20px] py-[21px] placeholder-[#458FF6] text-xl"
        inputRef={inputRef}
      />
      <ButtonNoLink
        size="large"
        variant="primary"
        className="font-semibold px-[32px] lg:px-[62px] flex items-center gap-2"
        onClick={handleSearchClick}
      >
        <div className="flex gap-2 items-center">
          <div className="text-xl">
            <CiSearch />
          </div>
          <div>Cari</div>
        </div>
      </ButtonNoLink>
    </div>
  );
}
