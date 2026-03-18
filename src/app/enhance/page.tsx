import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import EnhanceTool from "@/components/EnhanceTool";

export default function EnhancePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <EnhanceTool />
      </main>
      <SiteFooter />
    </div>
  );
}
