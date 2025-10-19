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
    description: "A short film reflecting the sea's emotional connection.",
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
  const [ytVisible, setYtVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const ytSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );

    const ytObserver = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setYtVisible(true),
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    const ytSection = ytSectionRef.current;

    if (section) observer.observe(section);
    if (ytSection) ytObserver.observe(ytSection);

    return () => {
      if (section) observer.unobserve(section);
      if (ytSection) ytObserver.unobserve(ytSection);
    };
  }, []);

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-black via-black-soft to-black" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-muted-foreground mb-2">
            Our Latest{" "}
            <span className="text-primary text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary via-yellow-400 to-primary">
              Short Films
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
            Experience our latest short films — cinematic storytelling brought
            to life with passion, creativity, and visual excellence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              className={`group cursor-pointer transition-all duration-700 transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative overflow-hidden rounded-xl shadow-2xl hover:shadow-primary/30 transition-all duration-500 border border-primary/10 hover:border-primary/40 bg-gradient-to-br from-zinc-900 to-black">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) =>
                      (e.currentTarget.src = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`)
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-primary/90 rounded-full p-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Play className="w-10 h-10 text-black fill-current" />
                    </div>
                  </div>
                </div>

                <div className="p-6 relative">
                  <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                    {item.category}
                  </p>
                  <h3 className="text-foreground text-xl font-bold group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={ytSectionRef} className="mt-32">
          <div
            className={`text-center mb-12 transition-all duration-1000 transform ${
              ytVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white">
              YT Releases
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-4"></div>
            <p className="text-muted-foreground text-lg">
              Check out our latest releases on YouTube
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {youtubeVideos.map((video, index) => (
              <div
                key={video.id}
                className={`transition-all duration-700 transform ${
                  ytVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card
                  className="overflow-hidden cursor-pointer group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 border border-primary/10 hover:border-primary/30 bg-gradient-to-br from-zinc-900 to-black"
                  onClick={() => window.open(video.videoUrl, "_blank", "noopener,noreferrer")}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="bg-primary rounded-full p-5 transform group-hover:scale-110 transition-transform duration-300 shadow-xl">
                          <Play className="w-10 h-10 text-black fill-current" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {video.title}
                      </h4>
                      <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
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
        </div>

        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-5xl bg-gradient-to-br from-zinc-900 to-black border-primary/20">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-foreground">
                {selectedItem?.title}
              </DialogTitle>
              <DialogDescription className="text-primary text-sm uppercase tracking-wider font-semibold">
                {selectedItem?.category}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-2xl border border-primary/10">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedItem?.videoId}`}
                  title={selectedItem?.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">{selectedItem?.description}</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default PortfolioSection;
