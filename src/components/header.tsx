"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone, Mail, ArrowRight, ChevronDown } from "lucide-react";
import { site } from "@/data/site";
import { megaMenu } from "@/data/categories";
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

  return (
    <header className="sticky top-0 z-50">
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
              className="rounded-md border border-slate-200 p-2 text-[#002f49] transition hover:bg-slate-100 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* mobile menu */}
        <div className={cn("border-b border-slate-200 bg-white lg:hidden", open ? "block" : "hidden")}>
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
              className="flex items-center justify-between rounded-md px-2 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Products
              <ChevronDown className={cn("h-4 w-4 transition", mobileProducts && "rotate-180")} />
            </button>
            {mobileProducts && (
              <div className="mb-2 ml-2 border-l-2 border-[#ff8d0a] pl-3">
                <Link
                  href="/products/"
                  onClick={() => setOpen(false)}
                  className="block py-1.5 text-sm font-bold text-[#002f49]"
                >
                  All products
                </Link>
                {megaMenu.map((g) => (
                  <Link
                    key={g.key}
                    href={g.path ? `/${g.path}/` : "/products/"}
                    onClick={() => setOpen(false)}
                    className="block py-1.5 text-sm font-semibold text-[#c4620a]"
                  >
                    {g.name}
                  </Link>
                ))}
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

      {/* navy nav bar with Products mega menu */}
      <div className="hidden bg-[#002f49] lg:block">
        <div className="container-x flex items-center justify-between">
          <nav className="flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:text-[#ffb347]"
            >
              Home
            </Link>
            <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
              <Link
                href="/products/"
                aria-expanded={productsOpen}
                className="flex items-center gap-1 px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:text-[#ffb347]"
              >
                Products
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", productsOpen && "rotate-180")} />
              </Link>

              {productsOpen && (
                <div className="absolute left-0 top-full w-max border-b-4 border-[#ff8d0a] bg-white shadow-[0_24px_48px_-20px_rgba(0,20,33,0.45)]">
                  <div className="grid grid-cols-5 gap-x-6 gap-y-5 px-7 py-6">
                    {megaMenu.map((group) => (
                      <div key={group.key} className="min-w-[12.5rem]">
                        <Link
                          href={group.path ? `/${group.path}/` : "/products/"}
                          onClick={() => setProductsOpen(false)}
                          className="block border-b border-slate-200 pb-2 text-[13px] font-extrabold uppercase tracking-wide text-[#002f49] transition hover:text-[#c4620a]"
                        >
                          {group.name}
                        </Link>
                        <ul className="mt-2 space-y-1.5">
                          {group.links.map(([label, path]) => (
                            <li key={path}>
                              <Link
                                href={`/${path}/`}
                                onClick={() => setProductsOpen(false)}
                                className="text-[13px] text-slate-600 transition hover:text-[#c4620a]"
                              >
                                {label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200 bg-[#f6f3ee] px-7 py-3">
                    <span className="text-xs font-semibold text-slate-500">
                      Supplied, installed & serviced across India
                    </span>
                    <Link
                      href="/products/"
                      onClick={() => setProductsOpen(false)}
                      className="flex items-center gap-1.5 text-xs font-bold text-[#a35a00] hover:underline"
                    >
                      Browse all products <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:text-[#ffb347]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
            Analytical instruments · Manufacturing & Distribution
          </span>
        </div>
      </div>
    </header>
  );
}