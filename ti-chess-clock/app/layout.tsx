// app/layout.tsx
import type { ReactNode } from "react";
import "./globals.css"


export const metadata = {
  title: "TI Chess Clock",
  description: "Twilight Imperium game timer with strategy card turn order",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        {children}
      </body>
    </html>
  );
}
