import Link from "next/link";
import { ArrowRight, Layers, Quote } from "lucide-react";
import { Breadcrumb, type Crumb } from "@/components/breadcrumb";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { CategorySeoSection } from "@/components/category-seo-section";
import {
  ancestorsOf,
  categories,
  getCategoryByPath,
  type Category,
} from "@/data/categories";
import { getCategoryHeroIntro } from "@/data/category-seo";
import { products, productsByCategory } from "@/data/products";
import { site } from "@/data/site";

function getSubcategories(category: Category): Category[] {
  // Direct children registered with this category as parent
  const direct = categories.filter((c) => c.parent === category.path);
  if (direct.length > 0) return direct;

  if (category.path === "analytical-instruments") {
    const order = [
      "calorimeter",
      "ash-fusion-analyzers",
      "tga-proximate-analyzers",
      "elemental-analyzers",
      "coal-and-coke-testing-instruments",
      "other-instruments",
    ];
    return order
      .map((p) => getCategoryByPath(p))
      .filter((c): c is Category => c !== null);
  }

  if (category.path === "crms-srms-laboratory-accessories") {
    const order = [
      "laboratory-accessories",
      "certified-and-standard-reference-materials",
    ];
    return order
      .map((p) => getCategoryByPath(p))
      .filter((c): c is Category => c !== null);
  }

  if (category.path === "furnace-heating-systems") {
    return categories.filter(
      (c) =>
        c.parent === null &&
        c.pillar === "furnaces" &&
        c.path !== "furnace-heating-systems",
    );
  }

  return [];
}

function getCategoryProducts(category: Category) {
  if (category.path === "denatec") {
    return products.filter((p) => p.category === "denatec");
  }
  if (category.path === "analytical-balances") {
    return products.filter((p) =>
      [
        "premium-level-micro-semi-micro",
        "micro-analytical",
        "semi-micro-analytical",
        "advanced-level-analytical",
        "standard-level-analytical",
      ].includes(p.category),
    );
  }
  return productsByCategory(category.path, { deep: true });
}

/** Breadcrumb: Home > ancestors > self */
function crumbsFor(category: Category): Crumb[] {
  const ancestors = ancestorsOf(category.path)
    .filter((a) => a.path !== category.path)
    .map((a) => ({ label: a.name, href: `/${a.path}/` }));
  return [...ancestors, { label: category.name }];
}

export function CategoryView({ category }: { category: Category }) {
  const children = getSubcategories(category);
  const allCategoryProducts = getCategoryProducts(category);
  const heroIntro = getCategoryHeroIntro(category);
  const hasChildren = children.length > 0;

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION: Breadcrumb, H1, 20-35 word introduction, strictly NO CTA and NO eyebrow */}
      <Breadcrumb items={crumbsFor(category)} />
      <PageHero
        title={category.name}
        subtitle={heroIntro}
      />

      {/* 2. DIRECTLY BELOW HERO: Show subcategory if present, otherwise show product */}
      <div className="container-x mt-8 space-y-12">
        {hasChildren ? (
          /* Subcategory Grid */
          <section aria-label={`Subcategories in ${category.name}`}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {children.map((c) => {
                const count = productsByCategory(c.path, { deep: true }).length;
                const subIntro = getCategoryHeroIntro(c);
                return (
                  <Link
                    key={c.path}
                    href={`/${c.path}/`}
                    className="surface surface-hover group flex flex-col p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-[#c4620a]/60 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-bold text-base leading-snug text-[#002f49] group-hover:text-[#c4620a] transition-colors">
                        {c.name}
                      </h2>
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-50 text-[#c4620a] group-hover:bg-[#c4620a] group-hover:text-white transition-colors">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="mt-2.5 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-600">
                      {subIntro}
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 font-semibold text-slate-500">
                        <Layers className="h-3.5 w-3.5 text-[#c4620a]" />
                        {count} {count === 1 ? "model" : "models"}
                      </span>
                      <span className="font-bold text-[#c4620a] group-hover:underline">
                        Explore &rarr;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : (
          /* Products Grid (when no subcategories are present) */
          <section aria-label={`Products in ${category.name}`}>
            {allCategoryProducts.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {allCategoryProducts.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center sm:p-12 shadow-xs">
                <h3 className="text-lg font-bold text-[#002f49]">
                  Specialized Configurations Available for {category.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
                  Share your test method, sample matrix, or temperature/pressure parameters.
                  Our application engineers will recommend the ideal certified configuration.
                </p>
                <Link href="/contact-us#quote" className="btn btn-accent mt-5">
                  Consult Application Engineering <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </section>
        )}
      </div>

      {/* 3. Domain-Specific Technical & Regulatory SEO Content Section */}
      <CategorySeoSection
        category={category}
        products={allCategoryProducts}
      />

      {/* 4. Quote and Support Banner */}
      <section className="quote-band relative overflow-hidden py-14 text-white">
        <div className="container-x relative text-center">
          <Quote className="mx-auto h-8 w-8 text-[#ffb347]" />
          <p className="mx-auto mt-5 max-w-3xl text-2xl font-black tracking-tight sm:text-3xl">
            Need Expert Selection Assistance for Your Laboratory?
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Orbit Technologies supports laboratories across India from instrument
            selection and purchase through installation, commissioning, operator training,
            and preventative maintenance.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact-us#quote" className="btn btn-accent">
              Request Configuration &amp; Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${site.phones.sales1.replace(/[^+\d]/g, "")}`}
              className="btn border border-white/25 bg-white/10 text-white hover:bg-white/20"
            >
              Call Technical Sales: {site.phones.sales1}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}