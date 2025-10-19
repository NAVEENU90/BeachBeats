import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  publishedAt: string;
}

// Sample Beach Beats videos - Replace with actual video IDs
const youtubeVideos: YouTubeVideo[] = [
  {
    id: "1",
    title: "Beach Beats Mix #1 - Sunset Vibes",
    thumbnail: "https://i.ytimg.com/vi/y9EHk-tfQNo/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLD2eBfZYJVATjzmB9WDPy8oVidImA",
    videoUrl: "https://youtu.be/y9EHk-tfQNo?si=H-2iGaqJUmilqTSw",
    publishedAt: "2024-01-15"
  },
  {
    id: "2",
    title: "Beach Beats Mix #2 - Ocean Waves",
    thumbnail: "https://i.ytimg.com/vi/JZorUrZcPYQ/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBYqRyAXAgqnQ2Ei4yG6GL-Q5FRLA",
    videoUrl: "https://youtu.be/y9EHk-tfQNo?si=8e8iIm2nxnTQHIk0",
    publishedAt: "2024-02-20"
  },
  {
    id: "3",
    title: "Beach Beats Mix #3 - Summer Nights",
    thumbnail: "https://i.ytimg.com/vi/jDTa81N5-pM/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC7YpZHTNtyHPHwdup3wfTd5zMIdw",
    videoUrl: "https://youtu.be/jDTa81N5-pM?si=N8EVJpWYdM4SxuYL",
    publishedAt: "2024-03-10"
  },
  {
    id: "4",
    title: "Beach Beats Mix #4 - Tropical Paradise",
    thumbnail: "https://i.ytimg.com/vi/FEJdoIMc4xg/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCHM0rdMp7xjwr_YFyRDzkPIBW-NA",
    videoUrl: "https://youtu.be/FEJdoIMc4xg?si=hbAQVfAMwWP_bR23",
    publishedAt: "2024-04-05"
  },
  {
    id: "5",
    title: "Beach Beats Mix #5 - Chill Sessions",
    thumbnail: "https://i.ytimg.com/vi/UUyGd71kSak/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-BIAC4AOKAgwIABABGH8gPig0MA8=&rs=AOn4CLBOz7kKqgFN19oD0yYjWJpf7tXA8w",
    videoUrl: "https://youtu.be/UUyGd71kSak?si=qak12c6rljWWclSo",
    publishedAt: "2024-05-12"
  },
  {
    id: "6",
    title: "Beach Beats Mix #6 - Golden Hour",
    thumbnail: "https://i.ytimg.com/vi/LyUiwuta1ws/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AHUBoACrAOKAgwIABABGGUgVihEMA8=&rs=AOn4CLDTvublyEuBLdFX55eHk-FAEATmnA",
    videoUrl: "https://youtu.be/LyUiwuta1ws?si=YsxIj0Q6BLSZOlsW",
    publishedAt: "2024-06-18"
  }
];

const YouTubeSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const handleVideoClick = (videoUrl: string) => {
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      ref={sectionRef}
      id="youtube"
      className="py-20 px-4 md:px-8 bg-black-soft"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Latest Releases
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check out our latest Beach Beats mixes on YouTube
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {youtubeVideos.map((video, index) => (
            <div
              key={video.id}
              className={`transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card
                className="overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => handleVideoClick(video.videoUrl)}
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
                    <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(video.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.youtube.com/@BEACHBEATSENTERTAINMENTS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline font-semibold text-lg"
          >
            Click to visit our YouTube Channel
            <Play className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;
