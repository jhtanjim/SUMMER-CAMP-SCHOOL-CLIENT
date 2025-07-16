"use client";
import { LogOut, Menu, ShoppingCart, User, X } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useCarts from "../../../Hooks/useCarts/useCarts";
import { AuthContext } from "../../../Providers/AuthProvider";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [cart] = useCarts();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = () => {
    logout()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 backdrop-blur-sm bg-opacity-90 shadow-xl">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              className="h-28 w-auto transition-transform duration-300 hover:scale-105"
              src="https://i.ibb.co/mchsX1f/Bajao-removebg-preview.png"
              alt="Bajao Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
            <Link
              to="/"
              className="text-white text-lg font-medium hover:text-purple-300 transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              to="/instuctors"
              className="text-white text-lg font-medium hover:text-purple-300 transition-colors duration-200 relative group"
            >
              Instructors
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              to="/classes"
              className="text-white text-lg font-medium hover:text-purple-300 transition-colors duration-200 relative group"
            >
              Classes
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>

            {/* Cart */}
            <Link to="/dashboard/MySelectedClass" className="relative">
              <div className="flex items-center space-x-2 bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-full transition-all duration-200 shadow-md">
                <ShoppingCart className="h-5 w-5 text-white" />
                <span className="text-white text-base font-semibold">
                  {cart?.length || 0}
                </span>
              </div>
            </Link>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <img
                    className="h-10 w-10 rounded-full border-2 border-purple-400 object-cover shadow-md"
                    src={
                      user?.photoURL || "/placeholder.svg?height=40&width=40"
                    }
                    alt="Profile"
                  />
                  <button
                    onClick={handleLogOut}
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors duration-200 text-white text-base font-medium shadow-md"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 bg-purple-700 hover:bg-purple-800 px-5 py-2 rounded-lg transition-colors duration-200 text-white font-medium shadow-md"
                >
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-white hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900 bg-opacity-95 backdrop-blur-md border-t border-purple-500/20 shadow-lg animate-slide-down">
            <div className="px-4 py-6 space-y-4">
              <Link
                to="/"
                className="block text-white text-lg hover:text-purple-300 transition-colors duration-200 font-medium py-2 border-b border-purple-500/10 last:border-b-0"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/instuctors"
                className="block text-white text-lg hover:text-purple-300 transition-colors duration-200 font-medium py-2 border-b border-purple-500/10 last:border-b-0"
                onClick={() => setIsMenuOpen(false)}
              >
                Instructors
              </Link>
              <Link
                to="/classes"
                className="block text-white text-lg hover:text-purple-300 transition-colors duration-200 font-medium py-2 border-b border-purple-500/10 last:border-b-0"
                onClick={() => setIsMenuOpen(false)}
              >
                Classes
              </Link>
              <Link
                to="/dashboard/MySelectedClass"
                className="flex items-center space-x-2 text-white text-lg hover:text-purple-300 transition-colors duration-200 font-medium py-2 border-b border-purple-500/10 last:border-b-0"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart ({cart?.length || 0})</span>
              </Link>
              {user ? (
                <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
                  <div className="flex items-center space-x-3">
                    <img
                      className="h-10 w-10 rounded-full border-2 border-purple-400 object-cover"
                      src={
                        user?.photoURL || "/placeholder.svg?height=40&width=40"
                      }
                      alt="Profile"
                    />
                    <span className="text-white text-base font-medium">
                      {user?.displayName}
                    </span>
                  </div>
                  <button
                    onClick={handleLogOut}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors duration-200 text-white text-base font-medium shadow-md"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-lg transition-colors duration-200 text-white font-medium text-center mt-4 shadow-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
