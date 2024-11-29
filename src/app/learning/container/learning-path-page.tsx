"use client";

import React, { useState, useEffect } from "react";
import Typography from "@/components/Typography";
import Button from "@/components/button/button";
import NextImage from "@/components/NextImage";

import PathCard from "./path-card";
import VideoCard from "./video-card";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

interface LearningPathData {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

interface VideoData {
    id: number;
    title: string;
    imageSrc: string;
    link: string;
}

const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
        <button
            className="slick-next"
            onClick={onClick}
            aria-label="Next"
        >
            &gt;
        </button>
    );
};

const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
        <button
            className="slick-prev"
            onClick={onClick}
            aria-label="Previous"
        >
            &lt;
        </button>
    );
};

export default function LearningPath() {
    const [learningPaths, setLearningPaths] = useState<LearningPathData[]>([]);
    const [loading, setLoading] = useState(true);

    // Placeholder video data
    const videos: VideoData[] = [
        {
            id: 1,
            title: "Introduction to Mental Health",
            imageSrc: "/learning/video-1.jpg",
            link: "https://www.youtube.com/watch?v=video1",
        },
        {
            id: 2,
            title: "Overcoming Anxiety",
            imageSrc: "/learning/video-1.jpg",
            link: "https://www.youtube.com/watch?v=video2",
        },
        {
            id: 3,
            title: "Building Self-Confidence",
            imageSrc: "/learning/video-1.jpg",
            link: "https://www.youtube.com/watch?v=video3",
        },
    ];

    useEffect(() => {
        const fetchLearningPaths = async () => {
            try {
                const response = await fetch(`http://27.112.79.124:5001/learning-paths`, {
                    method: "GET",
                });
                const data = await response.json();
                if (!data.success) {
                    console.error("Failed to fetch learning paths", data);
                    return;
                }
                setLearningPaths(data.data.learningPaths);
            } catch (error) {
                console.error("Error fetching learning paths:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLearningPaths();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: true,
        swipe: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <section className="w-full h-full">
            <section className="w-full flex items-center justify-center gap-x-24 bg-light px-[100px] py-[48px]">
                <NextImage
                    src="/learning/path-img1.png"
                    alt="big shoes torso"
                    width={340}
                    height={340}
                    className=""
                />
                <div className="flex flex-col justify-center relative">
                    <Typography
                        variant="h4"
                        as="h4"
                        weight="bold"
                        className="text-left"
                    >
                        Pelajari Sesuatu yang Baru, 
                        <br /> Kapan Saja, di Mana Saja
                    </Typography>
                    <Typography
                        variant="t"
                        as="h6"
                        weight="light"
                        className="text-left text-gray-400 my-4"
                    >
                        Akses berbagai artikel dan sumber belajar yang disusun
                        <br /> dalam jalur pembelajaran terstruktur, untuk membantu
                        <br /> Anda berkembang secara bertahap sesuai kebutuhan.
                    </Typography>
                    <Button href="" size="medium" className="mt-4">
                        Belajar Sekarang
                    </Button>
                </div>
            </section>
            <section className="w-full h-full pt-[140px]">
                <section className="flex flex-col mx-[100px] gap-16">
                    <Typography variant="h4" as="h4" weight="medium" className="text-left">
                        Eksplor Learning Path <span className="text-normal">X</span>!
                    </Typography>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {learningPaths.map((path) => (
                            <PathCard
                                key={path.id}
                                title={path.title}
                                description={path.description}
                                imageSrc="/learning/paths.svg"
                                pathId={path.id.toString()}
                            />
                        ))}
                    </div>
                    <div className="w-full justify-center items-center flex flex-col gap-4">
                        <Button href="" size="medium" bgColor="bg-transparent outline outline-1 outline-normal transition-colors duration-300 hover:bg-button" textColor="text-black group-hover:text-white">
                            Temukan Learning Path Lainnya
                        </Button>
                        <Typography variant="bl" weight="semibold" className="text-normal">
                            {learningPaths.length} dari {learningPaths.length}
                        </Typography>
                    </div>
                </section>
            </section>
            <section className="w-full h-full py-[140px]">
                <section className="flex flex-col mx-[100px] gap-16">
                    <Typography variant="h4" as="h4" weight="medium" className="text-left">
                        Rekomendasi Video
                    </Typography>
                    <Slider {...sliderSettings}>
                        {videos.map((video) => (
                            <VideoCard
                                key={video.id}
                                title={video.title}
                                imageSrc={video.imageSrc}
                                link={video.link}
                            />
                        ))}
                    </Slider>
                </section>
            </section>
        </section>
    );
}