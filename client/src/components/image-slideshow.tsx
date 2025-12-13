import { useEffect, useState, useMemo } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

interface SlideImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface ImageSlideshowProps {
  images: SlideImage[];
  autoPlayInterval?: number;
  className?: string;
}

export function ImageSlideshow({ 
  images, 
  autoPlayInterval = 5000,
  className = "" 
}: ImageSlideshowProps) {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  
  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: autoPlayInterval,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    [autoPlayInterval]
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={`relative w-full ${className}`}>
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[autoplayPlugin]}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-lg">
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {(image.title || image.description) && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {image.title && (
                        <h3 className="text-2xl md:text-4xl font-bold mb-2 font-heading">
                          {image.title}
                        </h3>
                      )}
                      {image.description && (
                        <p className="text-base md:text-lg text-white/90 max-w-2xl">
                          {image.description}
                        </p>
                      )}
                    </motion.div>
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 md:left-4 bg-white/90 hover:bg-white text-slate-900 border-none shadow-lg" />
        <CarouselNext className="right-2 md:right-4 bg-white/90 hover:bg-white text-slate-900 border-none shadow-lg" />
        
        {/* Dots Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </Carousel>
    </div>
  );
}

