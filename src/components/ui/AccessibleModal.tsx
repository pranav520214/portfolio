"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function AccessibleModal({ isOpen, onClose, children, title, className = "" }: AccessibleModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#07080A]/90 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            className={`relative w-full max-w-4xl bg-[#121620] border border-[rgba(255,255,255,0.08)] shadow-2xl rounded-xl overflow-hidden flex flex-col max-h-[90vh] ${className}`}
          >
            {(title) && (
              <div className="flex-none p-4 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
                <div id="modal-title" className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
                  {title}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1C212B] rounded transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
            {!title && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-[#07080A]/50 text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1C212B] rounded-full transition-colors backdrop-blur-md"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
