"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "How does AI matching work?",
    answer:
      "Our AI analyzes your interests, personality, hobbies and activities to recommend the most compatible people and communities.",
  },
  {
    question: "Is my personal data secure?",
    answer:
      "Yes. Your data is encrypted and protected using industry-standard security. Your privacy always comes first.",
  },
  {
    question: "Can I join multiple interest clubs?",
    answer:
      "Absolutely. You can join multiple clubs like Coding, Music, Travel, Gaming, Photography and many more.",
  },
  {
    question: "How are temporary chat rooms different?",
    answer:
      "Temporary rooms automatically expire after a specific time, encouraging meaningful conversations while protecting privacy.",
  },
  {
    question: "Do I need a premium subscription?",
    answer:
      "No. Core features are completely free. Premium features will be introduced in future updates.",
  },
  {
    question: "Can I leave a club anytime?",
    answer:
      "Yes. Join, leave and explore communities whenever you want without any restrictions.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[#070B14] py-24">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-0 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[170px]" />

      <div className="relative mx-auto max-w-4xl px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-violet-300">

            FAQ

          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">

            Frequently Asked

            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">

              Questions

            </span>

          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-400">

            Everything you need to know about AI matching,
            clubs, privacy and how Loviqa works.

          </p>

        </div>

        {/* FAQ */}

        <div className="mt-14 space-y-5">

          {faqs.map((faq, index) => {

            const isOpen = open === index;

            return (

              <motion.div
                key={index}
                layout
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
              >

                <button
                  onClick={() =>
                    setOpen(isOpen ? -1 : index)
                  }
                  className="flex w-full items-center justify-between px-7 py-6 text-left"
                >

                  <h3 className="text-lg font-semibold text-white">

                    {faq.question}

                  </h3>

                  <motion.div
                    animate={{
                      rotate: isOpen ? 45 : 0,
                    }}
                  >

                    <Plus
                      className="text-violet-400"
                      size={22}
                    />

                  </motion.div>

                </button>

                <AnimatePresence>

                  {isOpen && (

                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                    >

                      <p className="px-7 pb-6 text-[15px] leading-7 text-gray-400">

                        {faq.answer}

                      </p>

                    </motion.div>

                  )}

                </AnimatePresence>

              </motion.div>

            );
          })}

        </div>

      </div>

    </section>
  );
}