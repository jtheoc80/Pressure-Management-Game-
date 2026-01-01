"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GalleryImage } from "@/lib/academy/types";

interface ImageGalleryProps {
  images: GalleryImage[];
}

// Thumbnail component with error handling
function GalleryThumbnail({ 
  image, 
  onClick 
}: { 
  image: GalleryImage; 
  onClick: () => void;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <button
      onClick={onClick}
      className="relative aspect-video overflow-hidden rounded-lg border border-gray-200 hover:border-[#003366] transition-colors group bg-gray-100"
    >
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-2">
            <ImageIcon className="w-8 h-8 text-gray-300 mx-auto" />
            <p className="text-gray-400 text-xs mt-1">Photo coming soon</p>
          </div>
        </div>
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
          onError={() => setHasError(true)}
        />
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
        <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      {image.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
          <p className="text-white text-xs truncate">{image.caption}</p>
        </div>
      )}
    </button>
  );
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [lightboxError, setLightboxError] = useState(false);

  const handlePrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
      setLightboxError(false);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
      setLightboxError(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedIndex === null) return;
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") setSelectedIndex(null);
  };

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <GalleryThumbnail
            key={index}
            image={image}
            onClick={() => {
              setSelectedIndex(index);
              setLightboxError(false);
            }}
          />
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setSelectedIndex(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-4 text-white hover:bg-white/10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <div
            className="relative max-w-4xl max-h-[80vh] w-full mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxError ? (
              <div className="bg-gray-800 rounded-lg p-12 text-center">
                <ImageIcon className="w-24 h-24 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">{images[selectedIndex].alt}</p>
                <p className="text-gray-500 text-sm mt-2">Training photo coming soon</p>
              </div>
            ) : (
              <Image
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                width={1200}
                height={800}
                className="object-contain w-full h-auto max-h-[70vh]"
                onError={() => setLightboxError(true)}
              />
            )}
            <div className="text-center mt-4">
              {images[selectedIndex].caption && (
                <p className="text-white text-lg">{images[selectedIndex].caption}</p>
              )}
              {images[selectedIndex].credit && (
                <p className="text-gray-400 text-sm mt-1">{images[selectedIndex].credit}</p>
              )}
              <p className="text-gray-500 text-sm mt-2">
                {selectedIndex + 1} of {images.length}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 text-white hover:bg-white/10"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </div>
      )}
    </>
  );
}
