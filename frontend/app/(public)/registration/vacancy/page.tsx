"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Briefcase, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { submitRegistrationApi } from "@/lib/api";

const POSITIONS = [
  { name: "Football Coach", icon: "⚽" },
  { name: "Athletics Trainer", icon: "🏃" },
  { name: "Boxing Coach", icon: "🥊" },
  { name: "Youth Program Officer", icon: "👥" },
  { name: "Sports Development Officer", icon: "📋" },
  { name: "Administrative Officer", icon: "🗂️" },
  { name: "Community Outreach Officer", icon: "🤝" },
  { name: "Finance & Accounts Officer", icon: "💼" },
  { name: "IT & Communications Officer", icon: "💻" },
  { name: "Other Position", icon: "📌" },
];

const EDUCATION_LEVELS = [
  "Certificate", "Diploma", "Bachelor's Degree",
  "Master's Degree", "PhD", "Other",
];

export default function VacancyRegistrationPage() {
  const [selectedPosition, setSelectedPosition] = useState("");
  const [step, setStep] = useState<"pick" | "form">("pick");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "",
    age: "", gender: "", education: "", cv_link: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await submitRegistrationApi({ type: "vacancy", position: selectedPosition, ...form });
      setSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen section-pattern flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md mx-4">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-slate-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-2">Your application for <strong>{selectedPosition}</strong> has been received.</p>
          <p className="text-gray-500 text-sm mb-8">We will review your application and contact you within 5–7 working days.</p>
          <div className="flex gap-3 justify-center">
            <Link href="/registration" className="btn-primary">Register Another</Link>
            <Link href="/" className="px-5 py-2.5 border-2 border-primary-700 text-primary-700 rounded-lg font-semibold text-sm hover:bg-primary-50 transition-colors">Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen section-pattern">
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <Link href="/registration" className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Registration
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-slate-600 rounded-xl flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Work Vacancy Application</h1>
              <p className="text-slate-300 mt-1">Apply for open positions in Hadiya Zone Youth & Sports Department</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {step === "pick" ? (
          <>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Select a Position</h2>
              <p className="text-gray-500">Choose the position you would like to apply for</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {POSITIONS.map((pos) => (
                <button
                  key={pos.name}
                  onClick={() => { setSelectedPosition(pos.name); setStep("form"); }}
                  className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4 hover:shadow-lg hover:border-slate-500 border-2 border-transparent transition-all text-left group"
                >
                  <span className="text-3xl flex-shrink-0">{pos.icon}</span>
                  <span className="font-semibold text-gray-800 group-hover:text-slate-700">{pos.name}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-8 pb-5 border-b border-gray-100">
              <button onClick={() => setStep("pick")} className="text-gray-400 hover:text-gray-600">
                <ArrowLeft size={20} />
              </button>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Applying for</p>
                <h2 className="text-xl font-bold text-slate-800">{selectedPosition}</h2>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="form-label">Full Name *</label>
                  <input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Your full name" className="form-input" required />
                </div>
                <div>
                  <label className="form-label">Phone Number *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+251 9XX XXX XXX" className="form-input" required />
                </div>
              </div>
              <div>
                <label className="form-label">Email Address *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="form-input" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="form-label">Age</label>
                  <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="e.g. 28" min={18} max={65} className="form-input" />
                </div>
                <div>
                  <label className="form-label">Gender</label>
                  <select name="gender" value={form.gender} onChange={handleChange} className="form-input">
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">Education Level</label>
                <select name="education" value={form.education} onChange={handleChange} className="form-input">
                  <option value="">Select education</option>
                  {EDUCATION_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">CV / Portfolio Link</label>
                <input type="url" name="cv_link" value={form.cv_link} onChange={handleChange} placeholder="https://drive.google.com/..." className="form-input" />
                <p className="text-xs text-gray-400 mt-1">Optional — Google Drive, Dropbox, or any public link</p>
              </div>
              <div>
                <label className="form-label">Cover Letter / Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Briefly describe your experience and why you are a good fit..." className="form-input resize-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-3.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                {loading ? <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> Submitting...</> : "Submit Application"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
