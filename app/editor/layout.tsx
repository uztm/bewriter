import Navbar from "@/components/core/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <Navbar />
        <div className="">{children}</div>
      </body>
    </html>
  );
}
