import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

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

// YT Releases content (migrated from YouTubeSection)
interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  publishedAt: string;
}

const youtubeVideos: YouTubeVideo[] = [
  {
    id: "1",
    title: "Beach Beats Mix #1 - Sunset Vibes",
    thumbnail:
      "https://i.ytimg.com/vi/y9EHk-tfQNo/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLD2eBfZYJVATjzmB9WDPy8oVidImA",
    videoUrl: "https://youtu.be/y9EHk-tfQNo?si=H-2iGaqJUmilqTSw",
    publishedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Beach Beats Mix #2 - Ocean Waves",
    thumbnail:
      "https://i.ytimg.com/vi/JZorUrZcPYQ/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBYqRyAXAgqnQ2Ei4yG6GL-Q5FRLA",
    videoUrl: "https://youtu.be/y9EHk-tfQNo?si=8e8iIm2nxnTQHIk0",
    publishedAt: "2024-02-20",
  },
  {
    id: "3",
    title: "Beach Beats Mix #3 - Summer Nights",
    thumbnail:
      "https://i.ytimg.com/vi/jDTa81N5-pM/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC7YpZHTNtyHPHwdup3wfTd5zMIdw",
    videoUrl: "https://youtu.be/jDTa81N5-pM?si=N8EVJpWYdM4SxuYL",
    publishedAt: "2024-03-10",
  },
  {
    id: "4",
    title: "Beach Beats Mix #4 - Tropical Paradise",
    thumbnail:
      "https://i.ytimg.com/vi/FEJdoIMc4xg/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCHM0rdMp7xjwr_YFyRDzkPIBW-NA",
    videoUrl: "https://youtu.be/FEJdoIMc4xg?si=hbAQVfAMwWP_bR23",
    publishedAt: "2024-04-05",
  },
  {
    id: "5",
    title: "Beach Beats Mix #5 - Chill Sessions",
    thumbnail:
      "https://i.ytimg.com/vi/UUyGd71kSak/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-BIAC4AOKAgwIABABGH8gPig0MA8=&rs=AOn4CLBOz7kKqgFN19oD0yYjWJpf7tXA8w",
    videoUrl: "https://youtu.be/UUyGd71kSak?si=qak12c6rljWWclSo",
    publishedAt: "2024-05-12",
  },
  {
    id: "6",
    title: "Beach Beats Mix #6 - Golden Hour",
    thumbnail:
      "https://i.ytimg.com/vi/LyUiwuta1ws/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AHUBoACrAOKAgwIABABGGUgVihEMA8=&rs=AOn4CLDTvublyEuBLdFX55eHk-FAEATmnA",
    videoUrl: "https://youtu.be/LyUiwuta1ws?si=YsxIj0Q6BLSZOlsW",
    publishedAt: "2024-06-18",
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

        {/* ✅ YT Releases */}
        <div
          className={`text-center mt-20 mb-10 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            YT Releases
          </h3>
          <p className="text-muted-foreground">
            Check out our latest releases on YouTube
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {youtubeVideos.map((video, index) => (
            <div
              key={video.id}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card
                className="overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => window.open(video.videoUrl, "_blank", "noopener,noreferrer")}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-primary rounded-full p-4">
                        <Play className="w-8 h-8 text-primary-foreground fill-current" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                      {video.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(video.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
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
