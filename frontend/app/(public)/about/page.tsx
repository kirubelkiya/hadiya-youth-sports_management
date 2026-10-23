import { Target, Eye, BookOpen, Users, MapPin, CheckCircle } from "lucide-react";

export const metadata = {
  title: "About | Hadiya Zone Youth & Sports Department",
};

const objectives = [
  "Develop and implement comprehensive youth programs across all woredas",
  "Promote sports activities and identify talented athletes for regional competitions",
  "Provide vocational training and skills development for unemployed youth",
  "Foster leadership qualities and civic engagement among young people",
  "Support and develop sports infrastructure across Hadiya Zone",
  "Coordinate youth policies and programs with federal and regional bodies",
  "Promote healthy lifestyles and physical fitness in communities",
  "Celebrate and preserve traditional Ethiopian cultural sports",
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Header Banner */}
      <div
        className="relative py-24 flex items-center"
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
            About Us
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Hadiya Zone Youth<br />& Sports Department
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Learn about our history, mission, vision, and the work we do to
            empower youth and develop sports in Hadiya Zone.
          </p>
        </div>
      </div>

      {/* About the Department */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge-green mb-4">About the Department</span>
              <h2 className="text-3xl font-bold text-primary-800 mb-5">
                Serving the Youth of Hadiya Zone
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Hadiya Zone Youth and Sports Department is a government
                institution established to coordinate, plan, and implement
                youth development and sports programs across Hadiya Zone,
                located in the Southern Nations, Nationalities, and Peoples
                Region (SNNPR) of Ethiopia.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our department operates through a network of offices across all
                woredas in the zone, ensuring that youth development programs
                and sports activities reach every corner of Hadiya Zone,
                including rural and peri-urban communities.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We work in close collaboration with the Federal Ministry of
                Youth and Sports, the SNNPR Regional Youth and Sports Bureau,
                and local community organizations to deliver impactful
                programs that make a real difference in the lives of young
                people.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80"
                alt="Department work"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-primary-700">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary-700" />
                </div>
                <h2 className="text-2xl font-bold text-primary-800">
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To empower the youth of Hadiya Zone by developing their
                leadership potential, vocational skills, and civic
                participation, while promoting sports excellence and healthy
                lifestyles that contribute to personal and community
                development.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-gold-600">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-gold-700" />
                </div>
                <h2 className="text-2xl font-bold text-primary-800">
                  Our Vision
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                A Hadiya Zone where every young person has access to
                opportunities for growth, development, and meaningful
                participation in civic and sporting life — creating a
                generation of empowered, skilled, and socially responsible
                citizens who lead positive change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge-green mb-4">Key Objectives</span>
            <h2 className="section-title">What We Aim to Achieve</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {objectives.map((obj, idx) => (
              <div
                key={idx}
                className="flex gap-3 p-5 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group"
              >
                <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5 group-hover:text-primary-700" />
                <p className="text-gray-700 text-sm leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Info */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Department Information</h2>
            <p className="text-blue-200">
              Key information about our organization
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MapPin, label: "Location", value: "Hossana, Hadiya Zone, SNNPR, Ethiopia" },
              { icon: Users, label: "Coverage", value: "All Woredas of Hadiya Zone" },
              { icon: BookOpen, label: "Authority", value: "Regional Youth & Sports Bureau" },
              { icon: Target, label: "Focus", value: "Youth Development & Sports Promotion" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-primary-700/60 rounded-xl p-6 border border-primary-600/30 text-center"
              >
                <item.icon className="w-8 h-8 text-gold-400 mx-auto mb-3" />
                <p className="text-blue-300 text-xs uppercase tracking-wide mb-2">
                  {item.label}
                </p>
                <p className="text-white font-medium text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
