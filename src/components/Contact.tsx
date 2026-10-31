"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Loader2,
  User,
  FileText,
  MessageSquare,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { sendContactEmail } from "@/lib/email";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export interface ContactInfo {
  id: string;
  title: string;
  value: string;
  link?: string;
  icon: React.ReactNode;
}

const contactInfoList: ContactInfo[] = [
  {
    id: "email",
    title: "Email Me",
    value: "acdamit2004@gmail.com",
    link: "mailto:acdamit2004@gmail.com",
    icon: <Mail className="w-5 h-5 text-sky-500" />,
  },
  {
    id: "phone",
    title: "Phone / WhatsApp",
    value: "+8801326107950",
    link: "https://wa.me/8801326107950",
    icon: <Phone className="w-5 h-5 text-purple-500" />,
  },
  {
    id: "location",
    title: "Location",
    value: "Chattogram, Bangladesh",
    icon: <MapPin className="w-5 h-5 text-emerald-500" />,
  },
];

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/amitchandradas2004",
    icon: <FaGithub className="w-5 h-5 text-slate-800 dark:text-slate-200" />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/amitchandradas2004",
    icon: <FaLinkedin className="w-5 h-5 text-[#0A66C2]" />,
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/amitchandradas2004",
    icon: <SiLeetcode className="w-5 h-5 text-[#FFA116]" />,
  },
  {
    name: "Twitter / X",
    url: "https://x.com/amitchandra2004",
    icon: <FaXTwitter className="w-5 h-5 text-[#1DA1F2]" />,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const leftColumnVariants: Variants = {
  hidden: (isDesktop?: boolean) => ({
    opacity: 0,
    x: isDesktop ? -35 : 0,
    y: isDesktop ? 0 : -35,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const rightColumnVariants: Variants = {
  hidden: (isDesktop?: boolean) => ({
    opacity: 0,
    x: isDesktop ? 35 : 0,
    y: isDesktop ? 0 : -35,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Contact() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) setErrorMessage(null);
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) {
      return "Name is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      return "Please enter a valid email address.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      return "Message must be at least 10 characters long.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await sendContactEmail({
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        subject: formData.subject.trim() || "Portfolio Contact Form Inquiry",
        message: formData.message.trim(),
      });

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 relative overflow-hidden bg-slate-100 dark:bg-[#020617] text-[#0F172A] dark:text-[#F8FAFC] py-20 sm:py-24 transition-colors duration-300 w-full"
    >
      {/* =========================================================================
         BACKGROUND LIQUID LIGHT SOURCES (Provides Refraction for Glass)
         ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Neon Cyan Liquid Orb (Top Left) */}
        <div className="absolute top-10 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-sky-400/35 dark:bg-cyan-500/30 blur-[90px] rounded-full animate-pulse" />

        {/* Vibrant Magenta/Purple Liquid Orb (Bottom Right) */}
        <div className="absolute bottom-10 right-1/4 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] bg-purple-500/30 dark:bg-indigo-600/30 blur-[100px] rounded-full animate-pulse" />

        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf818_1px,transparent_1px),linear-gradient(to_bottom,#38bdf818_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 w-full relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 dark:bg-slate-900/50 border border-white/60 dark:border-white/10 backdrop-blur-xl text-sky-600 dark:text-[#38BDF8] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 shadow-lg shadow-sky-500/10"
          >
            <Sparkles className="w-4 h-4 text-sky-500 dark:text-[#38BDF8]" />
            <span>Get In Touch</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight"
          >
            Contact{" "}
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              &nbsp;Me
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed"
          >
            Have a project in mind? Let&apos;s build something amazing together.
          </motion.p>
        </div>

        {/* TWO COLUMN CONTAINER */}
        <motion.div
          variants={containerVariants}
          custom={isDesktop}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-start"
        >
          {/* LEFT SIDE: CONTACT INFORMATION CARDS */}
          <motion.div
            custom={isDesktop}
            variants={leftColumnVariants}
            className="lg:col-span-5 space-y-6"
          >
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfoList.map((item) => {
                const CardWrapper = item.link ? motion.a : motion.div;
                const linkProps = item.link
                  ? {
                    href: item.link,
                    "aria-label": `${item.title}: ${item.value}`,
                    ...(item.link.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {}),
                  }
                  : {};

                return (
                  <CardWrapper
                    key={item.id}
                    {...linkProps}
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={item.link ? { scale: 0.99 } : undefined}
                    className={`group relative p-5 sm:p-6 rounded-xl overflow-hidden backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 border border-white/60 dark:border-white/10 hover:border-sky-400/60 dark:hover:border-sky-400/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] hover:shadow-[0_12px_40px_0_rgba(56,189,248,0.25)] transition-all duration-500 flex items-center gap-4 ${item.link ? "cursor-pointer" : ""
                      }`}
                  >
                    {/* Liquid Specular Light Reflection */}
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-white/40 dark:from-sky-400/20 to-transparent rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

                    <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-slate-700/60 group-hover:scale-110 transition-transform duration-300 shrink-0 backdrop-blur-md shadow-sm">
                      {item.icon}
                    </div>

                    <div className="relative z-10 overflow-hidden">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">
                        {item.title}
                      </h3>
                      <p className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors duration-200 truncate">
                        {item.value}
                      </p>
                    </div>
                  </CardWrapper>
                );
              })}
            </div>

            {/* Social Links Box */}
            <div className="relative p-5 sm:p-6 rounded-xl overflow-hidden backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 border border-white/60 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
              {/* Liquid Specular Light Reflection */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-white/40 dark:from-sky-400/20 to-transparent rounded-full blur-xl pointer-events-none" />

              <h3 className="relative z-10 text-sm font-bold text-slate-900 dark:text-white mb-3">
                Connect on Social Networks
              </h3>
              <div className="relative z-10 flex flex-wrap items-center gap-2.5 sm:gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-700/80 border border-white/50 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shrink-0 backdrop-blur-md shadow-sm"
                  >
                    {social.icon}
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: CONTACT FORM */}
          <motion.div
            custom={isDesktop}
            variants={rightColumnVariants}
            className="lg:col-span-7"
          >
            <div className="relative rounded-xl overflow-hidden p-6 sm:p-8 md:p-10 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 border border-white/60 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
              {/* Liquid Specular Light Reflection */}
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-white/40 dark:from-sky-400/20 to-transparent rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-6">
                  <MessageSquare className="w-5 h-5 text-sky-500" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Send a Direct Message
                  </h3>
                </div>

                {/* SUCCESS MESSAGE BANNER */}
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold flex items-center gap-2.5 backdrop-blur-md"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>
                      Thank you! Your message has been sent successfully. I will get back to you shortly.
                    </span>
                  </motion.div>
                )}

                {/* ERROR MESSAGE BANNER */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400 text-sm font-semibold flex items-center gap-2.5 backdrop-blur-md"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Web3Forms Honeypot Spam Protection */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Name Input */}
                    {/* Name Input */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5"
                      >
                        Your Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white/50 dark:bg-slate-950/50 border border-white/60 dark:border-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/30 dark:focus:ring-sky-500/30 focus:border-sky-400/60 dark:focus:border-sky-400/50 transition-all duration-200 backdrop-blur-md shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5"
                      >
                        Your Email *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white/50 dark:bg-slate-950/50 border border-white/60 dark:border-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/30 dark:focus:ring-sky-500/30 focus:border-sky-400/60 dark:focus:border-sky-400/50 transition-all duration-200 backdrop-blur-md shadow-inner"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5"
                    >
                      Subject
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project Inquiry / Job Opportunity"
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white/50 dark:bg-slate-950/50 border border-white/60 dark:border-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/30 dark:focus:ring-sky-500/30 focus:border-sky-400/60 dark:focus:border-sky-400/50 transition-all duration-200 backdrop-blur-md shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or requirements..."
                      className="w-full p-4 rounded-xl text-sm bg-white/50 dark:bg-slate-950/50 border border-white/60 dark:border-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/30 dark:focus:ring-sky-500/30 focus:border-sky-400/60 dark:focus:border-sky-400/50 transition-all duration-200 resize-none backdrop-blur-md shadow-inner"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex h-12 w-full sm:w-auto items-center justify-center overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-sky-400/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-sky-500/10 hover:shadow-lg hover:shadow-sky-500/20 cursor-pointer"
                  >
                    {/* Soft Specular Border Highlight */}
                    <span className="absolute inset-0 bg-gradient-to-r from-sky-400/40 via-blue-500/30 to-purple-500/40 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Button Inner Body with Liquid Glass Backdrop */}
                    <span className="relative inline-flex h-full w-full items-center justify-center rounded-[11px] bg-white/70 dark:bg-slate-900/80 hover:bg-white/90 dark:hover:bg-slate-800/90 px-8 py-1 text-sm font-bold text-slate-800 dark:text-white backdrop-blur-xl gap-2.5 transition-colors duration-200">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-sky-500 dark:text-sky-400" />
                          <span>Sending...</span>
                        </>
                      ) : isSubmitted ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                          <span>Message Sent ✓</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-sky-500 dark:text-sky-400 transition-transform duration-200 group-hover:translate-x-1" />
                          <span>Send Message</span>
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}