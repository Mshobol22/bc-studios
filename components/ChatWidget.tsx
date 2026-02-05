"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Mail } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: "bot" | "user"; text: string }>>([
    { type: "bot", text: "Hi! I'm the BC-studios assistant. How can I help you today?" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatMode, setChatMode] = useState<"options" | "inputting_project" | "final_cta">("options");
  const [projectDescription, setProjectDescription] = useState("");

  const quickQuestions = [
    "What services do you offer?",
    "How much does a project cost?",
    "I want to start a project.",
  ];

  const responses: Record<string, string> = {
    "What services do you offer?":
      "We offer Mobile, Web, UI/UX, Strategy, Maintenance, and Cloud services. Would you like details on any specific area?",
    "How much does a project cost?":
      "Costs vary by scope. We provide custom quotes after understanding your needs. Email core@bc-studios.org to get started.",
    "I want to start a project.":
      "Great! Email us at core@bc-studios.org or tell me about your project here and I'll help guide you.",
  };

  const renderMessage = (text: string) => {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const parts = text.split(emailRegex);
    const isEmail = (s: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/i.test(s);
    return parts.map((part, idx) => {
      if (isEmail(part))
        return (
          <a key={idx} href={`mailto:${part}`} className="underline text-emerald-400 hover:text-emerald-300" onClick={(e) => e.stopPropagation()}>
            {part}
          </a>
        );
      return <span key={idx}>{part}</span>;
    });
  };

  const handleQuestionClick = (question: string) => {
    setMessages((prev) => [...prev, { type: "user", text: question }]);
    setIsTyping(true);
    if (question === "I want to start a project.") {
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { type: "bot", text: responses[question] }]);
        setChatMode("inputting_project");
      }, 1000);
    } else {
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { type: "bot", text: responses[question] || "I'm here to help!" }]);
      }, 1000);
    }
  };

  const handleProjectSubmit = () => {
    if (!projectDescription.trim()) return;
    setMessages((prev) => [...prev, { type: "user", text: projectDescription }]);
    setProjectDescription("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { type: "bot", text: "Thanks! I've prepared an email for our team. Click below to send it." }]);
      setChatMode("final_cta");
    }, 1000);
  };

  const handleChatToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (!newIsOpen) {
      setChatMode("options");
      setProjectDescription("");
      setMessages([{ type: "bot", text: "Hi! I'm the BC-studios assistant. How can I help you today?" }]);
    }
  };

  const getEmailLink = () => {
    const userMsgs = messages.filter((m) => m.type === "user" && m.text !== "I want to start a project.");
    const desc = userMsgs.length ? userMsgs[userMsgs.length - 1].text : "";
    return `mailto:core@bc-studios.org?subject=New Project Inquiry&body=${encodeURIComponent(desc)}`;
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="bg-slate-800/50 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">BC-studios Assistant</p>
                  <p className="text-slate-400 text-xs">Online</p>
                </div>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.type === "user" ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-200"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{renderMessage(msg.text)}</p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 rounded-2xl px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {!isTyping && chatMode === "options" && (
              <div className="border-t border-slate-700 p-4 space-y-2 bg-slate-800/30">
                <p className="text-slate-400 text-xs mb-2">Quick questions:</p>
                {quickQuestions.map((q, idx) => (
                  <motion.button
                    key={idx}
                    type="button"
                    onClick={() => handleQuestionClick(q)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-300 hover:text-white"
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            )}
            {!isTyping && chatMode === "inputting_project" && (
              <div className="border-t border-slate-700 p-4 space-y-2 bg-slate-800/30">
                <p className="text-slate-400 text-xs mb-2">Tell us about your project:</p>
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Describe your project idea, goals, timeline..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-900 text-white placeholder:text-slate-400 resize-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm min-h-[100px]"
                  rows={4}
                />
                <motion.button
                  type="button"
                  onClick={handleProjectSubmit}
                  disabled={!projectDescription.trim()}
                  whileHover={{ scale: projectDescription.trim() ? 1.02 : 1 }}
                  whileTap={{ scale: projectDescription.trim() ? 0.98 : 1 }}
                  className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg px-4 py-2 text-sm ${!projectDescription.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Submit Description
                </motion.button>
              </div>
            )}
            {!isTyping && chatMode === "final_cta" && (
              <div className="border-t border-slate-700 p-4 bg-slate-800/30">
                <motion.a
                  href={getEmailLink()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg px-4 py-3 text-sm flex items-center justify-center gap-2"
                >
                  <Mail size={16} />
                  Email Core Team
                </motion.a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        onClick={handleChatToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl flex items-center justify-center z-50"
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </>
  );
}
