import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getCategoryByPath } from "@/data/categories";
import type { Product } from "@/data/products";
import { InstrumentArt } from "@/components/instrument-art";

const PRODUCT_IMAGE_MAP: Record<string, string> = {
  "tga-3000": "/images/products/tga-3000.jpg",
  "orlab-tga-3000-thermogravimetric-analyzer": "/images/products/tga-3000.jpg",
  "parr-6400-automatic-isoperibol-calorimeter": "/images/products/calorimeter-hero.jpg",
  "parr-6200-isoperibol-calorimeter": "/images/products/calorimeter-7200.jpg",
  "parr-6100-compensated-jacket-calorimeter": "/images/products/calorimeter-7400.jpg",
  "sylab-ecs-8024-carbon-sulfur-analyzer": "/images/products/ecs-8024.jpg",
  "ecs-8024": "/images/products/ecs-8024.jpg",
  "ofcu": "/images/products/ofcu.jpg",
  "orlab-ofcu-ash-fusion-analyzer": "/images/products/ofcu.jpg",
  "ad-apollo-gx-ae-wp-gf-a-wp-series": "/images/products/ad-fortis.jpg",
};

export function ProductCard({ product }: { product: Product }) {
  const category = getCategoryByPath(product.category);
  const mappedImage = PRODUCT_IMAGE_MAP[product.slug];

  return (
    <Link
      href={`/products/${product.slug}/`}
      className="group flex flex-col rounded-xl border border-slate-200/90 bg-white shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md overflow-hidden"
    >
      <div className="relative aspect-4/3 w-full border-b border-slate-100 bg-[#f9fafb] p-3 flex items-center justify-center overflow-hidden">
        {mappedImage ? (
          <div className="relative h-full w-full">
            <Image
              src={mappedImage}
              alt={product.name}
              fill
              className="object-contain transition duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        ) : (
          <InstrumentArt
            seed={product.slug}
            view={0}
            className="w-full transition duration-300 group-hover:scale-[1.02]"
          />
        )}
        {product.brand && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#002f49] ring-1 ring-slate-200/80 shadow-xs">
            {product.brand}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        {category && (
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#c4620a]">
            {category.name}
          </p>
        )}
        <h3 className="mt-1 text-sm sm:text-base font-bold leading-snug text-[#002f49] group-hover:text-[#c4620a] transition-colors">
          {product.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-xs sm:text-sm leading-relaxed text-slate-600">
          {product.tagline}
        </p>
        <span className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-[#002f49]">
          <span>View details</span>
          <ArrowRight className="h-3.5 w-3.5 text-[#c4620a] transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
