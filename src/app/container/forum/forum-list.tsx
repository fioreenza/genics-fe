"use client"

import ForumSearch from "./forum-search"
import ForumChoice from "./forum-choice"
import QuestionBox from "./question-box"
import { useEffect, useState } from "react"
import ButtonNoLink from "@/components/button/buttonnolink"
import Typography from "@/components/Typography"
import { parse } from "path"

interface QuestionBoxProps {
    id: number;
    title: string;
    reply: string[];
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
        reply: [],
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
    }
]


export default function ForumList() {
    const [list, setList] = useState<QuestionBoxProps[]>([]);
    const [filteredList, setFilteredList] = useState<QuestionBoxProps[]>([]);
    const [enableMore, setEnableMore] = useState(true);
    const [minItem, setMinItem] = useState(8);
    const [countItem, setCountItem] = useState(0);
    

    useEffect(() => {
        if(questionList.length < minItem){
            setList(questionList);
            setCountItem(list.length);
            setEnableMore(false);
        }else{
            setList(questionList.slice(0,minItem));
            setCountItem(minItem);
        }
    }, [minItem])

    useEffect(() => {
        setFilteredList(list);
    }, [list]);

    useEffect(() => {
        setCountItem(filteredList.length);
    }, [filteredList])

    const handleClickMore = () => {
        setMinItem(minItem + 8);
    }

    const handleFilter = (filter: string) => {
        if(filter === "Semua"){
            setFilteredList(questionList);
        }else{
            setFilteredList(questionList.filter((question) => question.category === filter));
        }
    }

    const handleSearch = (search: string) => {
        if(search === ""){
            setFilteredList(questionList);
        }else{
            setFilteredList(questionList.filter((question) => question.title.toLowerCase().includes(search.toLowerCase()) || question.category.toLowerCase().includes(search.toLowerCase())));
        }
    }


    return (
        <div id="detail-information" className="flex flex-col gap-[100px] max-w-[1206px] mx-10 lg:mx-[80px] xl:m-auto pt-32">
            <ForumSearch  onClick={handleSearch}/>
            <ForumChoice title="Kategori" choices={["Semua", "Kesehatan Fisik", "Kesehatan Mental", "Penyakit & Pengobatan", "Gaya Hidup Sehat", "Olahraga & Kebugaran", "Nutrisi & Diet"]} defaultChoice="Semua" handleFilter={handleFilter}/>
            <ForumChoice title="Topik Terknini" choices={["Kesehatan Jantung", "Kesehatan Mental", "Depresi & Anxienty", "Gangguan Jiwa", "Coronavirus", "Obat Diabetes", "Olahraga Yoga"]} defaultChoice="" handleFilter={handleFilter}/>
            <div className="flex flex-col gap-y-[50px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[26px]">{filteredList.map((question) => (
                    <QuestionBox key={question.id} href={`/forum/${question.id}`} category={question.category}>{question.title}</QuestionBox>
                ))}</div>
                <div className="flex flex-col items-center gap-2.5 mb-32">
                    {enableMore && <ButtonNoLink onClick={handleClickMore} size="large" variant="outline" className="text-[#000]">Temukan Diskusi Lainnya</ButtonNoLink>}
                    <Typography variant="t" weight="semibold" className="text-[#1678F2]">{countItem} dari {questionList.length}</Typography>
                </div>
            </div>
        </div>
    )
}