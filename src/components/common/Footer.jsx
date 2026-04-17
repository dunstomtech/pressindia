// E:\press-india\src\components\common\Footer.jsx
// ======================================================
// GLOBAL FOOTER COMPONENT
// Production Ready - Fixed Dynamic Legal Routes & Socials
// ======================================================

import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaShieldAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & Contact Section */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group w-max">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:shadow-indigo-500/30 transition-all">
                P
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Press<span className="text-indigo-400">India</span>
              </span>
            </Link>
            
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold mb-6 bg-emerald-400/10 w-max px-3 py-1.5 rounded-full border border-emerald-400/20">
              <FaShieldAlt />
              <span>Verified & Secure Platform</span>
            </div>

            <div className="text-gray-400 text-sm space-y-2 font-medium">
              <p>Email: <a href="mailto:support@pressindia.com" className="hover:text-indigo-400 transition-colors">support@pressindia.com</a></p>
              <p>Grievance: <a href="mailto:grievance@pressindia.com" className="hover:text-indigo-400 transition-colors">grievance@pressindia.com</a></p>
              <p>Response Time: 15 days</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5 tracking-wide">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/explore" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">News Feed</Link></li>
              <li><Link to="/articles/my" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">My Articles</Link></li>
              <li><Link to="/articles/new" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Write Article</Link></li>
              <li><Link to="/initiatives" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Verified Initiatives</Link></li>
              {/* ✅ FIXED: Routed through the dynamic /legal/:page structure */}
              <li><Link to="/legal/about" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">About Us</Link></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5 tracking-wide">Legal & Support</h3>
            <ul className="space-y-3">
              {/* ✅ FIXED: Routed through the dynamic /legal/:page structure */}
              <li><Link to="/legal/privacy" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Privacy Policy</Link></li>
              <li><Link to="/legal/terms" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Terms of Service</Link></li>
              <li><Link to="/legal/contact" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Contact Us</Link></li>
              
              <li>
                <Link to="/make-a-noise" className="text-rose-400 hover:text-rose-300 transition-colors text-sm font-bold flex items-center gap-2 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Report Issue
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect With Us (Social Media) */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5 tracking-wide">Connect With Us</h3>
            <p className="text-gray-400 text-sm mb-5 font-medium">
              Follow us on social media for real-time updates and top stories.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/pressindiaofficial?igsh=MTVndWt4ODk5OWpucw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:text-white hover:-translate-y-1 transition-all shadow-sm"
                aria-label="Instagram"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a 
                href="https://x.com/pressindia33863" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white hover:-translate-y-1 transition-all shadow-sm"
                aria-label="X (Twitter)"
              >
                <FaXTwitter className="text-lg" />
              </a>
              <a 
                href="https://www.linkedin.com/in/pressindiaofficial-ab7429403?utm_source=share_via&utm_content=profile&utm_medium=member_ios" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#0a66c2] hover:text-white hover:-translate-y-1 transition-all shadow-sm"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-lg" />
              </a>
              <a 
                href="https://www.facebook.com/61572158110657/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#1877f2] hover:text-white hover:-translate-y-1 transition-all shadow-sm"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright Section */}
        <div className="border-t border-gray-800 pt-8 pb-6">
          <div className="bg-gray-800/50 rounded-xl p-5 mb-6 border border-gray-700/50">
            <p className="text-xs text-gray-400 leading-relaxed font-medium">
              <strong className="text-white">Legal Disclaimer:</strong> Press India is an intermediary platform under Section 79 of the IT Act, 2000. 
              User-generated content does not represent the views of Press India. We are not responsible for the accuracy of user-submitted articles. 
              All content is subject to review and moderation. Press India takes down unlawful content expeditiously upon receiving actual knowledge.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500">
            <p>&copy; {currentYear} Press India. All rights reserved.</p>
            <div className="text-center md:text-right">
              <p>Compliant with IT Act 2000, IT Rules 2021, and Press Council Guidelines</p>
              <div className="flex items-center justify-center md:justify-end gap-1.5 mt-2">
                Designed for <span className="text-gray-300 font-bold px-1">India</span> 
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
