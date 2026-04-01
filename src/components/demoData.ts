export type DemoItem = {
  id: string;
  title: string;
  description: string;
  beforeUrl: string;
  afterUrl: string;
  aspectRatio: string;
};

export const demoItems: DemoItem[] = [
  {
    id: "portrait",
    title: "Portrait Enhancement",
    description: "Better skin details and cleaner edges on faces.",
    beforeUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=30",
    afterUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=90",
    aspectRatio: "4/3",
  },
  {
    id: "product",
    title: "Product Photo",
    description: "Sharper product texture and text readability.",
    beforeUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=30",
    afterUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=90",
    aspectRatio: "4/3",
  },
  {
    id: "old-photo",
    title: "Old Photo Restore",
    description: "Cleaner contrast for old and faded captures.",
    beforeUrl: "https://images.unsplash.com/photo-1606216174052-dfa4d0ed60a4?w=600&q=40&filt=grayscale",
    afterUrl: "https://images.unsplash.com/photo-1606216174052-dfa4d0ed60a4?w=600&q=90",
    aspectRatio: "4/3",
  },
  {
    id: "text-screenshot",
    title: "Text Screenshot",
    description: "Crisper letters for screenshots and UI captures.",
    beforeUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&q=30",
    afterUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&q=90",
    aspectRatio: "16/10",
  },
];
