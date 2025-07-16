"use client";
import { Home, Mail, MapPin, Phone, School, User } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img
                className="h-16 w-auto"
                src="https://i.ibb.co/mchsX1f/Bajao-removebg-preview.png"
                alt="Bajao Logo"
              />
            </div>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Bajao Instrument - Your premier destination for music education.
              We've been nurturing musical talents and providing quality music
              education since 1992.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/"
                className="bg-purple-600 hover:bg-purple-700 p-3 rounded-full transition-colors duration-200 transform hover:scale-110"
              >
                <Home className="h-5 w-5" />
              </Link>
              <Link
                to="/instuctors"
                className="bg-purple-600 hover:bg-purple-700 p-3 rounded-full transition-colors duration-200 transform hover:scale-110"
              >
                <User className="h-5 w-5" />
              </Link>
              <Link
                to="/classes"
                className="bg-purple-600 hover:bg-purple-700 p-3 rounded-full transition-colors duration-200 transform hover:scale-110"
              >
                <School className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-purple-300">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/classes"
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                >
                  <School className="h-4 w-4 mr-2" />
                  Classes
                </Link>
              </li>
              <li>
                <Link
                  to="/instuctors"
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                >
                  <User className="h-4 w-4 mr-2" />
                  Instructors
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-purple-300">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-3 text-purple-400" />
                info@bajao.com
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-3 text-purple-400" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start text-gray-300">
                <MapPin className="h-4 w-4 mr-3 mt-1 text-purple-400 flex-shrink-0" />
                123 Music Street, Harmony City, HC 12345
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-800/30 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Bajao Instrument. All rights
              reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                to="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
