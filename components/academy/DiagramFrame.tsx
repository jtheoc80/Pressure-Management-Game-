"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { Expand, X, ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Zoom constraints for initial "smart fit"
const MIN_INITIAL_ZOOM = 1.6; // 160% minimum for readability
const MAX_INITIAL_ZOOM = 3.0; // 300% max to avoid absurd scaling
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 4.0;
const ZOOM_STEP = 0.25;

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
 * - Smart initial zoom: fits to viewport with minimum readability threshold
 * - Pan and zoom controls in modal (Fit, 100%, +/-, wheel zoom)
 * - Double-click toggles between Fit and 100%
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
  const [isZoomReady, setIsZoomReady] = useState(false); // Wait until we compute initial zoom
  
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lastClickTimeRef = useRef<number>(0);

  /**
   * Compute the "fit zoom" based on diagram natural size vs available viewport
   */
  const computeFitZoom = useCallback(() => {
    if (!containerRef.current || !contentRef.current) return 1;

    const container = containerRef.current;
    const content = contentRef.current;

    // Available space (minus padding)
    const availableWidth = container.clientWidth - 64; // 32px padding each side
    const availableHeight = container.clientHeight - 64;

    // Get content natural dimensions
    // Try SVG first, then img, then fallback to content bounds
    const svg = content.querySelector("svg");
    const img = content.querySelector("img");

    let naturalWidth = 0;
    let naturalHeight = 0;

    if (svg) {
      // SVG: prefer viewBox dimensions, then width/height attributes, then bounding box
      const viewBox = svg.getAttribute("viewBox");
      if (viewBox) {
        const parts = viewBox.split(/\s+|,/).map(Number);
        if (parts.length === 4) {
          naturalWidth = parts[2];
          naturalHeight = parts[3];
        }
      }
      if (!naturalWidth || !naturalHeight) {
        const svgWidth = svg.getAttribute("width");
        const svgHeight = svg.getAttribute("height");
        if (svgWidth && svgHeight) {
          naturalWidth = parseFloat(svgWidth);
          naturalHeight = parseFloat(svgHeight);
        }
      }
      if (!naturalWidth || !naturalHeight) {
        const bbox = svg.getBBox();
        naturalWidth = bbox.width || 800;
        naturalHeight = bbox.height || 600;
      }
    } else if (img) {
      naturalWidth = img.naturalWidth || 800;
      naturalHeight = img.naturalHeight || 600;
    } else {
      // Fallback: use content bounding rect
      const rect = content.getBoundingClientRect();
      naturalWidth = rect.width || 800;
      naturalHeight = rect.height || 600;
    }

    // Compute scale to fit
    const scaleX = availableWidth / naturalWidth;
    const scaleY = availableHeight / naturalHeight;
    const fitScale = Math.min(scaleX, scaleY);

    return fitScale;
  }, []);

  /**
   * Compute and set initial zoom when modal opens
   */
  const initializeZoom = useCallback(() => {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      const computed = computeFitZoom();
      
      // Clamp initial zoom: ensure readability but don't go crazy
      const initialZoom = Math.min(
        MAX_INITIAL_ZOOM,
        Math.max(MIN_INITIAL_ZOOM, computed)
      );
      
      setZoom(initialZoom);
      setIsZoomReady(true);
    });
  }, [computeFitZoom]);

  // Handler to close modal and reset zoom
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setZoom(1);
    setIsZoomReady(false);
  }, []);

  // Initialize zoom when modal opens
  useEffect(() => {
    if (isModalOpen && !isZoomReady) {
      // Small delay to ensure modal is rendered
      const timer = setTimeout(initializeZoom, 50);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen, isZoomReady, initializeZoom]);

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
    setZoom((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoom(1);
  }, []);

  const handleFitZoom = useCallback(() => {
    const computed = computeFitZoom();
    // For Fit button, use actual fit (not clamped to min)
    setZoom(Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, computed)));
  }, [computeFitZoom]);

  /**
   * Handle double-click to toggle between Fit and 100%
   */
  const handleDoubleClick = useCallback(() => {
    const computed = computeFitZoom();
    const currentFit = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, computed));
    
    // If close to 100%, go to fit; otherwise go to 100%
    if (Math.abs(zoom - 1) < 0.1) {
      setZoom(currentFit);
    } else {
      setZoom(1);
    }
  }, [zoom, computeFitZoom]);

  /**
   * Handle click with double-click detection
   */
  const handleContentClick = useCallback(() => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTimeRef.current;
    
    if (timeSinceLastClick < 300) {
      handleDoubleClick();
    }
    
    lastClickTimeRef.current = now;
  }, [handleDoubleClick]);

  /**
   * Handle mouse wheel zoom
   */
  const handleWheel = useCallback((e: React.WheelEvent) => {
    // Zoom on wheel (no modifier required for better UX, but respect Ctrl for precision)
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    const multiplier = e.ctrlKey ? 0.5 : 1; // Finer control with Ctrl
    
    setZoom((prev) => {
      const newZoom = prev + delta * multiplier;
      return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, newZoom));
    });
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

          {/* Modal Content - Near full-screen for maximum diagram space */}
          <div className="relative z-10 w-[96vw] h-[92vh] max-w-none flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50 shrink-0">
              <div className="flex items-center gap-4">
                {title && (
                  <h2 className="text-lg font-semibold text-slate-800">
                    {title}
                  </h2>
                )}
                {/* Zoom hint */}
                <span className="text-xs text-slate-400 hidden sm:inline">
                  Double-click to toggle Fit/100% • Scroll to zoom
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <div className="flex items-center gap-1 mr-2 sm:mr-4 bg-white rounded-lg border border-slate-200 p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomOut}
                    disabled={zoom <= MIN_ZOOM}
                    className="h-8 w-8 p-0"
                    title="Zoom out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium text-slate-600 min-w-[3.5rem] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomIn}
                    disabled={zoom >= MAX_ZOOM}
                    className="h-8 w-8 p-0"
                    title="Zoom in"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <div className="w-px h-6 bg-slate-200 mx-1" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleFitZoom}
                    className="h-8 px-2 text-xs"
                    title="Fit to viewport"
                  >
                    <Maximize2 className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">Fit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResetZoom}
                    className="h-8 px-2 text-xs"
                    title="Reset to 100%"
                  >
                    <RotateCcw className="w-4 h-4 sm:mr-1" />
                    <span className="hidden sm:inline">100%</span>
                  </Button>
                </div>

                {/* Close Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={closeModal}
                  className="gap-1 sm:gap-2"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Close</span>
                </Button>
              </div>
            </div>

            {/* Modal Body - Scrollable Diagram with wheel zoom */}
            <div
              ref={containerRef}
              className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-white cursor-grab active:cursor-grabbing"
              onWheel={handleWheel}
            >
              <div
                className={cn(
                  "min-h-full flex items-center justify-center p-8",
                  !isZoomReady && "opacity-0" // Hide until zoom is computed
                )}
                style={{
                  minWidth: zoom > 1 ? `${100 * zoom}%` : "100%",
                  minHeight: zoom > 1 ? `${100 * zoom}%` : "100%",
                }}
                onClick={handleContentClick}
              >
                <div
                  ref={contentRef}
                  className="diagram-modal-content [&>svg]:block [&>svg]:max-w-none [&>div>svg]:block [&>div>svg]:max-w-none transition-transform duration-150"
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
              <div className="px-4 py-2 border-t border-slate-200 bg-slate-50 shrink-0">
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
