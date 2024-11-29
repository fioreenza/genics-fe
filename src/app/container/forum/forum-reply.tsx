import Typography from '@/components/Typography';
import { IoShareSocialSharp } from "react-icons/io5";
import { BiCommentDetail } from "react-icons/bi";
import { IoMdHeartEmpty } from "react-icons/io";




interface ReplyProps {
    user: string;
    createdAt: string;
    children: string;
}

export default function ForumReply({user, createdAt, children}: ReplyProps){
    return(
        <div className="px-8 py-10 lg:px-[117px] lg:py-[100px] border-[1px] border-[#458FF6] rounded-[10px] flex flex-col gap-[50px]">
            <div className="w-full flex flex-col max-md:gap-[20px] md:flex-row justify-between items-center">
                <div className='w-full flex gap-[34px] items-center'>
                    <div className="w-[70px] h-[70px] bg-[#D9D9D9] rounded-full"></div>
                    <Typography variant='h5' weight='semibold'>{user}</Typography>
                </div>
                <Typography variant='t' weight='regular' className='text-[#9D9F9F] text-sm lg:text-lg '>{createdAt}</Typography>
            </div>
            <Typography variant='t' weight='light' className='text-[30px]'>{children}</Typography>
            <div className='flex justify-start gap-4'>
                <IoMdHeartEmpty size={50} color='gray'/>
                <BiCommentDetail size={50} color='gray'/>
                <IoShareSocialSharp size={50} color='gray'/>
            </div>
        </div>
    )
}