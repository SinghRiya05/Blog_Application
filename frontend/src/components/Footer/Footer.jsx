import React from 'react';
import logo from '../../assets/blog-logo.svg';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="bg-slate-50 px-6 md:px-16 lg:px-24 xl:px-32">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-10 py-10 border-b border-gray-300 text-gray-600">
        
        {/* Logo + About */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Logo" width={40} />
            <h2 className="text-xl font-semibold text-gray-800">MyBlogSpace</h2>
          </div>
          <p className="max-w-md text-sm md:text-base opacity-80 leading-relaxed">
            Discover inspiring stories, tech tips, and personal journeys. Share your voice with the world. Connect, learn, and grow through blogs. Powered by passion, written by you.
          </p>
        </div>

        {/* Quick Links + Support (Now Responsive) */}
        <div className="flex flex-col sm:flex-row flex-1 justify-between gap-10">
          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
              <li><Link to="/" className="hover:text-blue-500">All Blogs</Link></li>
              <li><Link to="/" className="hover:text-blue-500">Write Blog</Link></li>
              <li><Link to="/" className="hover:text-blue-500">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-500">About</Link></li>
              <li><Link to="/" className="hover:text-blue-500">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-blue-500">Terms & Conditions</Link></li>
              <li><Link to="/" className="hover:text-blue-500">Help Center</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="py-4 text-center text-xs md:text-sm text-gray-500">
        © 2025 MyBlogSpace — All Rights Reserved
      </div>
    </div>
  );
}
