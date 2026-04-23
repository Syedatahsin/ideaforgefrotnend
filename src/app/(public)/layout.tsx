import HomeNavbar from "@/components/ui/home-navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeNavbar />
      <main className="flex-grow">{children}</main>
      {/* Add Public Footer here */}
    </div>
  );
}
