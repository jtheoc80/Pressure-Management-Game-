"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Expand, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DiagramFrameProps {
  /** Diagram title shown above the diagram */
  title?: string;
  /** Optional caption shown below the diagram */
  caption?: string;
  /** The diagram content (SVG component, img, etc.) */
  children: React.ReactNode;
  /** Additional CSS classes for the outer container */
  className?: string;
  /** Minimum width for the diagram canvas on mobile (enables horizontal scroll) */
  minCanvasWidth?: number;
  /** Minimum height for the diagram container */
  minHeight?: number;
  /** Whether to show the expand button */
  expandable?: boolean;
  /** Aspect ratio constraint (optional - if not set, uses auto height) */
  aspectRatio?: "16/9" | "4/3" | "3/2" | "auto";
}

/**
 * DiagramFrame - Enhanced container for diagrams with expand/modal functionality
 *
 * Features:
 * - Large, readable default sizing
 * - Responsive scaling with optional horizontal scroll on mobile
 * - "Expand" button opens fullscreen modal for detailed viewing
 * - Pan and zoom controls in modal
 * - Proper overflow handling to prevent layout issues
 */
export function DiagramFrame({
  title,
  caption,
  children,
  className,
  minCanvasWidth,
  minHeight = 400,
  expandable = true,
  aspectRatio = "auto",
}: DiagramFrameProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  // Handler to close modal and reset zoom
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setZoom(1);
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isModalOpen, closeModal]);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoom(1);
  }, []);

  const aspectClass = {
    "16/9": "aspect-[16/9]",
    "4/3": "aspect-[4/3]",
    "3/2": "aspect-[3/2]",
    auto: "",
  }[aspectRatio];

  return (
    <>
      {/* Main Diagram Container */}
      <div className={cn("w-full", className)}>
        {/* Title */}
        {title && (
          <h3 className="text-lg font-semibold text-slate-800 mb-3">{title}</h3>
        )}

        {/* Diagram Wrapper - Scrollable on mobile for wide diagrams */}
        <div
          className={cn(
            "relative w-full rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50",
            "overflow-hidden"
          )}
        >
          {/* Expand Button */}
          {expandable && (
            <button
              onClick={() => setIsModalOpen(true)}
              className={cn(
                "absolute top-3 right-3 z-10",
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                "bg-white/90 hover:bg-white border border-slate-200 shadow-sm",
                "text-sm font-medium text-slate-600 hover:text-slate-900",
                "transition-all duration-200 hover:shadow-md"
              )}
              title="Expand diagram"
            >
              <Expand className="w-4 h-4" />
              <span className="hidden sm:inline">Expand</span>
            </button>
          )}

          {/* Scrollable Inner Container */}
          <div
            className={cn(
              "w-full overflow-x-auto",
              aspectClass,
              !aspectClass && "min-h-[300px] md:min-h-[400px]"
            )}
            style={{
              minHeight: aspectClass ? undefined : minHeight,
            }}
          >
            <div
              className={cn(
                "flex items-center justify-center p-4 md:p-6",
                "min-h-full"
              )}
              style={{
                minWidth: minCanvasWidth ? `${minCanvasWidth}px` : undefined,
              }}
            >
              {/* Diagram Content with responsive SVG styling */}
              <div className="w-full h-full diagram-content [&>svg]:w-full [&>svg]:h-auto [&>svg]:max-h-full [&>svg]:block [&>div>svg]:w-full [&>div>svg]:h-auto [&>div>svg]:max-h-full [&>div>svg]:block">
                {children}
              </div>
            </div>
          </div>

          {/* Scroll indicator for mobile */}
          {minCanvasWidth && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 md:hidden">
              <span className="text-xs text-slate-400 bg-white/80 px-2 py-1 rounded-full">
                ← Scroll to see more →
              </span>
            </div>
          )}
        </div>

        {/* Caption */}
        {caption && (
          <p className="text-sm text-slate-500 text-center mt-3 italic">
            {caption}
          </p>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={title || "Diagram viewer"}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="relative z-10 w-[95vw] h-[95vh] max-w-[1800px] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-4">
                {title && (
                  <h2 className="text-lg font-semibold text-slate-800">
                    {title}
                  </h2>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <div className="flex items-center gap-1 mr-4 bg-white rounded-lg border border-slate-200 p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomOut}
                    disabled={zoom <= 0.5}
                    className="h-8 w-8 p-0"
                    title="Zoom out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium text-slate-600 min-w-[4rem] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomIn}
                    disabled={zoom >= 3}
                    className="h-8 w-8 p-0"
                    title="Zoom in"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResetZoom}
                    className="h-8 w-8 p-0"
                    title="Reset zoom"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>

                {/* Close Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={closeModal}
                  className="gap-2"
                >
                  <X className="w-4 h-4" />
                  Close
                </Button>
              </div>
            </div>

            {/* Modal Body - Scrollable Diagram */}
            <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-white">
              <div
                className="min-h-full flex items-center justify-center p-8"
                style={{
                  minWidth: zoom > 1 ? `${100 * zoom}%` : "100%",
                  minHeight: zoom > 1 ? `${100 * zoom}%` : "100%",
                }}
              >
                <div
                  className="diagram-modal-content [&>svg]:block [&>svg]:max-w-none [&>div>svg]:block [&>div>svg]:max-w-none transition-transform duration-200"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: "center center",
                  }}
                >
                  {children}
                </div>
              </div>
            </div>

            {/* Modal Footer with Caption */}
            {caption && (
              <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
                <p className="text-sm text-slate-600 text-center italic">
                  {caption}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default DiagramFrame;
