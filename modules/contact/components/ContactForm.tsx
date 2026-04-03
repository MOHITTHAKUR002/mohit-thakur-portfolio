import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@shared/ui/Button/Button';

interface ContactFormProps {
  formId: string;
  formSubmitLabel: string;
  className?: string;
  onSuccess?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ formId, formSubmitLabel, className, onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (formData.name.trim().length < 2) newErrors.name = 'ERR_NAME_SHORT';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = 'ERR_INVALID_PATH';
    if (formData.message.trim().length < 10) newErrors.message = 'ERR_BUFFER_UNDERFLOW';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ...formData, _subject: `SYS-MSG: ${formData.name}` }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        if (onSuccess) {
          setTimeout(onSuccess, 3000); // Close or notify after 3s
        }
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className={`relative bg-bg-surface backdrop-blur-xl p-s-24 md:p-s-40 rounded-s-24 overflow-hidden border-s-1 border-brand-primary-10 group-hover:border-brand-primary-30 transition-colors ${className}`}>
      {/* Terminal Header Decoration */}
      <div className="absolute top-0 left-0 w-full h-s-4 bg-brand-primary-20" />
      <div className="flex items-center justify-between mb-s-32">
        <div className="flex gap-s-6">
          <div className="w-s-8 h-s-8 rounded-full bg-status-danger" />
          <div className="w-s-8 h-s-8 rounded-full bg-brand-primary-50" />
          <div className="w-s-8 h-s-8 rounded-full bg-brand-primary-30" />
        </div>
        <span className="text-s-10 font-bold text-brand-primary-40 tracking-widest font-mono">CON_TERM_V3</span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-s-24">
        {[
          { name: "name", label: "USER_ID", type: "text", placeholder: "LOG_NAME..." },
          { name: "email", label: "COMM_CHANNEL", type: "email", placeholder: "ENDPOINT..." },
        ].map((field) => (
          <div key={field.name} className="flex flex-col gap-s-8 group/field">
            <label className="text-s-10 font-bold text-brand-primary-60 tracking-widest flex items-center gap-s-6 font-mono">
              <span className="w-s-3 h-s-3 bg-brand-primary rounded-full group-focus-within/field:animate-ping" />
              {field.label}
            </label>
            <div className="relative">
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full bg-transparent text-brand-primary px-0 py-s-8 text-s-16 font-mono outline-none border-b-s-1 border-brand-primary-10 focus:border-brand-primary transition-all placeholder:text-brand-primary-20"
              />
              {errors[field.name] && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-status-danger text-s-10 mt-s-2 flex items-center gap-s-2 font-mono font-bold">
                  <AlertTriangle size={12} /> {errors[field.name]}
                </motion.span>
              )}
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-s-8 group/field">
          <label className="text-s-10 font-bold text-brand-primary-60 tracking-widest flex items-center gap-s-6 font-mono">
            <span className="w-s-3 h-s-3 bg-brand-primary rounded-full group-focus-within/field:animate-ping" />
            DATA_STREAM
          </label>
          <div className="relative">
            <textarea
              rows={3}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="SIGN_MESSAGE..."
              className="w-full bg-transparent text-brand-primary px-0 py-s-8 text-s-16 font-mono outline-none border-b-s-1 border-brand-primary-10 focus:border-brand-primary transition-all resize-none placeholder:text-brand-primary-20 min-h-s-80"
            />
            {errors.message && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-status-danger text-s-10 mt-s-2 flex items-center gap-s-2 font-mono font-bold">
                <AlertTriangle size={12} /> {errors.message}
              </motion.span>
            )}
          </div>
        </div>

        <div className="mt-s-8 flex flex-col gap-s-16">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-s-8 p-s-12 bg-brand-primary-20 text-brand-primary rounded-s-8 border border-brand-primary-40 font-mono"
              >
                <CheckCircle size={18} />
                <span className="text-s-10 font-black tracking-widest uppercase">TRANSMITTED</span>
              </motion.div>
            ) : status === 'error' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-s-8 p-s-12 bg-status-danger-10 text-status-danger rounded-s-8 border border-status-danger-40 font-mono"
              >
                <AlertTriangle size={18} />
                <span className="text-s-10 font-black tracking-widest uppercase">FATAL_ERROR</span>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <Button
            type="submit"
            disabled={status === 'loading'}
            label={status === 'loading' ? 'PROCESSING...' : formSubmitLabel}
            icon={status === 'loading' ? null : <Send size={20} />}
            className="w-full h-s-48 bg-brand-primary text-black font-black text-s-16 tracking-widest rounded-s-4 group/btn relative overflow-hidden active:scale-[0.98] transition-transform"
          >
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-full bg-white/20 -skew-x-12 pointer-events-none"
            />
          </Button>
        </div>
      </form>
    </div>
  );
};
