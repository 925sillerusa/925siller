export const metadata = {
  title: "925 Siller USA",
  description: "Handcrafted 925 silver jewelry",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, Arial, sans-serif" }}>{children}</body>
    </html>
  );
}
