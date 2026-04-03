import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Terminal } from 'lucide-react';
import { ContactForm } from '@modules/contact/components/ContactForm';
import contactData from '@/content/contact.json';
import profilePic from '@modules/hero/assets/Mohit.jpeg';

export const FloatingContactIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { metadata } = contactData as {
    metadata: { form_submit: string; form_id: string; title: string };
  };

  // If we are on the contact page, we don't necessarily need the floating chatbot as prominently,
  // but the user wants it to be the primary way to access the form.
  // I'll keep it available everywhere for a consistent "AI Assistant" feel.

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-s-120 md:bottom-s-40 right-s-20 md:right-s-40 z-[100]">

      {/* ── Chatbot Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            className="absolute bottom-s-80 right-0 w-s-340 md:w-s-440 max-h-[80vh] flex flex-col pointer-events-auto"
          >
            {/* Terminal Header */}
            <div className="bg-brand-primary text-black px-s-16 py-s-10 rounded-t-s-16 flex items-center justify-between font-black font-mono text-s-12 tracking-widest shadow-[0_0_20px_var(--brand-primary-40)]">
              <div className="flex items-center gap-s-12">
                <div className="w-s-32 h-s-32 rounded-full border-s-2 border-black overflow-hidden bg-bg-inverse shadow-s-sm">
                  <img 
                    src={profilePic} 
                    alt="Mohit Thakur" 
                    className="w-full h-full object-cover filter grayscale contrast-125"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Mohit+Thakur&background=00ff41&color=000&size=128';
                    }}
                  />
                </div>
                <div className="flex items-center gap-s-8">
                  <Terminal size={14} />
                  <span>UPLINK_v4.0</span>
                </div>
              </div>
              <div className="flex items-center gap-s-8">
                <span className="animate-pulse">ONLINE</span>
                <div className="w-s-8 h-s-8 bg-black rounded-full" />
              </div>
            </div>

            {/* Form Body */}
            <div className="bg-bg-page backdrop-blur-2xl border-x border-b border-brand-primary-30 rounded-b-s-16 shadow-2xl relative overflow-hidden">
              {/* Background Scanline Decoration */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, var(--brand-primary) 2px, var(--brand-primary) 4px)' }} />

              <div className="p-s-16">
                <div className="mb-s-24 p-s-12 bg-brand-primary-5 border-l-s-2 border-brand-primary-40">
                  <p className="text-s-11 font-mono font-bold text-brand-primary-60 leading-relaxed">
                    {">"} Initialize secure transmission to **Mohit_Thakur**...
                    <br />
                    {">"} Purpose: Project_Inquiry // Collaboration
                  </p>
                </div>
                <ContactForm
                  formId={metadata.form_id}
                  formSubmitLabel={metadata.form_submit}
                  className="border-none p-0 bg-transparent backdrop-blur-none"
                  onSuccess={() => setIsOpen(false)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Pulse Button ── */}
      <motion.button
        onClick={toggleOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group pointer-events-auto"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: -12, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              className="absolute right-full mr-s-12 bg-bg-surface backdrop-blur-md border border-brand-primary-50 text-brand-primary px-s-16 py-s-8 rounded-s-8 font-mono text-s-14 font-bold tracking-widest shadow-[0_0_15px_rgba(0,255,65,0.2)]"
            >
              <div className="flex items-center gap-s-8">
                <span className="w-s-8 h-s-8 bg-brand-primary animate-pulse rounded-full" />
                {isOpen ? 'CLOSE_UPLINK' : 'SYSTEM_UPLINK'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{
            boxShadow: isOpen || isHovered
              ? "0 0 40px var(--brand-primary-30)"
              : "0 0 12px var(--brand-primary-15)",
            borderWidth: isOpen ? '4px' : '2px',
            borderColor: isOpen ? 'var(--brand-primary)' : 'var(--brand-primary-50)'
          }}
          className="w-s-64 h-s-64 bg-bg-surface rounded-full flex items-center justify-center text-brand-primary backdrop-blur-md group overflow-hidden relative"
        >
          {/* Scanline Effect */}
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-full h-s-2 bg-brand-primary-20"
          />

          <div className="relative z-10 transition-transform duration-300">
            {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
          </div>

          {/* Active indicator ring */}
          {isOpen && (
            <div className="absolute inset-0 border-[2px] border-brand-primary rounded-full animate-ping opacity-20" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};
