import Link from "next/link";
import { ArrowRight, Layers, Quote } from "lucide-react";
import { Breadcrumb, type Crumb } from "@/components/breadcrumb";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { CategorySeoSection } from "@/components/category-seo-section";
import {
  ancestorsOf,
  categories,
  childrenOf,
  getCategoryByPath,
  type Category,
} from "@/data/categories";
import { getCategoryHeroIntro } from "@/data/category-seo";
import { products, productsByCategory } from "@/data/products";
import { site } from "@/data/site";

const KIND_EYEBROW: Record<Category["kind"], string> = {
  pillar: "Product Range",
  section: "Category",
  subsection: "Sub-Category",
};

function childrenFor(category: Category): Category[] {
  if (category.kind === "pillar") {
    // Sections are parent: null in the registry — group them by pillar.
    return categories.filter(
      (c) =>
        c.kind === "section" &&
        c.pillar === category.pillar &&
        c.path !== category.path,
    );
  }
  return childrenOf(category.path);
}

function productsFor(category: Category) {
  if (category.kind === "pillar") {
    return products.filter(
      (p) => getCategoryByPath(p.category)?.pillar === category.pillar,
    );
  }
  return productsByCategory(category.path, { deep: true });
}

/** Breadcrumb: Home > ancestors > self (ancestorsOf includes self at depth 1). */
function crumbsFor(category: Category): Crumb[] {
  const ancestors = ancestorsOf(category.path)
    .filter((a) => a.path !== category.path)
    .map((a) => ({ label: a.name, href: `/${a.path}/` }));
  return [...ancestors, { label: category.name }];
}

export function CategoryView({ category }: { category: Category }) {
  const children = childrenFor(category);
  const items = productsFor(category);
  const heroIntro = getCategoryHeroIntro(category);

  return (
    <div>
      {/* 1. Breadcrumb + Hero with H1, 20-35 word introduction, and strictly NO CTA */}
      <Breadcrumb items={crumbsFor(category)} />
      <PageHero
        eyebrow={KIND_EYEBROW[category.kind]}
        title={category.name}
        subtitle={heroIntro}
      />

      {/* 2. Directly Below Hero: Show all products or subcategories (whatever applies) */}
      <div className="container-x mt-8 space-y-12">
        {/* Sub-categories grid (if applicable) */}
        {children.length > 0 && (
          <section aria-label={`Subcategories in ${category.name}`}>
            <SectionHeading
              eyebrow={category.kind === "pillar" ? "Product Lines" : "Sub-Categories"}
              title={
                category.kind === "pillar"
                  ? `Browse ${category.name} Categories`
                  : `Sub-Categories in ${category.name}`
              }
              subtitle="Select a category to explore specialized instrumentation and testing models."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {children.map((c) => {
                const count = productsFor(c).length;
                const subIntro = getCategoryHeroIntro(c);
                return (
                  <Link
                    key={c.path}
                    href={`/${c.path}/`}
                    className="surface surface-hover group flex flex-col p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold leading-snug text-[#002f49] group-hover:text-[#c4620a]">
                        {c.name}
                      </h3>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#c4620a] transition group-hover:translate-x-0.5" />
                    </div>
                    <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-600">
                      {subIntro}
                    </p>
                    <span className="mt-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      <Layers className="h-3.5 w-3.5" />
                      {count} {count === 1 ? "instrument model" : "instrument models"}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Products grid */}
        <section aria-label={`Products in ${category.name}`}>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow={`${items.length} ${items.length === 1 ? "Instrument" : "Instruments"} Available`}
              title={
                children.length > 0
                  ? `Featured Instruments in ${category.name}`
                  : `${category.name} Instruments`
              }
              subtitle="Supplied with installation, certified calibration, and nationwide warranty support."
            />
            <Link href="/contact-us#quote" className="btn btn-outline shrink-0">
              Request Technical Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {items.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <div className="surface flex flex-col items-start gap-3 p-8">
              <p className="font-bold text-[#002f49]">
                Specialized configurations available for {category.name}.
              </p>
              <p className="text-sm text-slate-600">
                Share your test method, sample matrix, or temperature/pressure parameters.
                Our application engineers will recommend the ideal configuration.
              </p>
              <Link href="/contact-us#quote" className="btn btn-accent">
                Consult an Application Engineer <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </section>
      </div>

      {/* 3. Comprehensive Domain-Specific SEO Content Section to rank this category / subcategory */}
      <CategorySeoSection category={category} products={items} />

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