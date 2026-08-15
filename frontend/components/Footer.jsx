"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-fuchsia-300/10 bg-[#0d0718]">

      {/* Glow */}
      <div className="absolute left-1/2 top-0 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">

          {/* Logo */}
          <div className="lg:col-span-2">

            <h2 className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent">
              Loviqa
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-gray-400">
              Find meaningful relationships through AI-powered
              matchmaking, interest clubs and authentic
              conversations.
            </p>

          </div>

          {/* Product */}

          <div>

            <h3 className="mb-5 text-lg font-semibold text-white">
              Product
            </h3>

            <div className="space-y-3">

              <Link href="#" className="block text-sm text-gray-400 hover:text-violet-400">
                AI Matching
              </Link>

              <Link href="#" className="block text-sm text-gray-400 hover:text-violet-400">
                Interest Clubs
              </Link>

              <Link href="#" className="block text-sm text-gray-400 hover:text-violet-400">
                Features
              </Link>

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="mb-5 text-lg font-semibold text-white">
              Company
            </h3>

            <div className="space-y-3">

              <Link href="#" className="block text-sm text-gray-400 hover:text-violet-400">
                About
              </Link>

              <Link href="#" className="block text-sm text-gray-400 hover:text-violet-400">
                Careers
              </Link>

              <Link href="#" className="block text-sm text-gray-400 hover:text-violet-400">
                Contact
              </Link>

            </div>

          </div>

          {/* Resources */}

          <div>

            <h3 className="mb-5 text-lg font-semibold text-white">
              Resources
            </h3>

            <div className="space-y-3">

              <Link href="#" className="block text-sm text-gray-400 hover:text-violet-400">
                Privacy Policy
              </Link>

              <Link href="#" className="block text-sm text-gray-400 hover:text-violet-400">
                Terms & Conditions
              </Link>

              <Link href="#" className="block text-sm text-gray-400 hover:text-violet-400">
                FAQ
              </Link>

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

          <p className="text-sm text-gray-500">
            © {currentYear}{" "}
            <span className="font-semibold text-white">
              Loviqa
            </span>
            . All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Made with ❤️ in India
          </p>

        </div>

      </div>

    </footer>
  );
}
