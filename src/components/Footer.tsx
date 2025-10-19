import { Instagram, Youtube, Music } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
    { icon: Music, href: "https://spotify.com", label: "Spotify" },
  ];

  return (
    <footer className="bg-black text-foreground py-12 border-t border-border/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Social Media Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                >
                  <Icon className="h-6 w-6 text-primary group-hover:text-primary/80 transition-colors duration-300" />
                </a>
              );
            })}
          </div>

          {/* Company Name */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary mb-2">BeachBeats</h3>
            <p className="text-muted-foreground">Crafting Waves in Music & Film</p>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground border-t border-border/50 pt-6 w-full">
            <p>&copy; {currentYear} BeachBeats. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
