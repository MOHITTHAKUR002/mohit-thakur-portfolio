import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import contactData from '@/content/contact.json';
import { SectionWrapper } from '@shared/ui/SectionWrapper/SectionWrapper';
import { Button } from '@shared/ui/Button/Button';
import { Send, Terminal, Cpu, Database, ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { metadata } = contactData as {
    metadata: { title: string; subtitle: string; email: string; form_submit: string; form_id: string };
  };

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [scrambledTitle, setScrambledTitle] = useState(metadata.title);

  // Title scramble effect on mount
  useEffect(() => {
    let iteration = 0;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    const interval = setInterval(() => {
      setScrambledTitle(_ =>
        metadata.title.split("")
          .map((_, index) => {
            if (index < iteration) return metadata.title[index];
            return letters[Math.floor(Math.random() * letters.length)]
          })
          .join("")
      );

      if (iteration >= metadata.title.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [metadata.title]);

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
      const response = await fetch(`https://formspree.io/f/${metadata.form_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ...formData, _subject: `SYS-MSG: ${formData.name}` }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <SectionWrapper id="contact" className="py-s-80 min-h-screen flex items-center justify-center font-secondary">
      <div className="w-full max-w-s-1200 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-s-60 items-center px-s-20 md:px-0">

        {/* Left Side: System Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 flex flex-col gap-s-40"
        >
          <div className="flex flex-col gap-s-16">
            <span className="text-brand-primary-60 text-s-14 font-bold tracking-[0.3em] flex items-center gap-s-8 uppercase">
              <Cpu className="w-s-14 h-s-14 animate-pulse text-brand-primary" /> System_Access_Point
            </span>
            <h1 className="text-s-48 md:text-s-64 font-black leading-none tracking-tighter text-brand-primary hacker-glitch">
              {scrambledTitle}
            </h1>
            <p className="text-s-16 md:text-s-18 text-text-secondary opacity-60 leading-relaxed max-w-s-400 font-medium italic">
              {"> "} {metadata.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-s-24">
            {[
              { icon: <Database className="w-s-20 h-s-20" />, label: "ENCRYPTION", value: "AES-256-GCM" },
              { icon: <ShieldCheck className="w-s-20 h-s-20" />, label: "LOCATION", value: "SECURE_TUNNEL_MH" },
              { icon: <Terminal className="w-s-20 h-s-20" />, label: "PROTOCOL", value: "HTTPS_NODE_V2" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="flex items-center gap-s-20 p-s-16 bg-brand-primary-5 border-l-s-2 border-brand-primary-30 hover:bg-brand-primary-10 transition-colors group"
              >
                <div className="text-brand-primary group-hover:scale-110 transition-transform">{item.icon}</div>
                <div>
                  <p className="text-s-10 font-bold text-brand-primary-40 uppercase tracking-widest leading-none mb-s-4">{item.label}</p>
                  <p className="text-s-16 font-mono font-bold text-brand-primary-80 leading-none">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Contact Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 relative group"
        >
          {/* Animated Background Decoration */}
          <div className="absolute -inset-s-4 bg-brand-primary-10 blur-s-40 opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-s-24" />

          <div className="relative bg-black-60 backdrop-blur-xl p-s-30 md:p-s-60 rounded-s-24 overflow-hidden border-s-2 border-brand-primary-10 group-hover:border-brand-primary-30 transition-colors">
            {/* Terminal Header */}
            <div className="absolute top-0 left-0 w-full h-s-8 bg-brand-primary-20" />
            <div className="flex items-center justify-between mb-s-40">
              <div className="flex gap-s-8">
                <div className="w-s-12 h-s-12 rounded-full bg-status-danger shadow-[0_0_calc(var(--1)*10)_var(--brand-primary)]" />
                <div className="w-s-12 h-s-12 rounded-full bg-brand-primary-50" />
                <div className="w-s-12 h-s-12 rounded-full bg-brand-primary-30" />
              </div>
              <span className="text-s-11 font-bold text-brand-primary-40 tracking-widest font-mono">CONSOLE_V1.0.4</span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-s-32">
              {[
                { name: "name", label: "USER_IDENTIFIER", type: "text", placeholder: "LOGIN NAME..." },
                { name: "email", label: "COMM_CHANNEL", type: "email", placeholder: "EMAIL_ENDPOINT..." },
              ].map((field) => (
                <div key={field.name} className="flex flex-col gap-s-12 group/field">
                  <label className="text-s-11 font-bold text-brand-primary-60 tracking-widest flex items-center gap-s-8 font-mono">
                    <span className="w-s-4 h-s-4 bg-brand-primary rounded-full group-focus-within/field:animate-ping" />
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full bg-transparent text-brand-primary px-s-0 py-s-12 text-s-18 font-mono outline-none border-b-s-1 border-brand-primary-10 focus:border-brand-primary transition-all placeholder:text-brand-primary-20"
                    />
                    {errors[field.name] && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-status-danger text-s-11 mt-s-4 flex items-center gap-s-4 font-mono font-bold">
                        <AlertTriangle className="w-s-12 h-s-12" /> {errors[field.name]}
                      </motion.span>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex flex-col gap-s-12 group/field">
                <label className="text-s-11 font-bold text-brand-primary-60 tracking-widest flex items-center gap-s-8 font-mono">
                  <span className="w-s-4 h-s-4 bg-brand-primary rounded-full group-focus-within/field:animate-ping" />
                  DATA_PAYLOAD
                </label>
                <div className="relative">
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="ENTER MESSAGE COMPONENTS..."
                    className="w-full bg-transparent text-brand-primary px-s-0 py-s-12 text-s-18 font-mono outline-none border-b-s-1 border-brand-primary-10 focus:border-brand-primary transition-all resize-none placeholder:text-brand-primary-20 min-h-s-120"
                  />
                  {errors.message && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-status-danger text-s-11 mt-s-4 flex items-center gap-s-4 font-mono font-bold">
                      <AlertTriangle className="w-s-12 h-s-12" /> {errors.message}
                    </motion.span>
                  )}
                </div>
              </div>

              <div className="mt-s-20 flex flex-col gap-s-24">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-s-12 p-s-20 bg-brand-primary-20 text-brand-primary rounded-s-12 border border-brand-primary-40 font-mono shadow-s-sm"
                    >
                      <CheckCircle className="w-s-24 h-s-24" />
                      <span className="text-s-12 font-black tracking-[0.1em]">SUCCESS: TRANSMISSION_COMPLETE</span>
                    </motion.div>
                  ) : status === 'error' ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-s-12 p-s-20 bg-status-danger-10 text-status-danger rounded-s-12 border border-status-danger-40 font-mono shadow-s-sm"
                    >
                      <AlertTriangle className="w-s-24 h-s-24" />
                      <span className="text-s-12 font-black tracking-[0.1em]">FATAL: UPLINK_FAILED</span>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  label={status === 'loading' ? 'PROCESSING...' : metadata.form_submit}
                  icon={status === 'loading' ? null : <Send className="w-s-20 h-s-20" />}
                  className="w-full h-s-64 bg-brand-primary text-black font-black text-s-20 tracking-[0.2em] rounded-s-4 group/btn relative overflow-hidden active:scale-[0.98] transition-transform"
                >
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-full h-full bg-white-20 -skew-x-12 pointer-events-none"
                  />
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};
