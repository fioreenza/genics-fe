'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast, {Toaster} from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

import Button from '@/components/button/button';
import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';
import { CgProfile } from "react-icons/cg";
import RouterLink from '@/links/RouterLink';

export default function Navbar({ className = "" }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
    const [, setRole] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState<string | null>(null); 
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUserName = localStorage.getItem("userName"); 
        const storedRole = localStorage.getItem("role");
        setIsLoggedIn(!!token);
        setUserName(storedUserName); 
        setRole(storedRole);
    }, []);

    const getClassName = (href: string) => {
        return pathname === href ? "text-[#7b7b7b]" : "text-black";
    };

    const links = [
        { href: "/", text: "Beranda" },
        { href: "/konsultasi", text: "Konsultasi" },
        { href: "/learningpath", text: "Learning Path" },
        { href: "/forum", text: "Forum" },
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
        setUserName(null);
        setRole(null);
        toast.success("You have been logged out successfully!");
    };

    return (
        <>
            <Toaster />
            <nav
                className={`flex items-center sticky top-0 left-0 w-full z-50 justify-between py-6 px-6 sm:px-20 bg-white ${className}`}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center scale-75 lg:scale-90">
                    <NextImage
                        src="/navbar/logo.png"
                        width={40}
                        height={40}
                        alt="ConsultITS"
                    />
                    <Typography as="h2" variant="h5" weight="bold" className="text-[#407BFF]">
                        ConsultITS
                    </Typography>
                </Link>

                <div className="hidden lg:flex flex-grow justify-center gap-x-12 text-xl font-bold text-white">
                    {links.map((link) => (
                        <RouterLink
                            key={link.href}
                            href={link.href}
                            className={getClassName(link.href)}
                        >
                            <Typography 
                                className="py-3 duration-300 hover:-translate-y-0.5 transition-all hover:font-bold hover:underline hover:decoration-[#407BFF]" 
                                variant="t" 
                                weight="light"
                            >
                                {link.text}
                            </Typography>
                        </RouterLink>
                    ))}
                </div>

                <div className="hidden lg:flex items-center">
                    {isLoggedIn ? (
                        <div className="relative">
                            <div
                                className="flex items-center space-x-4 cursor-pointer"
                                onClick={toggleDropdown}
                            >
                                <Typography variant="t" weight="medium" className="text-[#1678F2]">
                                    Hi, {userName}!
                                </Typography>
                                <CgProfile size={24} className='text-[#1678F2]'/>
                            </div>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                                    <Link href='/orders'>
                                    <div className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                                        Orders
                                    </div>
                                    </Link>
                                    <button
                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Button size="large" href="/login">
                            Masuk
                        </Button>
                    )}
                </div>

                {/* Burger menu for small viewport */}
                <div className="flex lg:hidden">
                    <button onClick={toggleMenu}>
                        <NextImage
                            src="/navbar/burger.svg"
                            width={24}
                            height={24}
                            alt="burger menu"
                        />
                    </button>
                </div>
            </nav>

            {/* Sidebar menu */}
            <div
                className={`fixed inset-0 z-50 flex flex-col items-center justify-evenly bg-black pb-[382px] pt-36 text-2xl font-bold text-white transition-transform duration-500 ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <button
                    type="button"
                    className="absolute right-12 top-12 text-3xl sm:right-[97px] md:right-[84px]"
                    onClick={toggleMenu}
                >
                    <NextImage
                        src="/navbar/burger-close.svg"
                        width={40}
                        height={40}
                        alt="burger close"
                    />
                </button>
                {links.map((link) => (
                    <RouterLink
                        key={link.href}
                        href={link.href}
                        className={`my-4 ${getClassName(link.href)}`}
                        onClick={toggleMenu}
                    >
                        <Typography 
                            variant="t" 
                            weight="bold" 
                            className="text-white transition-all duration-300 hover:-translate-y-0.5 hover:font-bold hover:underline hover:decoration-[#407BFF]"
                        >
                            {link.text}
                        </Typography>
                    </RouterLink>
                ))}
                {isLoggedIn ? (
                    <button
                        className="text-white transition-all duration-300 hover:-translate-y-0.5 hover:font-bold hover:underline hover:decoration-[#407BFF]"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                ) : (
                    <RouterLink href="/login" className="text-white">
                        Masuk
                    </RouterLink>
                )}
            </div>
        </>
    );
}
