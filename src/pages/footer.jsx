import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export  function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-white font-bold text-xl mb-4">YourSiteName</h2>
          <p className="text-gray-400">
            YourSiteName is dedicated to providing the best learning experience.
            Explore our courses and start your journey today!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-white font-bold text-xl mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/courses" className="hover:text-white transition-colors">
                Courses
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-white transition-colors">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h2 className="text-white font-bold text-xl mb-4">Connect with us</h2>
          <div className="flex space-x-4 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook className="w-5 h-5 hover:text-white transition-colors" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="w-5 h-5 hover:text-white transition-colors" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram className="w-5 h-5 hover:text-white transition-colors" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin className="w-5 h-5 hover:text-white transition-colors" />
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            Email: anshuraj6357@gmail.com <br />
            Phone: +91 9693915693
          </p>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} YourSiteName. All rights reserved.
      </div>
    </footer>
  );
}
