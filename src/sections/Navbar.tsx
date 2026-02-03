"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Ship, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { name: 'Destinations', href: '#destinations' },
  { name: 'Tour Packages', href: '#packages' },
  { name: 'How It Works', href: '#process' },
  { name: 'About Us', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'ID'>('EN');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center gap-2 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <Ship className={`w-7 h-7 transition-colors ${isScrolled ? 'text-ocean' : 'text-white'}`} />
            <span className={`font-bold text-lg md:text-xl transition-colors ${isScrolled ? 'text-ocean-dark' : 'text-white'}`}>
              KOMODO ADVENTURES
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`text-sm font-medium transition-colors hover:text-coral ${
                  isScrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Language Toggle - Desktop */}
            <button
              onClick={() => setLanguage(language === 'EN' ? 'ID' : 'EN')}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isScrolled
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <Globe className="w-4 h-4" />
              {language}
            </button>

            {/* CTA Button - Desktop */}
            <Button
              onClick={() => scrollToSection('#packages')}
              className="hidden md:flex bg-coral hover:bg-coral-hover text-white font-semibold px-6"
            >
              Book Now
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <button
                  className={`p-2 rounded-lg transition-colors ${
                    isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-bold text-xl text-ocean-dark">Menu</span>
                  </div>
                  
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <button
                        key={link.name}
                        onClick={() => scrollToSection(link.href)}
                        className="text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors"
                      >
                        {link.name}
                      </button>
                    ))}
                  </nav>

                  <div className="mt-auto pt-8">
                    <Button
                      onClick={() => scrollToSection('#packages')}
                      className="w-full bg-coral hover:bg-coral-hover text-white font-semibold"
                    >
                      Book Now
                    </Button>
                    
                    <button
                      onClick={() => setLanguage(language === 'EN' ? 'ID' : 'EN')}
                      className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-2 text-gray-600 hover:text-ocean transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      Switch to {language === 'EN' ? 'Bahasa Indonesia' : 'English'}
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
