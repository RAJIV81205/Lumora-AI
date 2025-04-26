import React, { useState } from 'react';
import { FaWhatsapp , FaFacebook , FaLinkedin   } from "react-icons/fa";
import { FaXTwitter , FaXmark } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import {Copy} from "lucide-react"

const SharePopup = ({ isOpen, onClose, shareUrl }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const shareViaWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareViaTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareViaFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareViaLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareViaEmail = () => {
    window.location.href = `mailto:?body=${encodeURIComponent(shareUrl)}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 font-open-sans">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Share this link</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaXmark  size={24} />
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <input
            value={shareUrl}
            readOnly
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-800 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Copy size={20} />
            {copySuccess ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">Or share via</p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          <button
            onClick={shareViaWhatsApp}
            className="flex flex-col items-center gap-1 p-3 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
          >
            <FaWhatsapp size={24} />
            <span className="text-xs font-medium">WhatsApp</span>
          </button>
          
          <button
            onClick={shareViaTwitter}
            className="flex flex-col items-center gap-1 p-3 rounded-lg bg-[#4c4d4d]/10 text-[#292a2b] hover:bg-[#4c4d4d]/20 transition-colors"
          >
            <FaXTwitter size={24} />
            <span className="text-xs font-medium">Twitter</span>
          </button>
          
          <button
            onClick={shareViaFacebook}
            className="flex flex-col items-center gap-1 p-3 rounded-lg bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 transition-colors"
          >
            <FaFacebook size={24} />
            <span className="text-xs font-medium">Facebook</span>
          </button>
          
          <button
            onClick={shareViaLinkedIn}
            className="flex flex-col items-center gap-1 p-3 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 transition-colors"
          >
            <FaLinkedin  size={24} />
            <span className="text-xs font-medium">LinkedIn</span>
          </button>
          
          <button
            onClick={shareViaEmail}
            className="flex flex-col items-center gap-1 p-3 rounded-lg bg-[#EA4335]/10 text-[#EA4335] hover:bg-[#EA4335]/20 transition-colors"
          >
            <MdOutlineAlternateEmail size={24} />
            <span className="text-xs font-medium">Email</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SharePopup;
