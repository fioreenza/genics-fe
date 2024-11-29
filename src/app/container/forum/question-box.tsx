import clsxm from '@/lib/clsxm';
import React from 'react';
import Typography from '@/components/Typography';
import Link from 'next/link';

 interface QuestionBoxProps {
    children: string; 
    category: string; 
    href: string;
}

export default function QuestionBox({ children, category, href }: QuestionBoxProps) {
    return (
        <Link href={href} className={clsxm("rounded-[10px] border-[1px] border-[#407BFF]",
            "py-[20px] px-[30px] md:py-[38px] md:px-[50px] w-full m-auto max-w-[590px] h-auto lg:min-h-[278px]"
        )}>
            <div className='flex flex-col gap-4 lg:gap-[30px]'>
                <div className='text-center border-[1px] bg-[#EFF4FF] text-[#458FF6] border-[#458FF6] rounded-[10px] max-w-[136px] text-[11px] px-2 py-2'>{category}</div>
                <Typography className='text-[36px]'>{children}</Typography>
            </div>
        </Link>
    )
}