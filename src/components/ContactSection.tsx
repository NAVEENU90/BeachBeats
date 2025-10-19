import { useState, useEffect, useRef } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="py-20 bg-black" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-primary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to start your next project? Let's make waves together
          </p>
        </div>

        {/* Contact Info */}
        <div
          className={`max-w-3xl mx-auto space-y-8 ${
            isVisible ? "animate-slide-in-left" : "opacity-0"
          }`}
        >
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Contact Information
          </h3>

          <div className="space-y-6">
            {/* Phone */}
            <a
              href="tel:+919876543210"
              className="flex items-center space-x-4 p-4 rounded-lg bg-card hover:bg-primary/5 transition-colors duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300">
                  +91 987-654-3210
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@beachbeats.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 p-4 rounded-lg bg-card hover:bg-secondary/5 transition-colors duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors duration-300">
                <Mail className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-lg font-semibold text-card-foreground group-hover:text-secondary transition-colors duration-300">
                  hello@beachbeats.com
                </p>
              </div>
            </a>

            {/* Address with embedded Google Map */}
            <div className="flex flex-col items-start space-y-4 p-4 rounded-lg bg-card hover:bg-accent/5 transition-colors duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="text-lg font-semibold text-card-foreground group-hover:text-accent transition-colors duration-300">
                    Bharanickavu Temple Road, Kerala 690503
                  </p>
                </div>
              </div>

              {/* Embedded Map */}
              <div className="w-full rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3938.5827124125803!2d76.55713887769045!3d9.192060362913876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b061be56a2d8a77%3A0x57d7f50ac70b4d79!2sBharanickavu%20Temple%20Road%2C%20Kerala%20690503!5e0!3m2!1sen!2sin!4v1760598809453!5m2!1sen!2sin"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Call Button */}
          <div className="pt-6">
            <Button
              asChild
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-yellow)] transition-all duration-300 hover:scale-105"
            >
              <a href="tel:+919876543210" className="flex items-center justify-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>Call Us Now</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
