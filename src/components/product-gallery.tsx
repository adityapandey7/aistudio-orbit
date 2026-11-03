"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  CheckCircle2,
  Share2,
  Copy,
  Mail,
  MessageCircle,
  Maximize2,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import { InstrumentArt, type ArtView } from "@/components/instrument-art";
import { PRODUCT_IMAGE_MAP } from "@/data/product-media";
import type { Product } from "@/data/products";

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [activeThumb, setActiveThumb] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [zoomOpen, setZoomOpen] = useState<boolean>(false);

  const realImages = PRODUCT_IMAGE_MAP[product.slug] || [];
  const hasRealPhoto = realImages.length > 0;
  const totalViews = 4;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveThumb((prev) => (prev > 0 ? prev - 1 : totalViews - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveThumb((prev) => (prev < totalViews - 1 ? prev + 1 : 0));
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareTitle = `${product.name} | Orbit Technologies`;
  const shareBody = `Check out this instrument specification from Orbit Technologies: ${product.name} (${product.tagline})`;

  return (
    <div className="flex flex-col">
      {/* Main Viewport Card */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-[#f8fafc] shadow-xs">
        {/* Top Status Tag */}
        <div className="absolute left-3.5 top-3.5 z-10 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {product.brand?.includes("Parr")
              ? "Official Parr #1 Partner"
              : product.brand?.includes("Sylab")
              ? "Sylab Manufacturing Group"
              : "Certified Laboratory Instrument"}
          </span>
          {product.origin && (
            <span className="inline-flex items-center rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#002f49] shadow-xs ring-1 ring-slate-200">
              Origin: {product.origin}
            </span>
          )}
        </div>

        {/* View Mode Indicator / Zoom Toggle (Right) */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setZoomOpen(!zoomOpen);
          }}
          className="cursor-pointer absolute right-3.5 top-3.5 z-10 rounded-lg bg-white/95 p-2 text-slate-600 shadow-xs hover:bg-white hover:text-[#002f49] transition-all"
          title="Toggle view focus"
          aria-label="Expand image view"
        >
          <Maximize2 className="h-4 w-4" />
        </button>

        {/* Navigation Arrow Left */}
        <button
          type="button"
          onClick={handlePrev}
          className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md text-slate-700 hover:bg-white hover:text-[#002f49] transition-all"
          aria-label="Previous view"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          type="button"
          onClick={handleNext}
          className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md text-slate-700 hover:bg-white hover:text-[#002f49] transition-all"
          aria-label="Next view"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Main Display Area */}
        <div
          className={`relative flex items-center justify-center p-6 transition-all duration-300 ${
            zoomOpen ? "min-h-[460px]" : "min-h-[380px] sm:min-h-[420px]"
          }`}
        >
          {activeThumb === 0 && hasRealPhoto ? (
            <div className="relative h-[340px] sm:h-[380px] w-full">
              <Image
                src={realImages[0]}
                alt={product.name}
                fill
                priority
                referrerPolicy="no-referrer"
                className="object-contain transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ) : activeThumb === 3 && realImages.length > 1 ? (
            <div className="relative h-[340px] sm:h-[380px] w-full">
              <Image
                src={realImages[1]}
                alt={`${product.name} detail view`}
                fill
                referrerPolicy="no-referrer"
                className="object-contain transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ) : (
            <div className="w-full">
              <InstrumentArt
                seed={product.slug}
                view={(activeThumb === 1 ? 1 : activeThumb === 2 ? 2 : 0) as ArtView}
                className="w-full transition-transform duration-300 hover:scale-[1.02]"
                label={
                  activeThumb === 1
                    ? "Control Console & Data Acquisition View"
                    : activeThumb === 2
                    ? "Combustion Vessel & Reactor Core Assembly"
                    : "Technical CAD System Overview"
                }
              />
            </div>
          )}

          {/* Overlay View Label */}
          <div className="pointer-events-none absolute bottom-3 left-3.5 rounded-md bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-xs ring-1 ring-slate-200/80">
            {activeThumb === 0 && hasRealPhoto
              ? "Standard Laboratory Profile (Photo 1)"
              : activeThumb === 1
              ? "Touchscreen Console & Electronics Schematic"
              : activeThumb === 2
              ? "Vessel & Core Assembly Schematic"
              : hasRealPhoto && realImages.length > 1
              ? "Secondary System Angle (Photo 2)"
              : "Technical Engineering CAD Overview"}
          </div>

          {/* Counter Badge */}
          <div className="pointer-events-none absolute bottom-3 right-3.5 rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold text-white">
            {activeThumb + 1} / {totalViews}
          </div>
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="mt-3.5 grid grid-cols-4 gap-2.5">
        {/* Thumb 0: Primary System View */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setActiveThumb(0);
          }}
          className={`cursor-pointer relative aspect-4/3 overflow-hidden rounded-xl border bg-white p-1 text-left transition-all ${
            activeThumb === 0
              ? "border-[#c4620a] ring-2 ring-[#c4620a]/30 shadow-sm"
              : "border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100"
          }`}
          title="View 1: Main System Overview"
        >
          {hasRealPhoto ? (
            <div className="relative h-full w-full">
              <Image
                src={realImages[0]}
                alt="Main View Thumbnail"
                fill
                referrerPolicy="no-referrer"
                className="object-contain"
                sizes="120px"
              />
            </div>
          ) : (
            <InstrumentArt seed={product.slug} view={0} className="w-full" />
          )}
          <span className="pointer-events-none absolute bottom-1 left-1 rounded bg-slate-900/80 px-1 py-0.5 text-[9px] font-medium text-white">
            Overview
          </span>
        </button>

        {/* Thumb 1: Control Panel View */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setActiveThumb(1);
          }}
          className={`cursor-pointer relative aspect-4/3 overflow-hidden rounded-xl border bg-white p-1 text-left transition-all ${
            activeThumb === 1
              ? "border-[#c4620a] ring-2 ring-[#c4620a]/30 shadow-sm"
              : "border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100"
          }`}
          title="View 2: Control Interface & Electronics"
        >
          <InstrumentArt seed={product.slug} view={1} className="w-full" />
          <span className="pointer-events-none absolute bottom-1 left-1 rounded bg-slate-900/80 px-1 py-0.5 text-[9px] font-medium text-white">
            Interface
          </span>
        </button>

        {/* Thumb 2: Reactor / Vessel Core View */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setActiveThumb(2);
          }}
          className={`cursor-pointer relative aspect-4/3 overflow-hidden rounded-xl border bg-white p-1 text-left transition-all ${
            activeThumb === 2
              ? "border-[#c4620a] ring-2 ring-[#c4620a]/30 shadow-sm"
              : "border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100"
          }`}
          title="View 3: Vessel Assembly & Chamber"
        >
          <InstrumentArt seed={product.slug} view={2} className="w-full" />
          <span className="pointer-events-none absolute bottom-1 left-1 rounded bg-slate-900/80 px-1 py-0.5 text-[9px] font-medium text-white">
            Core Vessel
          </span>
        </button>

        {/* Thumb 3: Secondary View or CAD Layout */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setActiveThumb(3);
          }}
          className={`cursor-pointer relative aspect-4/3 overflow-hidden rounded-xl border bg-white p-1 text-left transition-all ${
            activeThumb === 3
              ? "border-[#c4620a] ring-2 ring-[#c4620a]/30 shadow-sm"
              : "border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100"
          }`}
          title="View 4: Technical Schematic / Secondary Angle"
        >
          {realImages.length > 1 ? (
            <div className="relative h-full w-full">
              <Image
                src={realImages[1]}
                alt="Secondary View Thumbnail"
                fill
                referrerPolicy="no-referrer"
                className="object-contain"
                sizes="120px"
              />
            </div>
          ) : (
            <InstrumentArt seed={product.slug} view={0} className="w-full" />
          )}
          <span className="pointer-events-none absolute bottom-1 left-1 rounded bg-slate-900/80 px-1 py-0.5 text-[9px] font-medium text-white">
            Schematic
          </span>
        </button>
      </div>

      {/* Trust & Compliance Features */}
      <div className="mt-5 grid grid-cols-3 gap-2 border-y border-slate-200/80 py-3.5 text-center">
        <div className="flex flex-col items-center">
          <ShieldCheck className="h-4 w-4 text-[#c4620a]" />
          <span className="mt-1 text-[11px] font-bold text-[#002f49]">
            CE & ISO Certified
          </span>
          <span className="text-[10px] text-slate-500">Global Standard</span>
        </div>
        <div className="flex flex-col items-center border-x border-slate-200/80 px-1">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span className="mt-1 text-[11px] font-bold text-[#002f49]">
            Pan-India Support
          </span>
          <span className="text-[10px] text-slate-500">Installation & Training</span>
        </div>
        <div className="flex flex-col items-center">
          <Eye className="h-4 w-4 text-[#002f49]" />
          <span className="mt-1 text-[11px] font-bold text-[#002f49]">
            OEM Spares Stocked
          </span>
          <span className="text-[10px] text-slate-500">Direct in Hyderabad</span>
        </div>
      </div>

      {/* Share Strip */}
      <div className="mt-3.5 flex items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 font-semibold text-slate-600">
          <Share2 className="h-3.5 w-3.5 text-slate-400" />
          <span>Share:</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyLink}
            className="cursor-pointer flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            title="Copy URL"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 text-slate-400" />
                <span>Copy Link</span>
              </>
            )}
          </button>
          <a
            href={`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareBody)}`}
            className="cursor-pointer flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50 hover:text-[#c4620a] transition-colors"
          >
            <Mail className="h-3 w-3 text-slate-500" /> Email
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${shareTitle} - ${shareBody}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
          >
            <MessageCircle className="h-3 w-3 text-emerald-600" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
