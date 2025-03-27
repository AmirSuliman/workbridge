'use client';

import { Menu, MoveUpRight, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, [pathname]);

  useEffect(() => {
    if (window.location.hash === '#faq') {
      const faqElement = document.getElementById('faq');
      if (faqElement) {
        faqElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname]);

  const handleToggle = () => setIsOpen(!isOpen);

  const isActive = (path: string) => currentPath === path;

  const handleFAQClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/#faq');
  };

  return (
    <nav className="w-full p-4 sm:px-8 md:px-8 gap-8 lg:px-16 top-0 sticky z-50 shadow-lg bg-white flex items-center justify-between">
      <div className="mx-auto max-w-[1750px] overflow-x-hidden flex items-center justify-between w-full">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={130}
            height={60}
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-12">
          <Link
            href="/"
            className={`text-[#0F172A] hover:text-black  ${
              isActive('/')
                ? 'font-bold text-black underline underline-offset-8'
                : ''
            }`}
          >
            Home
          </Link>
          <Link
            href="/Features"
            className={`text-[#0F172A] hover:text-black hover:text-black ${
              isActive('/Features')
                ? 'font-bold text-black underline underline-offset-8'
                : ''
            }`}
          >
            Features
          </Link>
          <Link
            href="/Get-started"
            className={`text-[#0F172A] hover:text-black hover:text-black ${
              isActive('/Get-started')
                ? 'font-bold text-black underline underline-offset-8'
                : ''
            }`}
          >
            Get started
          </Link>
          <Link
            href="/"
            className={`text-[#0F172A] hover:text-gray-600 ${
              isActive('/FAQ')
                ? 'font-bold text-black underline underline-offset-8'
                : ''
            }`}
            onClick={handleFAQClick}
          >
            FAQ
          </Link>

          <Link
            href="/Aboutus"
            className={`text-[#0F172A] hover:text-black hover:text-black  ${
              isActive('/Aboutus')
                ? 'font-bold text-black underline underline-offset-8'
                : ''
            }`}
          >
            About us
          </Link>
        </div>

        {/* Button for Demo */}
        <Link href="/Demo">
          <div className="hidden md:block">
            <button className="flex flex-row items-center gap-1 bg-[#0F172A] p-3 text-white rounded-lg text-[12px]">
              Try our<span className="font-bold">Demo</span>{' '}
              <MoveUpRight size={14} />
            </button>
          </div>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button className="md:hidden text-[#0F172A]" onClick={handleToggle}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-12 left-0 w-full bg-white shadow-lg flex flex-col items-center py-4 md:hidden">
            <Link
              href="/"
              className={`text-[#0F172A] py-2 hover:text-gray-600 ${
                isActive('/')
                  ? 'font-bold text-black underline underline-offset-8'
                  : ''
              }`}
              onClick={handleToggle}
            >
              Home
            </Link>
            <Link
              href="/Features"
              className={`text-[#0F172A] py-2 hover:text-gray-600 ${
                isActive('/Features')
                  ? 'font-bold text-black underline underline-offset-8'
                  : ''
              }`}
              onClick={handleToggle}
            >
              Features
            </Link>
            <Link
              href="/Get-started"
              className={`text-[#0F172A] py-2 hover:text-gray-600 ${
                isActive('/GetStarted')
                  ? 'font-bold text-black underline underline-offset-8'
                  : ''
              }`}
              onClick={handleToggle}
            >
              Get started
            </Link>
            <Link
              href="/"
              className={`text-[#0F172A] hover:text-gray-600 ${
                isActive('/FAQ')
                  ? 'font-bold text-black underline underline-offset-8'
                  : ''
              }`}
              onClick={handleFAQClick}
            >
              FAQ
            </Link>
            <Link
              href="/Contact"
              className={`text-[#0F172A] py-2 hover:text-gray-600 ${
                isActive('/Contact')
                  ? 'font-bold text-black underline underline-offset-8'
                  : ''
              }`}
              onClick={handleToggle}
            >
              Contact
            </Link>

            <button className="flex items-center gap-2 bg-[#0F172A] text-white p-3 rounded-lg mt-4 text-[12px]">
              Try our Demo <MoveUpRight size={14} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
