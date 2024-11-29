import Link from 'next/link';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import Typography from '@/components/Typography';

export default function Footer() {
    return (
        <footer className="bg-[#EDF2FF] px-6 py-12 sm:px-20 lg:px-24">
            <div className="mx-auto flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-12 lg:space-x-24">
                <div className="w-96">
                    <Typography as="h3" variant="h6" className="text-black">
                        ConsultITS
                    </Typography>
                    <Typography className="mt-4 text-gray-600">
                        ConsultITS adalah platform konsultasi kesahatan yang membantu Anda untuk berkonsultasi dengan dokter secara online.
                    </Typography>
                </div>

                <div>
                    <Typography as="h3" variant="h6" className="text-black">
                        Quick Links
                    </Typography>
                    <ul className="mt-4 space-y-2">
                        {["Beranda", "Konsultasi", "Learning", "Forum"].map((text, index) => (
                            <li key={index}>
                                <Link href={`/${text.toLowerCase().replace(' ', '')}`} passHref>
                                    <Typography className="text-gray-600 hover:text-blue-500 transition">
                                        {text}
                                    </Typography>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <Typography as="h3" variant="h6" className="text-black">
                        Contact
                    </Typography>
                    <div className="mt-4 flex space-x-4 text-gray-600">
                        <Link href="https://instagram.com" aria-label="Instagram" passHref>
                            <FaInstagram className="h-6 w-6 hover:text-blue-500 transition" />
                        </Link>
                        <Link href="https://facebook.com" aria-label="Facebook" passHref>
                            <FaFacebook className="h-6 w-6 hover:text-blue-500 transition" />
                        </Link>
                        <Link href="https://twitter.com" aria-label="Twitter" passHref>
                            <FaTwitter className="h-6 w-6 hover:text-blue-500 transition" />
                        </Link>
                    </div>
                </div>

                <div>
                    <Typography as="h3" variant="h6" className="text-black">
                        Help & Support
                    </Typography>
                    <ul className="mt-4 space-y-2">
                        {["Support Center", "FAQ", "Terms & Condition"].map((text, index) => (
                            <li key={index}>
                                <Link href={`/${text.toLowerCase().replace(/ /g, '')}`} passHref>
                                    <Typography className="text-gray-600 hover:text-blue-500 transition">
                                        {text}
                                    </Typography>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* divider */}
            <hr className="my-8 border-t-2 border-gray-300" />

            {/* bottom part */}
            <div className="flex flex-col items-center justify-between text-gray-600 space-y-2 sm:flex-row">
                <Typography className="text-sm">&copy; Copyright 2024</Typography>
                <div className="flex gap-x-2 text-center">
                    <Typography className="text-sm">
                        All rights reserved
                    </Typography>
                    <Typography className="text-sm">
                        |
                    </Typography>
                    <Link href="/terms" passHref>
                        <Typography className="text-sm hover:text-blue-500 transition">
                            Terms and Conditions
                        </Typography>
                    </Link>
                    <Typography className="text-sm">
                        |
                    </Typography>
                    <Link href="/privacy" passHref>
                        <Typography className="text-sm hover:text-blue-500 transition">
                            Privacy Policy
                        </Typography>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
