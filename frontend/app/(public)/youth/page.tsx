import { Users, Lightbulb, Heart, Globe } from "lucide-react";
import { fetchYouth } from "@/lib/server-api";
import { resolveImageUrl } from "@/lib/image-url";
import type { YouthProgram } from "@/types";

export const metadata = {
  title: "Youth Programs | Hadiya Zone Youth & Sports Department",
};

export const revalidate = 60;

export default async function YouthPage() {
  const programs = await fetchYouth();

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
            Youth
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Youth Development Programs
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Comprehensive programs designed to empower young people with the
            skills, knowledge, and opportunities they need to thrive.
          </p>
        </div>
      </div>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: Users,
                title: "Youth Empowerment",
                desc: "Building confidence and self-reliance in young people",
              },
              {
                icon: Lightbulb,
                title: "Skills Development",
                desc: "Practical training for employment and entrepreneurship",
              },
              {
                icon: Heart,
                title: "Community Service",
                desc: "Encouraging civic responsibility and volunteerism",
              },
              {
                icon: Globe,
                title: "Leadership",
                desc: "Developing tomorrow's community and national leaders",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="text-center p-6 bg-primary-50 rounded-xl"
              >
                <div className="w-14 h-14 bg-primary-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge-green mb-4">Our Programs</span>
            <h2 className="section-title">Youth Programs</h2>
            <p className="section-subtitle">
              A wide range of programs tailored to support youth development at
              every stage.
            </p>
          </div>

          {programs.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Users size={48} className="mx-auto mb-3 opacity-30" />
              <p>No programs available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program: YouthProgram) => (
                <div key={program.id} className="card group flex flex-col">
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={resolveImageUrl(
                        program.image,
                        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600"
                      )}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="badge-green mb-3 self-start">Program</span>
                    <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 flex-1">
                      {program.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Activities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Youth Activities & Opportunities</h2>
            <p className="section-subtitle">
              Beyond formal programs, we offer a variety of activities to keep
              youth engaged and growing.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600",
                title: "Youth Forums & Conferences",
                desc: "Regular forums where youth can discuss issues, share ideas, and connect with peers and mentors from across Hadiya Zone.",
              },
              {
                img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600",
                title: "Innovation & Entrepreneurship",
                desc: "Competitions, hackathons, and innovation showcases that challenge young people to develop creative solutions to community problems.",
              },
              {
                img: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600",
                title: "Sports & Recreation",
                desc: "Regular sports activities promoting physical health, teamwork, and friendly competition among youth across the zone.",
              },
            ].map((activity) => (
              <div key={activity.title} className="card group">
                <div className="overflow-hidden h-48">
                  <img
                    src={activity.img}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{activity.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
