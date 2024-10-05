import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';

export const Footer = () => {
    return (
        <footer className="bg-[#0B2F9F] text-white">
            <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col mb-4 md:mb-0">
                    <h2 className="text-xl font-bold mb-2">Campus Chat</h2>
                    <p className="text-sm">AI Powered Tool for Students and Teachers</p>
                </div>
                <div className="flex gap-8 mb-4 md:mb-0">
                    <Link to="/about" className="hover:underline">About Us</Link>
                    <Link to="/services" className="hover:underline">Services</Link>
                    <Link to="/contact" className="hover:underline">Contact</Link>
                </div>
                <div className="flex gap-4">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <Facebook className="hover:text-gray-300" />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <Twitter className="hover:text-gray-300" />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <LinkedIn className="hover:text-gray-300" />
                    </a>
                </div>
            </div>
            <div className="bg-[#0A1E4B] text-center p-4">
                <p className="text-sm">© 2024 Campus Chat. All rights reserved.</p>
            </div>
        </footer>
    );
};
