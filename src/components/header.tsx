"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, Mail, ArrowRight, ChevronDown } from "lucide-react";
import { site } from "@/data/site";
import { authenticMegaMenu } from "@/data/categories";
import { cn, withBasePath } from "@/lib/utils";

const nav = [
  { href: "/about-us/", label: "About" },
  { href: "/news/", label: "News" },
  { href: "/contact-us/", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState<string | null>("analytical-instruments");
  const [activeTabId, setActiveTabId] = useState<string>("analytical-instruments");

  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const activeTab =
    authenticMegaMenu.find((t) => t.id === activeTabId) || authenticMegaMenu[0];

  const openMegaMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setProductsOpen(true);
  };

  const scheduleCloseMegaMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setProductsOpen(false);
    }, 200);
  };

  const closeMegaMenuImmediately = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setProductsOpen(false);
  };

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setProductsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-50">
      {/* top bar */}
      <div className="hidden bg-[#001c2c] text-slate-300 md:block">
        <div className="container-x flex items-center justify-between py-1.5 text-xs">
          <div className="flex items-center gap-5">
            <a
              href={`tel:${site.phones.office.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-1.5 transition hover:text-white"
            >
              <Phone className="h-3.5 w-3.5 text-[#ffb347]" /> {site.phones.office}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 transition hover:text-white">
              <Mail className="h-3.5 w-3.5 text-[#ffb347]" /> {site.email}
            </a>
          </div>
          <p className="text-slate-400">Mon–Fri 9:30 AM – 5:30 PM · Sat 9:30 AM – 1:00 PM</p>
        </div>
      </div>

      {/* logo row */}
      <div className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="container-x flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={withBasePath("/logo-orbit.png")}
              alt="Orbit"
              width={132}
              height={94}
              className="h-12 w-auto"
              priority
            />
            <span className="hidden leading-none sm:block">
              <span className="block text-sm font-extrabold tracking-tight text-[#002f49]">
                Orbit Technologies Pvt. Ltd.
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                ISO 9001:2015 Certified
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/contact-us#quote" className="btn btn-accent hidden sm:inline-flex">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="rounded-md border border-slate-200 p-2 text-[#002f49] transition hover:bg-slate-100 sm:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* mobile menu drawer */}
        <div className={cn("border-b border-slate-200 bg-white sm:hidden", open ? "block" : "hidden")}>
          <nav className="container-x flex flex-col py-2">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Home
            </Link>
            <button
              type="button"
              onClick={() => setMobileProducts((v) => !v)}
              className="flex items-center justify-between rounded-md px-2 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 cursor-pointer"
            >
              <span>Products (8 Divisions)</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", mobileProducts && "rotate-180")} />
            </button>
            {mobileProducts && (
              <div className="mb-2 ml-2 border-l-2 border-[#b91c1c] pl-3 py-2 space-y-3">
                <Link
                  href="/products/"
                  onClick={() => setOpen(false)}
                  className="block text-xs font-bold text-[#b91c1c] uppercase tracking-wide hover:underline"
                >
                  Browse All 50+ Instruments &rarr;
                </Link>
                {authenticMegaMenu.map((tab) => {
                  const isExpanded = mobileActiveTab === tab.id;
                  return (
                    <div key={tab.id} className="border-b border-slate-100 pb-2 last:border-b-0">
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/${tab.path}/`}
                          onClick={() => setOpen(false)}
                          className="block text-xs font-bold text-[#002f49] hover:text-[#b91c1c]"
                        >
                          {tab.title}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileActiveTab(isExpanded ? null : tab.id)}
                          className="p-1 text-slate-400 hover:text-slate-700"
                          aria-label={`Toggle ${tab.title}`}
                        >
                          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", isExpanded && "rotate-180")} />
                        </button>
                      </div>
                      {isExpanded && (
                        <div className="mt-2 ml-2 border-l border-slate-200 pl-2 space-y-2">
                          {tab.columns.flat().map((sec) => (
                            <div key={sec.title} className="space-y-1">
                              <Link
                                href={`/${sec.path}/`}
                                onClick={() => setOpen(false)}
                                className="text-xs font-bold text-[#b91c1c] block"
                              >
                                {sec.title}
                              </Link>
                              {sec.items.length > 0 && (
                                <ul className="ml-1 space-y-0.5">
                                  {sec.items.map((item) => (
                                    <li key={item.label}>
                                      <Link
                                        href={`/${item.path}/`}
                                        onClick={() => setOpen(false)}
                                        className="text-[11px] text-slate-600 hover:text-[#b91c1c] block py-0.5"
                                      >
                                        {item.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact-us#quote" onClick={() => setOpen(false)} className="btn btn-accent my-2">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </div>

      {/* navy nav bar with Products mega menu (Visible on sm: and up) */}
      <div className="relative hidden bg-[#002f49] sm:block">
        <div className="container-x flex items-center justify-between">
          <nav className="flex items-center gap-1">
            <Link
              href="/"
              onMouseEnter={closeMegaMenuImmediately}
              className="px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:text-[#ffb347]"
            >
              Home
            </Link>
            <div
              className="relative"
              onMouseEnter={openMegaMenu}
              onMouseLeave={scheduleCloseMegaMenu}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setProductsOpen((v) => !v);
                }}
                aria-expanded={productsOpen}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] transition rounded-t-sm cursor-pointer select-none",
                  productsOpen
                    ? "bg-white text-[#002f49]"
                    : "text-white hover:text-[#ffb347]"
                )}
              >
                <span>Products</span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform",
                    productsOpen && "rotate-180 text-[#b91c1c]"
                  )}
                />
              </button>
            </div>

            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={closeMegaMenuImmediately}
                className="px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:text-[#ffb347]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <span className="hidden lg:inline text-xs font-semibold uppercase tracking-[0.1em] text-slate-300">
            Analytical instruments · Manufacturing &amp; Distribution
          </span>
        </div>

        {/* Full-width Authentic Two-Panel Mega Menu Dropdown */}
        <div
          role="region"
          aria-label="Products Navigation Menu"
          aria-hidden={!productsOpen}
          className={cn(
            "absolute left-0 right-0 top-full z-50 transition-all duration-150 ease-out",
            "before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']",
            productsOpen
              ? "opacity-100 visible translate-y-0 pointer-events-auto"
              : "opacity-0 invisible -translate-y-1 pointer-events-none"
          )}
          onMouseEnter={openMegaMenu}
          onMouseLeave={scheduleCloseMegaMenu}
        >
          <div className="container-x">
            <div className="overflow-hidden rounded-b-2xl border border-slate-200 bg-white shadow-[0_30px_70px_-15px_rgba(0,30,55,0.45)]">
              {/* Split Layout: Left Tabs Column + Right Content Area */}
              <div className="flex min-h-[460px]">
                {/* Left Column: 8 Divisions Tabs */}
                <div className="w-80 shrink-0 border-r border-slate-200 bg-[#efebe4]/80">
                  <ul className="flex flex-col py-1">
                    {authenticMegaMenu.map((tab) => {
                      const isActive = tab.id === activeTab.id;
                      return (
                        <li key={tab.id}>
                          <Link
                            href={`/${tab.path}/`}
                            onMouseEnter={() => setActiveTabId(tab.id)}
                            onClick={() => setProductsOpen(false)}
                            className={cn(
                              "flex items-center justify-between px-4 py-3.5 text-xs font-semibold transition-all border-b border-slate-200/70",
                              isActive
                                ? "bg-[#002f49] text-white font-bold border-r-[5px] border-r-[#b91c1c] shadow-xs"
                                : "text-slate-800 hover:bg-[#e4ded5]"
                            )}
                          >
                            <span className="leading-snug">{tab.title}</span>
                            <ArrowRight
                              className={cn(
                                "h-3.5 w-3.5 shrink-0 transition-opacity",
                                isActive ? "opacity-100 text-[#ffb347]" : "opacity-0"
                              )}
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Right Panel: Subcategory Columns for Active Tab */}
                <div className="flex-1 bg-white p-6 lg:p-8 flex flex-col justify-between">
                  <div>
                    {/* Active Tab Title & Direct Category Page Link */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-6">
                      <h2 className="text-base font-black text-[#002f49] tracking-tight">
                        {activeTab.title}
                      </h2>
                      <Link
                        href={`/${activeTab.path}/`}
                        onClick={() => setProductsOpen(false)}
                        className="text-xs font-bold text-[#b91c1c] hover:underline inline-flex items-center gap-1"
                      >
                        Explore Category Page <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                      {activeTab.columns.map((col, colIdx) => (
                        <div key={colIdx} className="space-y-6">
                          {col.map((sec) => (
                            <div key={sec.title}>
                              <Link
                                href={`/${sec.path}/`}
                                onClick={() => setProductsOpen(false)}
                                className="block font-bold text-sm text-[#b91c1c] hover:underline mb-2 transition-colors"
                              >
                                {sec.title}
                              </Link>
                              {sec.items.length > 0 && (
                                <ul className="space-y-1.5">
                                  {sec.items.map((item) => (
                                    <li key={item.label}>
                                      <Link
                                        href={`/${item.path}/`}
                                        onClick={() => setProductsOpen(false)}
                                        className="text-xs text-slate-700 hover:text-[#b91c1c] hover:underline block py-0.5 leading-snug transition-colors"
                                      >
                                        {item.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {sec.viewAllPath && (
                                <Link
                                  href={`/${sec.viewAllPath}/`}
                                  onClick={() => setProductsOpen(false)}
                                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#b91c1c] hover:underline uppercase tracking-wide"
                                >
                                  VIEW ALL &gt;
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Optional Featured Preview Thumbnail Images for active tab */}
                  {activeTab.images && activeTab.images.length > 0 && (
                    <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-6">
                      {activeTab.images.map((img) => (
                        <div
                          key={img.src}
                          className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/80 p-2.5 shadow-xs"
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            width={110}
                            height={80}
                            className="h-14 w-auto object-contain rounded"
                          />
                          {img.label && (
                            <span className="text-xs font-semibold text-slate-700">
                              {img.label}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Assurance Bar */}
              <div className="flex flex-wrap items-center justify-between border-t border-slate-200 bg-[#f8fafc] px-7 py-3 text-xs">
                <div className="flex items-center gap-4 text-slate-600">
                  <span className="font-bold text-[#002f49]">Orbit Technologies Pvt. Ltd.</span>
                  <span className="text-slate-300">·</span>
                  <span>35+ Years in India</span>
                  <span className="text-slate-300">·</span>
                  <span className="font-semibold text-emerald-700">ISO 9001:2015 Certified</span>
                </div>
                <div className="flex items-center gap-4 font-bold">
                  <Link
                    href="/products/"
                    onClick={() => setProductsOpen(false)}
                    className="flex items-center gap-1.5 text-xs text-[#002f49] hover:text-[#b91c1c]"
                  >
                    Browse All Instruments <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/contact-us#quote"
                    onClick={() => setProductsOpen(false)}
                    className="rounded-lg bg-[#b91c1c] px-3.5 py-1.5 text-xs text-white hover:bg-[#991b1b] transition-colors shadow-xs"
                  >
                    Request a Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}