import { useEffect, useState } from "react";

interface HeroSlideshowProps {
  images: string[];
  autoPlayInterval?: number;
  children: React.ReactNode;
}

export function HeroSlideshow({ 
  images, 
  autoPlayInterval = 6000,
  children
}: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));

  // Preload images
  useEffect(() => {
    if (!images || images.length === 0) return;

    // Preload first image immediately
    const preloadImage = (src: string, index: number) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages((prev) => new Set([...prev, index]));
      };
      img.src = src;
    };

    // Preload first image right away
    if (images[0]) {
      preloadImage(images[0], 0);
    }

    // Lazy load other images after a delay
    const lazyLoadTimer = setTimeout(() => {
      images.forEach((image, index) => {
        if (index > 0 && !loadedImages.has(index)) {
          preloadImage(image, index);
        }
      });
    }, 1000);

    return () => clearTimeout(lazyLoadTimer);
  }, [images]);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % images.length;
        // Preload next image when we're about to show it
        if (!loadedImages.has(next)) {
          const img = new Image();
          img.src = images[next];
          img.onload = () => {
            setLoadedImages((prev) => new Set([...prev, next]));
          };
        }
        return next;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [images, autoPlayInterval, loadedImages]);

  if (!images || images.length === 0) {
    return (
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-900/70" />
        <div className="absolute inset-0 z-10">{children}</div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      {images.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: loadedImages.has(index) ? `url(${image})` : 'none',
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: currentIndex === index && loadedImages.has(index) ? 1 : 0,
            zIndex: currentIndex === index ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-slate-900/70 z-[2]" />
      <div className="absolute inset-0 z-[3]">{children}</div>
    </div>
  );
}

