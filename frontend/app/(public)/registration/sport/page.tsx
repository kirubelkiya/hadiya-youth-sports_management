"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { submitRegistrationApi } from "@/lib/api";

const SPORTS = [
  { name: "Football", icon: "⚽" },
  { name: "Boxing", icon: "🥊" },
  { name: "Athletics (Track & Field)", icon: "🏃" },
  { name: "Basketball", icon: "🏀" },
  { name: "Volleyball", icon: "🏐" },
  { name: "Chess", icon: "♟️" },
  { name: "Table Tennis", icon: "🏓" },
  { name: "Swimming", icon: "🏊" },
  { name: "Cycling", icon: "🚴" },
  { name: "Taekwondo", icon: "🥋" },
  { name: "Handball", icon: "🤾" },
  { name: "Other", icon: "🏅" },
];

const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced", "Professional"];

export default function SportRegistrationPage() {
  const [selectedSport, setSelectedSport] = useState("");
  const [step, setStep] = useState<"pick" | "form">("pick");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "", email: "", phone: "",
    age: "", gender: "", experience: "", message: "",
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
      await submitRegistrationApi({
        type: "sport",
        sport_name: selectedSport,
        ...form,
      });
      setSubmitted(true);
      toast.success("Registration submitted successfully!");
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
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Submitted!</h2>
          <p className="text-gray-600 mb-2">You have registered for <strong>{selectedSport}</strong>.</p>
          <p className="text-gray-500 text-sm mb-8">Our team will review your application and contact you soon.</p>
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
      {/* Banner */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <Link href="/registration" className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Registration
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Sport Registration</h1>
              <p className="text-blue-200 mt-1">Join our sports programs and represent Hadiya Zone</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {step === "pick" ? (
          <>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Sport</h2>
              <p className="text-gray-500">Select the sport discipline you want to register for</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {SPORTS.map((sport) => (
                <button
                  key={sport.name}
                  onClick={() => { setSelectedSport(sport.name); setStep("form"); }}
                  className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center gap-3 hover:shadow-lg hover:border-primary-500 border-2 border-transparent transition-all group"
                >
                  <span className="text-4xl">{sport.icon}</span>
                  <span className="font-semibold text-gray-800 text-sm text-center group-hover:text-primary-700">
                    {sport.name}
                  </span>
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
                <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Registering for</p>
                <h2 className="text-xl font-bold text-primary-800">{selectedSport}</h2>
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
                  <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="e.g. 22" min={5} max={60} className="form-input" />
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
                <label className="form-label">Experience Level</label>
                <select name="experience" value={form.experience} onChange={handleChange} className="form-input">
                  <option value="">Select level</option>
                  {EXPERIENCE_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Additional Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Any additional information..." className="form-input resize-none" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                {loading ? <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> Submitting...</> : "Submit Registration"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
