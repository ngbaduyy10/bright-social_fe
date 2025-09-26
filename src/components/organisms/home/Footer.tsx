"use client";
import Link from "next/link";

const products = [
  { label: "Social media analytics", href: "#" },
  { label: "Social media ads", href: "#" },
  { label: "Content creator tools", href: "#" },
  { label: "Influencer marketing platforms", href: "#" },
];

const resources = [
  { label: "Blog", href: "#" },
  { label: "How to engage users", href: "#" },
  { label: "Support center", href: "#" },
  { label: "Integrations", href: "#" },
];

const company = [
  { label: "About company", href: "#" },
  { label: "Contact us", href: "#" },
  { label: "Careers", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="page-container py-12">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">
                {/* Bright icon */}
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41L6.17 7.58c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41L5.99 4.58zm12.02 12.02c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.58 1.58c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.58-1.58zm1.58-10.61c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0L16.6 6.17c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.58-1.58zm-12.02 12.02c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0L4.58 18.01c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.58-1.58z"></path>{" "}
                </svg>
              </span>
              <span className="text-lg font-semibold text-slate-900">
                Bright
              </span>
            </div>

            <p className="mt-4 text-slate-500">
              Supercharge your social media growth with our powerful analytics
              and boosting tools
            </p>

            {/* Socials */}
            <div className="mt-5 flex items-center gap-4 text-slate-600">
              {/* YouTube */}
              <Link
                aria-label="YouTube"
                href="#"
                className="hover:text-slate-800 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23 12s0-3-.4-4.4a3 3 0 0 0-2.1-2.1C18.9 5 12 5 12 5s-6.9 0-8.5.5A3 3 0 0 0 1.4 7.6C1 9 1 12 1 12s0 3 .4 4.4a3 3 0 0 0 2.1 2.1C5.1 19 12 19 12 19s6.9 0 8.5-.5a3 3 0 0 0 2.1-2.1c.4-1.4.4-4.4.4-4.4ZM10 8.8 16 12l-6 3.2V8.8Z" />
                </svg>
              </Link>
              {/* X / Twitter */}
              {/* TikTok */}
              <Link
                aria-label="TikTok"
                href="#"
                className="hover:text-slate-800 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 3v12a3 3 0 1 1-3-3h1V8a7 7 0 1 0 7 7V9c1 .8 2.2 1.3 3.5 1.3V7.8c-1.4 0-2.6-.6-3.5-1.6A5.8 5.8 0 0 1 16 3h-4Z" />
                </svg>
              </Link>
              <Link
                aria-label="X"
                href="#"
                className="hover:text-slate-800 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3l-3.5 4.5L8 2H5l5 7-6 8h3l4-5.5 4 5.5h3l-5.5-7L18 2Z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <FooterCol title="Products" items={products} />
            <FooterCol title="Resource" items={resources} />
            <FooterCol title="Company" items={company} />
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-slate-200" />
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-slate-900 font-semibold mb-4">{title}</h4>
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it.label}>
            <Link
              href={it.href}
              className="text-slate-500 hover:text-slate-700 transition-colors"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
