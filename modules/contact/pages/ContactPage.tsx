import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import contactData from '@/content/contact.json';
import { SectionWrapper } from '@shared/ui/SectionWrapper/SectionWrapper';
import profilePic from '@modules/hero/assets/Mohit.jpeg';
import {
  Cpu,
  Database,
  ShieldCheck,
  Terminal,
  Users,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const metadata = (contactData as any).metadata as {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    whatsapp: string;
    linkedin: string;
    github: string;
    why_hire_me: Array<{ title: string; description: string; icon: string }>
  };

  const [scrambledTitle, setScrambledTitle] = useState(metadata.title);

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

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-s-24 h-s-24" />;
      case 'ShieldCheck': return <ShieldCheck className="w-s-24 h-s-24" />;
      case 'Database': return <Database className="w-s-24 h-s-24" />;
      case 'Terminal': return <Terminal className="w-s-24 h-s-24" />;
      default: return <Terminal className="w-s-24 h-s-24" />;
    }
  };

  const socialLinks = [
    { icon: <Users className="w-s-20 h-s-20" />, label: "LinkedIn", value: "mohit-thakur-dev", url: metadata.linkedin, color: "#0077b5" },
    { icon: <Terminal className="w-s-20 h-s-20" />, label: "GitHub", value: "mohitthakur002", url: metadata.github, color: "#333" },
    { icon: <MessageCircle className="w-s-20 h-s-20" />, label: "WhatsApp", value: "+91 82196****", url: metadata.whatsapp, color: "#25d366" },
    { icon: <Mail className="w-s-20 h-s-20" />, label: "Email", value: metadata.email, url: `mailto:${metadata.email}`, color: "#ea4335" },
    { icon: <Phone className="w-s-20 h-s-20" />, label: "Secure Line", value: metadata.phone, url: `tel:${metadata.phone}`, color: "#00ff41" },
  ];

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemFade = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <SectionWrapper id="contact" className="py-s-100 min-h-screen flex items-center justify-center font-secondary overflow-hidden">
      <div className="w-full max-w-s-1200 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-s-80 lg:gap-s-120 items-start px-s-20 md:px-0">
        
        {/* Left Side: Professional Profile */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 space-y-s-60"
        >
          <div className="space-y-s-32">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-s-120 h-s-160 rounded-s-24 overflow-hidden border-s-2 border-brand-primary-40 bg-bg-inverse shadow-[0_0_25px_var(--brand-primary-15)] group"
            >
               <img 
                 src={profilePic}
                 alt="Mohit Thakur"
                 className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 contrast-125 brightness-90"
                 onError={(e) => {
                   (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Mohit+Thakur&background=00ff41&color=000&size=256';
                 }}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black-60 to-transparent pointer-events-none" />
               <div className="absolute bottom-s-8 left-s-8 right-s-8 h-s-2 bg-brand-primary-30 animate-pulse-slow" />
            </motion.div>

            <div className="space-y-s-20">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-brand-primary-60 text-s-14 font-black tracking-[0.4em] flex items-center gap-s-12 uppercase"
              >
                <span className="w-s-40 h-s-1 bg-brand-primary-40" />
                Secure_Uplink_Node
              </motion.span>
              <h1 className="text-s-54 md:text-s-80 font-black leading-none tracking-tighter text-brand-primary uppercase italic">
                {scrambledTitle}
              </h1>
              <p className="text-s-18 md:text-s-20 text-text-secondary opacity-80 leading-relaxed font-medium italic border-l-s-4 border-brand-primary-20 pl-s-20 max-w-s-450">
                {"> "} {metadata.subtitle}
              </p>
            </div>
          </div>

          {/* Contact Methods Grid */}
          <div className="space-y-s-32">
            <h3 className="text-s-12 font-black text-brand-primary-40 uppercase tracking-[0.3em] font-mono">Direct_Comm_Channels</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-s-16">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-s-16 p-s-16 bg-bg-surface border border-brand-primary-10 rounded-s-12 hover:border-brand-primary transition-all group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-brand-primary-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <div className="relative z-10 p-s-8 rounded-s-8 bg-brand-primary-10 text-brand-primary group-hover:bg-brand-primary group-hover:text-black transition-colors">
                    {link.icon}
                  </div>
                  <div className="relative z-10">
                    <p className="text-s-9 font-black text-brand-primary-40 uppercase tracking-widest">{link.label}</p>
                    <p className="text-s-14 font-mono font-bold text-text-primary group-hover:text-brand-primary transition-colors">{link.value}</p>
                  </div>
                  <ExternalLink className="absolute right-s-16 top-s-16 w-s-12 h-s-12 opacity-0 group-hover:opacity-100 transition-opacity text-brand-primary" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-s-20">
            <div className="w-s-12 h-s-12 rounded-full bg-brand-primary animate-pulse shadow-[0_0_15px_var(--brand-primary)]" />
            <span className="text-s-12 font-mono font-bold text-brand-primary-60">STATUS: UPLINK_AVAILABLE_GLOBAL</span>
          </div>
        </motion.div>

        {/* Right Side: Why Collaborate? */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="lg:col-span-7 space-y-s-40"
        >
          <div className="space-y-s-12">
            <h2 className="text-s-28 md:text-s-38 font-black text-text-primary tracking-tight uppercase leading-tight">
              Why Collaborate With <br /><span className="text-brand-primary italic">Mohit Thakur ?</span>
            </h2>
            <div className="w-s-full h-s-4 bg-brand-primary rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-s-24">
            {metadata.why_hire_me.map((item, i) => (
              <motion.div
                key={i}
                variants={itemFade}
                className="bg-bg-surface border-s-1 border-brand-primary-10 p-s-32 rounded-s-24 hover:bg-brand-primary-5 transition-colors group relative overflow-hidden"
              >
                {/* Decorative scanning line */}
                <div className="absolute top-0 right-0 w-s-64 h-s-64 bg-brand-primary-5 rounded-bl-full -mr-s-32 -mt-s-32 group-hover:scale-150 transition-transform duration-500" />
                
                <div className="mb-s-20 text-brand-primary bg-brand-primary-10 w-fit p-s-12 rounded-s-12 border border-brand-primary-20">
                  {getIcon(item.icon)}
                </div>
                <h4 className="text-s-18 font-black text-brand-primary uppercase tracking-widest mb-s-12 font-mono">{item.title}</h4>
                <p className="text-s-14 text-text-secondary leading-relaxed font-medium">
                  {item.description}
                </p>

                <div className="mt-s-24 flex items-center gap-s-8 text-s-11 font-black text-brand-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                  OPTIMIZE_WORKFLOW <ArrowRight className="w-s-12 h-s-12" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action for Chatbot */}
          <motion.div 
             variants={itemFade}
             className="bg-brand-primary p-s-40 rounded-s-24 text-black flex flex-col md:flex-row items-center justify-between gap-s-32 shadow-[0_20px_50px_rgba(0,255,65,0.1)]"
          >
             <div className="space-y-s-8 text-center md:text-left">
                <h3 className="text-s-24 font-black tracking-tight uppercase leading-none">Ready to start?</h3>
                <p className="text-s-14 font-bold opacity-70">Initialize a floating terminal to send a signal directly.</p>
             </div>
             <div className="flex items-center gap-s-16 font-black uppercase tracking-widest text-s-14 group">
                <span className="hidden md:block">Use Chatbot</span>
                <div className="w-s-54 h-s-54 rounded-full border-s-2 border-black flex items-center justify-center animate-bounce">
                   <ArrowRight className="w-s-24 h-s-24" />
                </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};
