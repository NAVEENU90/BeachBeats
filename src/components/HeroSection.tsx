import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Single background image (thumbnail)
  const backgroundImage =
    "https://imgs.search.brave.com/MQAkCBW-sy4r0dKINscRDFf2El-z9GaSyS4WMIW78bk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA4/MzI5MDk0L3Bob3Rv/L3BvcnRyYWl0LW9m/LW9sZC1mYXNoaW9u/ZWQtY2luZW1hLWRp/cmVjdG9yLWNhbWVy/YS1pbi1oYW5kLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1P/NnlZZnc3M2pfUG95/NlBTcVpDUlJ0OVJO/UXN1TEVfV2IzZXFT/SXBUWkZrPQ";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Full Background Image with parallax effect */}
      <div className="absolute inset-0 scale-110 transition-transform duration-1000">
        <img
          src={backgroundImage}
          alt="Hero Background"
          className="w-full h-full object-cover object-center opacity-40 animate-slow-zoom"
        />
      </div>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
      
      {/* Animated Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-500/10 animate-pulse-glow" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="mb-6 animate-fade-in-up [animation-fill-mode:forwards] opacity-0">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-2 tracking-tight">
            <span className="inline-block bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]">
              Beach Beats
            </span>
          </h1>
        </div>
        <h2 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up [animation-fill-mode:forwards] opacity-0 tracking-wide"
          style={{ animationDelay: "0.2s" }}
        >
          Production Services
        </h2>
        <p
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up [animation-fill-mode:forwards] opacity-0"
          style={{ animationDelay: "0.4s" }}
        >
          From initial concept through post-production to final delivery, we
          bring your creative vision to life with state-of-the-art technology
          and unmatched expertise.
        </p>
        <div 
          className="animate-fade-in-up [animation-fill-mode:forwards] opacity-0"
          style={{ animationDelay: "0.6s" }}
        >
          <Button
            onClick={scrollToContact}
            size="lg"
            className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-400 hover:to-yellow-500 shadow-[0_0_40px_rgba(250,204,21,0.4)] text-base sm:text-lg px-10 py-7 rounded-full font-bold transition-all duration-300 hover:scale-110 hover:shadow-[0_0_60px_rgba(250,204,21,0.6)] group overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 animate-fade-in [animation-fill-mode:forwards] opacity-0" style={{ animationDelay: "0.8s" }}>
          <span className="text-xs text-yellow-400 font-semibold tracking-wider uppercase">Scroll</span>
          <ChevronDown className="h-8 w-8 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;