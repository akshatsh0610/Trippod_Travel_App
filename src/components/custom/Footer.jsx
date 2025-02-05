import React from "react";
import { FaFacebook, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";

function Footor() {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About the Project</h3>
            <p className="text-sm leading-relaxed">
              Explore curated travel itineraries, discover breathtaking
              destinations, and create unforgettable memories with our travel
              guides.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm space-y-3">
              <li>
                <a
                  href="#"
                  className="hover:scale-110 transition transform text-white"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:scale-110 transition transform text-white"
                >
                  Account
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:scale-110 transition transform text-white"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:scale-110 transition transform text-white"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition transform text-white"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition transform text-white"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition transform text-white"
              >
                <BsInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition transform text-white"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition transform text-white"
              >
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/50 my-6"></div>

        {/* Bottom Section */}
        <div className="text-center text-sm space-y-2">
          <div>
            © {new Date().getFullYear()} Atobtech Solutions. All rights
            reserved.
          </div>
          <div>Designed and Developed by Akshay Kumar Hiran & Team</div>
        </div>
      </div>
    </footer>
  );
}

export default Footor;
