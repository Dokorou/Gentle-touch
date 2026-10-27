import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Gentle Touch | Book an Appointment",
  description: "Book your Gentle Touch massage and wellness appointment online."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}