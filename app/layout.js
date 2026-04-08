import "./globals.css";

export const metadata = {
  title: "TUF Wall Calendar | Interactive Date Planner",
  description:
    "A premium interactive wall calendar component with date range selection, integrated notes, holiday markers, and theme switching. Built for the TUF frontend engineering challenge.",
  keywords: "calendar, date picker, range selector, wall calendar, interactive, react, nextjs",
  authors: [{ name: "TUF Frontend Challenge" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
