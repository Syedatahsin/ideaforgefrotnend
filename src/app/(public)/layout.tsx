import HomeNavbar from "@/components/ui/home-navbar";
import Footer from "@/components/ui/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeNavbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
