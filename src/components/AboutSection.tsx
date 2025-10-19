import { useEffect, useRef, useState } from "react";
import aboutImage from "@/assets/about-image.jpg";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animated numbers state
  const [years, setYears] = useState(0);
  const [projects, setProjects] = useState(0);
  const [clients, setClients] = useState(0);
  const [awards, setAwards] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Slower, smooth count-up animation
  useEffect(() => {
    if (!isVisible) return;

    const duration = 3000; // 3 seconds
    const start = performance.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3); // smooth easing

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = easeOutCubic(progress);

      setYears(Math.floor(eased * 4));
      setProjects(Math.floor(eased * 15));
      setClients(Math.floor(eased * 50));
      setAwards(Math.floor(eased * 3));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isVisible]);

  return (
    <section id="about" className="py-20 bg-black-soft" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className={`relative ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <div className="relative overflow-hidden rounded-3xl shadow-[var(--shadow-elegant)]">
              <img
                src={aboutImage}
                alt="BeachBeats Studio"
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cinematic-black/50 to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className={`space-y-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              About <span className="text-primary">BeachBeats</span>
            </h2>
            <div className="w-24 h-1 bg-primary rounded-full" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded on the shores where creativity meets passion, BeachBeats is a premier music and film production company dedicated to bringing your artistic vision to life.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With years of experience in music recording, film production, sound design, and creative direction, we've helped countless artists and brands create content that resonates and inspires.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-primary">{years}+</h3>
                <p className="text-muted-foreground">Years Experience</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-primary">{projects}+</h3>
                <p className="text-muted-foreground">Projects Completed</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-primary">{clients}+</h3>
                <p className="text-muted-foreground">Happy Clients</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-primary">{awards}+</h3>
                <p className="text-muted-foreground">Awards Won</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
