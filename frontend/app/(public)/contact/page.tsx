import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact | Hadiya Zone Youth & Sports Department",
};

const details = [
  {
    icon: MapPin,
    label: "Address",
    value: "Hadiya Zone Youth & Sports Department\nHossana, SNNPR, Ethiopia",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+251 077 XXX XXXX",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@hadiyazone.gov.et",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon – Fri: 8:00 AM – 5:00 PM\nSat: 8:00 AM – 12:00 PM",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-16">
      {/* Banner */}
      <div
        className="relative py-24"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary-900/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <p className="text-gold-400 font-semibold uppercase tracking-wider text-sm mb-2">
            Contact
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Have questions about our programs or activities? We&apos;d love to
            hear from you. Reach out to our team.
          </p>
        </div>
      </div>

      <section className="py-16 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-bold text-primary-800 mb-6">
                  Contact Information
                </h2>
                <div className="space-y-5">
                  {details.map((item) => (
                    <div key={item.label} className="flex gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary-700" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-gray-800 text-sm whitespace-pre-line">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary-800 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-3">
                  የሀዲያ ዞን ወጣቶችና ስፖርት መምሪያ
                </h3>
                <p className="text-blue-200 text-sm">
                  We are dedicated to serving the youth and sports community of
                  Hadiya Zone. Visit us at our main office in Hossana.
                </p>
              </div>
            </div>

            {/* Contact Form — client component */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
