import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const portfolioItems = [
  {
    id: 1,
    title: "Sunset Vibes",
    category: "Music Production",
    videoId: "y9EHk-tfQNo",
    description: "A vibrant music production piece capturing sunset moods.",
  },
  {
    id: 2,
    title: "Ocean Story",
    category: "Film Production",
    videoId: "BmWJeWYTDt0",
    description: "A short film reflecting the sea’s emotional connection.",
  },
  {
    id: 3,
    title: "Wave Motion",
    category: "Music Video",
    videoId: "rwa1PJ0e2PQ",
    description: "Dynamic choreography in harmony with ocean waves.",
  },
  {
    id: 4,
    title: "Acoustic Echoes",
    category: "Live Recording",
    videoId: "LyUiwuta1ws",
    description: "Raw acoustic performance captured in an intimate session.",
  },
  {
    id: 5,
    title: "Tide Sounds",
    category: "Sound Design",
    videoId: "JZorUrZcPYQ",
    description: "Blending sea ambience with innovative sound design methods.",
  },
];

const PortfolioSection = () => {
  const [selectedItem, setSelectedItem] =
    useState<typeof portfolioItems[0] | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) observer.observe(section);
    return () => section && observer.unobserve(section);
  }, []);

  return (
    <section id="portfolio" className="py-20 bg-black-soft" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ✅ Updated heading and subtext */}
        <div
          className={`text-center mb-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-muted-foreground mb-2">
            Our Latest{" "}
            <span className="text-primary text-5xl md:text-6xl font-extrabold">
              Short Films on YouTube
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
            Experience our latest short films — cinematic storytelling brought
            to life with passion, creativity, and visual excellence.
          </p>
        </div>

        {/* ✅ Portfolio Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              className={`group cursor-pointer ${
                isVisible ? "animate-scale-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-xl hover:shadow-[var(--shadow-yellow)] transition-all duration-300 border-2 border-primary/20 hover:border-primary/50">
                <img
                  src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                  alt={item.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) =>
                    (e.currentTarget.src = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`)
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <p className="text-primary text-xs font-bold uppercase tracking-wider mb-1">
                    {item.category}
                  </p>
                  <h3 className="text-foreground text-lg font-bold">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Modal (Lightbox) */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {selectedItem?.title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {selectedItem?.category}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-cinematic-black">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedItem?.videoId}`}
                  title={selectedItem?.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
              <p className="text-muted-foreground">{selectedItem?.description}</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default PortfolioSection;
