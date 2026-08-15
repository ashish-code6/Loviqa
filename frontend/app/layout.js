import "./globals.css";
import ToastProvider from "@/components/ui/ToastProvider";

export const metadata = {
  title: {
    default: "Loviqa",
    template: "%s | Loviqa",
  },
  description:
    "Loviqa is an AI-powered relationship platform designed to help people build meaningful connections through shared interests, smart matchmaking, and engaging communities.",
  keywords: [
    "Loviqa",
    "AI Dating",
    "Dating App",
    "AI Matchmaking",
    "Interest Clubs",
    "Relationship Platform",
    "Social Platform",
  ],
  authors: [{ name: "Ashish Kumar" }],
  creator: "Ashish Kumar",
  applicationName: "Loviqa",
  metadataBase: new URL("https://loviqa.com"), // Domain purchase ke baad change kar dena
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <body
        className="
          bg-[#070B14]
          text-white
          min-h-screen
          overflow-x-hidden
          font-sans
        "
      >
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
