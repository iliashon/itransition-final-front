import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="w-full px-4 flex gap-5 items-center justify-between mt-5 border-t dark:border-t-white/30 border-t-black/30 py-4">
            <p className="font-normal">&copy; 2024 Tupalski Ilya</p>
            <div className="flex gap-5">
                <Link
                    href="https://github.com/iliashon"
                    className="hover:scale-110 duration-300"
                    target="_blank"
                >
                    <FaGithub className="h-6 w-6" />
                </Link>
                <Link
                    href="https://www.linkedin.com/in/ilya-tupalski/"
                    className="hover:scale-110 duration-300"
                    target="_blank"
                >
                    <FaLinkedin className="h-6 w-6" />
                </Link>
                <Link
                    href="https://www.instagram.com/ilia_shon/"
                    className="hover:scale-110 duration-300"
                    target="_blank"
                >
                    <FaInstagram className="h-6 w-6" />
                </Link>
            </div>
        </footer>
    );
}
