import { useEffect, useRef, useState } from "react";
import { Music, Video, Film, Disc, Radio, Headphones } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Music,
    title: "Music Recording",
    description: "Professional recording sessions with state-of-the-art equipment and acoustic perfection.",
  },
  {
    icon: Video,
    title: "Video Editing",
    description: "Cinematic post-production that brings your visual stories to life with expert editing.",
  },
  {
    icon: Film,
    title: "Film Production",
    description: "Complete film production services from concept to final cut with creative excellence.",
  },
  {
    icon: Headphones,
    title: "Sound Design",
    description: "Immersive audio experiences crafted with precision and artistic vision.",
  },
  {
    icon: Disc,
    title: "Distribution",
    description: "Get your music and films to the world through our distribution network.",
  },
  {
    icon: Radio,
    title: "Creative Direction",
    description: "Strategic creative guidance to elevate your project to industry standards.",
  },
];

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const cardColors = [
    "bg-gradient-to-br",
    "bg-gradient-to-br",
    "bg-gradient-to-br",
    "bg-gradient-to-br",
    "bg-gradient-to-br",
    "bg-gradient-to-br",
  ];

  return (
    <section id="services" className="py-20 bg-black" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            This is what <span className="text-primary">we do</span>
          </h2>
          <div className="w-24 h-1 bg-primary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From concept to completion, we deliver comprehensive video production services that bring your vision to life
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`${isVisible ? "animate-scale-in" : "opacity-0"}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-full rounded-xl p-6 ${cardColors[index]} shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group cursor-pointer`}>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                      <Icon className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {service.title}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
