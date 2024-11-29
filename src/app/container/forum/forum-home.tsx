'use client'
import Button from "@/components/button/button"
import NextImage from "@/components/NextImage"
import Typography from "@/components/Typography"
export default function ForumHome(){
    return (
        <section className="min-h-screen w-full bg-[##F0F4FF] py-10 px-10 md:py-20 md:px-10 lg:py-36 lg:px-28 flex items-center">
            <div className="w-[293px] h-[295px] rounded-full bg-[#458FF6] blur-[200px] absolute top-[25vh] left-[10vw]"></div>
            <div className="flex flex-col-reverse lg:flex-row gap-[20px] lg:gap-[70px] items-center justify-between w-full">
                <div className="flex flex-col justify-center gap-6 lg:gap-[50px] ">
                    <div className="flex flex-col gap-5">
                        <Typography variant="h4" weight="semibold">Berbagi Pengalaman melalui Forum X</Typography>
                        <Typography variant="bl" className="text-[#7D7987] text-[24px]">Akses layanan konsultasi kesehatan dengan dokter profesional secara online 24/7.</Typography>
                    </div>
                    <Button size="large" href="#detail-information" className="justify-center py-4 px-[62px] bg-gradient-to-r from-[#407BFF] via-[#1678F2] to-[#E3EBFF]">Diskusi Sekarang</Button>
                </div>
                <NextImage src="/forum/mental-health-problem.png" width={509} height={463} alt="mental-health-problem" layout='responsive' className="w-full h-auto max-w-[509px] max-h-[463px]" />
            </div>
        </section>
    )
}