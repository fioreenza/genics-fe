"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import clsxm from "@/lib/clsxm";
import Typography from "@/components/Typography";
import ButtonNoLink from "@/components/button/buttonnolink";
import ForumReply from "./forum-reply";
import Input from "@/components/form/inputnoicon";
import { IoCameraOutline } from "react-icons/io5";
import { BiImage } from "react-icons/bi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import moment from "moment";

interface ReplyProps {
  user: string;
  createdAt: string;
  reply: string;
}

interface QuestionBoxProps {
  id: number;
  title: string;
  reply: ReplyProps[];
  category: string;
}

const questionList = [
  {
    id: 1,
    title: "Bagaimana cara mengatasi burnout di tempat kerja?",
    reply: [],
    category: "Kesehatan Mental",
  },
  {
    id: 2,
    title: "Bagaimana cara mengatasi burnout di tempat kerja?",
    reply: [
      {
        user: "User1",
        createdAt: "17/08/2023",
        reply:
          "Mulai olahraga tanpa harus pergi ke gym sebenarnya gampang dan fleksibel banget. Aku biasanya mulai dengan bodyweight exercises di rumah, kayak push-up, sit-up, plank, atau squat. Latihan-latihan ini gak butuh alat sama sekali, jadi bisa langsung aja di ruang tamu atau kamar. Aku sering juga cari video workout di YouTube buat variasi, apalagi kalau lagi bosen sama gerakan yang itu-itu aja. Di sana banyak banget pilihan, dari yoga yang lebih tenang sampai HIIT yang intens buat cardio, jadi bisa sesuaiin sama mood.",
      },
    ],
    category: "Penyakit & Pengobatan",
  },
  {
    id: 3,
    title: "Bagaimana cara mengatasi burnout di tempat kerja?",
    reply: [],
    category: "Kesehatan Mental",
  },
  {
    id: 4,
    title: "Bagaimana cara mengatasi burnout di tempat kerja?",
    reply: [],
    category: "Kesehatan Mental",
  },
  {
    id: 5,
    title: "Bagaimana cara mengatasi burnout di tempat kerja?",
    reply: [],
    category: "Penyakit & Pengobatan",
  },
  {
    id: 6,
    title: "Bagaimana cara mengatasi burnout di tempat kerja?",
    reply: [],
    category: "Kesehatan Mental",
  },
  {
    id: 7,
    title: "Bagaimana cara mengatasi burnout di tempat kerja?",
    reply: [],
    category: "Kesehatan Mental",
  },
  {
    id: 8,
    title: "Bagaimana cara mengatasi burnout di tempat kerja?",
    reply: [],
    category: "Kesehatan Mental",
  },
  {
    id: 9,
    title: "Bagaimana cara mengatasi burnout di tempat kerja?",
    reply: [],
    category: "Kesehatan Mental",
  },
  {
    id: 10,
    title: "Bagaimana cara mengatasi burnout di tempat kerja?",
    reply: [],
    category: "Kesehatan Mental",
  },
  {
    id: 11,
    title: "Bagaimana cara mengatasi burnout di tempat kerja?",
    reply: [],
    category: "Kesehatan Mental",
  },
  {
    id: 12,
    title: "Bagaimana cara mengatasi burnout di tempat kerja?",
    reply: [],
    category: "Kesehatan Mental",
  },
  {
    id: 13,
    title: "Bagaimana cara mengatasi burnout di tempat kerja?",
    reply: [],
    category: "Kesehatan Mental",
  },
  {
    id: 14,
    title: "Bagaimana cara mengatasi burnout di tempat kerja?",
    reply: [],
    category: "Kesehatan Mental",
  },
  {
    id: 15,
    title: "Bagaimana cara mengatasi burnout di tempat kerja?",
    reply: [],
    category: "Kesehatan Mental",
  },
  {
    id: 16,
    title: "Bagaimana cara mengatasi burnout di tempat kerja?",
    reply: [],
    category: "Kesehatan Mental",
  },
  {
    id: 17,
    title: "Bagaimana cara mengatasi burnout di tempat kerja?",
    reply: [],
    category: "Kesehatan Mental",
  },
];

export default function ForumDetailPage() {
  const [question, setQuestion] = useState<QuestionBoxProps>(
    {} as QuestionBoxProps
  );
  const [isModalOpen, setisModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  useEffect(() => {
    setQuestion(
      questionList.find((question) => question.id === parseInt(id)) ||
        ({} as QuestionBoxProps)
    );
  }, [id]);

  const openModalHandler = () => setisModalOpen(true);
  const closeModalHandler = () => setisModalOpen(false);

  const handleSubmit = () => {
    if (question && inputRef?.current) {
      const newReply: ReplyProps = {
        user: "CurrentUser", // Replace with actual user if you have a user context
        createdAt: moment().format("l"),
        reply: inputRef.current.value,
      };

      // Update the question list with the new reply
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        reply: [...prevQuestion.reply, newReply],
      }));

      // Clear input after submit
      inputRef.current.value = "";
      closeModalHandler();
    }
  };

  return (
    <div className="mt-32 flex flex-col mx-10 lg:mx-20 gap-4">
      <div
        className={clsxm(
          "rounded-[10px] border-[1px] border-[#407BFF]",
          "p-[20px] md:p-[50px] w-full m-auto h-auto"
        )}
      >
        <div className="flex flex-col gap-4 lg:gap-[30px]">
          <div className="text-center border-[1px] bg-[#EFF4FF] text-[#458FF6] border-[#458FF6] rounded-[10px] max-w-[136px] text-[11px] px-2 py-2">
            {question.category}
          </div>
          <Typography className="text-[36px]">{question.title}</Typography>
        </div>
      </div>
      <div className="flex flex-col gap-[100px]">
        <ButtonNoLink onClick={openModalHandler} className="w-full">
          Jawab
        </ButtonNoLink>
        {question.reply &&
          question.reply.map((reply, index) => {
            return (
              <ForumReply
                key={index}
                user={reply.user}
                createdAt={reply.createdAt}
              >
                {reply.reply}
              </ForumReply>
            );
          })}
      </div>
      <div className="h-8"></div>

      {isModalOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-[#001B4178] opacity-50"></div>
          <div className="overflow-y-auto fixed z-50 inset-0 p-4 md:px-20 w-full max-w-[1200px] max-h-full flex items-center justify-center">
            <div className="relative flex flex-col w-full mx-auto gap-[50px] p-8 lg:py-[60px] lg:px-[117px] bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-end">
                <button
                  onClick={closeModalHandler}
                  className="text-black bg-transparent rounded-lg text-lg w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <IoClose size={53} />
                </button>
              </div>
              <div className="flex gap-3 md:gap-[34px] items-center">
                <div className="w-[70px] h-[70px] bg-[#D9D9D9] rounded-full"></div>
                <Typography
                  weight="medium"
                  variant="h6"
                  className="text-gray-900 dark:text-white max-md:text-[16px]"
                >
                  Lorem Ipsum
                </Typography>
              </div>
              <div>
                <Input
                  placeholder=""
                  inputClassName="border-none focus:outline-none placeholder-[#458FF6] text-3xl"
                  inputRef={inputRef}
                  autofocus
                  multiline
                />
              </div>
              <div className="border-b-2 border-[#9D9F9F]"></div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <IoCameraOutline size={50} className="max-md:w-[30px]" />
                  <BiImage size={50} className="max-md:w-[30px]" />
                  <MdOutlineEmojiEmotions
                    size={50}
                    className="max-md:w-[30px]"
                  />
                </div>
                <ButtonNoLink
                  size="large"
                  variant="primary"
                  className="font-semibold px-3 md:px-[32px] lg:px-[62px] flex items-center gap-2"
                  onClick={handleSubmit}
                >
                  Tombol
                </ButtonNoLink>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
