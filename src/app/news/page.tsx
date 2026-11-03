import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { latestNews, events } from "@/data/news";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "Latest product news from Orbit Technologies and the exhibitions and trade shows where you can meet our team.",
};

export default function NewsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Newsroom"
        title="News & Events"
        subtitle="New products, catalogue updates and the trade shows where you can meet the Orbit team."
      />

      <section className="container-x mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        {/* latest news */}
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-[#002f49] sm:text-2xl">
            Latest news
          </h2>
          <ul className="mt-5 space-y-4">
            {latestNews.map((n) => (
              <li key={n.title} className="surface flex items-start gap-5 p-5">
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-[#fdeedd] text-[#c4620a]">
                  <span className="text-[10px] font-bold uppercase leading-none">
                    {n.date.split(" ")[0]}
                  </span>
                  <span className="text-lg font-black leading-tight">
                    {n.date.split(" ")[1]}
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="chip chip-accent">{n.category}</span>
                  <h3 className="mt-2 font-bold text-[#002f49]">{n.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{n.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="surface mt-6 flex flex-wrap items-center justify-between gap-4 bg-[#fdeedd] p-6">
            <div>
              <h3 className="font-bold text-[#002f49]">Want product updates?</h3>
              <p className="mt-1 text-sm text-slate-600">
                Subscribe to our newsletter or reach out for the latest catalogue.
              </p>
            </div>
            <Link href="/contact-us" className="btn btn-accent shrink-0">
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* events */}
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-[#002f49] sm:text-2xl">
            Exhibitions &amp; trade shows
          </h2>
          <ul className="mt-5 space-y-3">
            {events.map((e) => (
              <li key={e.show} className="surface p-5">
                <p className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <CalendarDays className="h-3.5 w-3.5 text-[#c4620a]" /> {e.date}
                </p>
                <h3 className="mt-2 font-bold text-[#002f49]">{e.show}</h3>
                <p className="mt-1 flex items-start gap-1.5 text-sm text-slate-600">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {e.location}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-500">{e.hall}</p>
              </li>
            ))}
          </ul>
          <div className="surface mt-6 p-5">
            <h3 className="font-bold text-[#002f49]">Meet us at a show</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              Catch live instrument demonstrations and speak with our application engineers
              at upcoming lab, mining and energy exhibitions across India and the Gulf.
            </p>
            <Link href="/contact-us" className="btn btn-outline mt-4 w-full">
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
