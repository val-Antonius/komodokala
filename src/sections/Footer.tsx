"use client";

import { motion } from 'framer-motion';
import { Ship, Instagram, Facebook, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react';

const quickLinks = [
  { name: 'About Us', href: '#about' },
  { name: 'How It Works', href: '#process' },
  { name: 'Destinations', href: '#destinations' },
  { name: 'Blog', href: '#' },
  { name: 'FAQs', href: '#faq' },
  { name: 'Contact Us', href: '#contact' },
];

const tourPackages = [
  { name: '1 Day Tours', href: '#packages' },
  { name: '2D1N Packages', href: '#packages' },
  { name: '3D2N Packages', href: '#packages' },
  { name: '4D3N Packages', href: '#packages' },
  { name: 'Private Charters', href: '#packages' },
  { name: 'Group Bookings', href: '#packages' },
];

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6">
              <Ship className="w-8 h-8 text-coral" />
              <span className="font-bold text-xl">KOMODO ADVENTURES</span>
            </a>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted partner for unforgettable adventures in Komodo National Park. Local expertise, international standards.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-coral transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tour Packages */}
          <div>
            <h3 className="font-bold text-lg mb-6">Tour Packages</h3>
            <ul className="space-y-3">
              {tourPackages.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Jalan Soekarno Hatta, Labuan Bajo, East Nusa Tenggara, Indonesia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-coral flex-shrink-0" />
                <a href="https://wa.me/6281234567890" className="text-gray-400 hover:text-white transition-colors">
                  +62 812 3456 7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-coral flex-shrink-0" />
                <a href="mailto:hello@komodoadventures.com" className="text-gray-400 hover:text-white transition-colors">
                  hello@komodoadventures.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-coral flex-shrink-0" />
                <span className="text-gray-400">
                  Mon-Sat, 8AM - 8PM WIB
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 Komodo Adventures. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button className="text-gray-500 hover:text-white text-sm transition-colors">
                Privacy Policy
              </button>
              <button className="text-gray-500 hover:text-white text-sm transition-colors">
                Terms & Conditions
              </button>
              <button className="text-gray-500 hover:text-white text-sm transition-colors">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
