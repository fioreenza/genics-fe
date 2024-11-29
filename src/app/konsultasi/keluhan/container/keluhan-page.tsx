import { IoCamera } from "react-icons/io5";
import { IoImageOutline } from "react-icons/io5";
import { FaRegFaceSmile } from "react-icons/fa6";

export default function Keluhan() {
    return (
        <section className="w-full h-full">
            <section className="w-full h-screen relative flex items-center justify-center bg-light px-[100px]">
                <div className="w-[306px] h-[324px] bg-[#458ff6] rounded-full mr-[-1200px] mt-[-100px] blur-[400px] absolute"></div>
                <div className="w-[306px] h-[324px] bg-[#458ff6] rounded-full ml-[-1200px] mt-[220px] blur-[400px]  absolute"></div>
                <div className="w-[1206px] h-[531px] px-[117px] py-[100px] bg-white rounded-[10px] border border-normal z-10 flex flex-col items-end justify-center">
                    <textarea 
                        className="w-full p-2 text-gray-600 outline-none resize-none"
                        placeholder="Jelaskan keluhan yang dialami dengan serinci mungkin..."
                        rows={5}
                    />
                    <div className="h-[0px] border border-[#9d9f9f]/30 w-full"></div>
                    <div className="flex justify-between items-center mt-4 w-full">
                        <div className="flex gap-4">
                            <button className="text-gray-500 hover:text-gray-700">
                            <IoCamera className="w-6 h-6" />
                            </button>
                            <button className="text-gray-500 hover:text-gray-700">
                            <IoImageOutline className="w-6 h-6" />
                            </button>
                            <button className="text-gray-500 hover:text-gray-700">
                            <FaRegFaceSmile className="w-6 h-6" />
                            </button>
                        </div>

                        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                            Simpan
                        </button>
                    </div>
                </div>
            </section>    
        </section>
    );
}