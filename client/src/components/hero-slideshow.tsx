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

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [images, autoPlayInterval]);

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
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: currentIndex === index ? 1 : 0,
            zIndex: currentIndex === index ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-slate-900/70 z-[2]" />
      <div className="absolute inset-0 z-[3]">{children}</div>
    </div>
  );
}

