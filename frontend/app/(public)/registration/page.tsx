import Link from "next/link";
import { Trophy, CalendarDays, Briefcase, ArrowRight, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Register | Hadiya Zone Youth & Sports Department",
};

const options = [
  {
    icon: Trophy,
    label: "Sport",
    title: "Register for Sport",
    description:
      "Join one of our supported sports disciplines. Open to all ages and skill levels — from beginner to competitive athlete.",
    href: "/registration/sport",
    color: "from-primary-700 to-primary-900",
    iconBg: "bg-primary-600",
    badge: "Athletes",
    perks: ["Football, Boxing, Athletics & more", "Free coaching & training", "Compete at zone & regional level"],
  },
  {
    icon: CalendarDays,
    label: "Event",
    title: "Register for an Event",
    description:
      "Sign up to participate in upcoming departmental events, competitions, festivals, and community activities.",
    href: "/registration/event",
    color: "from-gold-600 to-gold-800",
    iconBg: "bg-gold-500",
    badge: "Participants",
    perks: ["Sports competitions & tournaments", "Youth summits & forums", "Cultural & community events"],
  },
  {
    icon: Briefcase,
    label: "Vacancy",
    title: "Register for Work Vacancy",
    description:
      "Apply for open job positions within the Hadiya Zone Youth and Sports Department. Submit your details and qualifications.",
    href: "/registration/vacancy",
    color: "from-slate-700 to-slate-900",
    iconBg: "bg-slate-600",
    badge: "Job Seekers",
    perks: ["Coaches & trainers", "Administrative roles", "Field & outreach officers"],
  },
];

export default function RegistrationPage() {
  return (
    <div className="pt-16">
      {/* Banner */}
      <div
        className="relative py-24"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary-900/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="text-gold-400 font-semibold uppercase tracking-wider text-sm mb-3">
            Get Involved
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Registration Portal
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Choose a registration category below to get started. Whether you're
            an athlete, event participant, or job seeker — we have a place for
            you.
          </p>
        </div>
      </div>

      {/* Cards */}
      <section className="py-20 section-pattern">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {options.map((opt) => (
              <div
                key={opt.label}
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300 group"
              >
                {/* Card Header */}
                <div className={`bg-gradient-to-br ${opt.color} p-8 text-white`}>
                  <div
                    className={`w-14 h-14 ${opt.iconBg} rounded-xl flex items-center justify-center mb-5 shadow-lg`}
                  >
                    <opt.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2 block">
                    {opt.badge}
                  </span>
                  <h2 className="text-2xl font-bold mb-3">{opt.title}</h2>
                  <p className="text-sm opacity-85 leading-relaxed">
                    {opt.description}
                  </p>
                </div>

                {/* Perks */}
                <div className="p-6 flex flex-col flex-1">
                  <ul className="space-y-3 mb-8 flex-1">
                    {opt.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-3 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={opt.href}
                    className="flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-primary-700 hover:bg-primary-800 text-white font-semibold rounded-xl transition-all group-hover:gap-3 text-sm"
                  >
                    Register Now <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info strip */}
      <section className="py-12 bg-primary-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-bold mb-2">Need Help?</h3>
          <p className="text-blue-200 text-sm">
            If you have questions about any registration, visit our{" "}
            <Link href="/contact" className="underline text-gold-300 hover:text-gold-200">
              Contact page
            </Link>{" "}
            or call us at{" "}
            <span className="text-gold-300 font-semibold">+251 077 XXX XXXX</span>
          </p>
        </div>
      </section>
    </div>
  );
}
