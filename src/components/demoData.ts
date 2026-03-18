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
    beforeUrl: "/demos/portrait-before.svg",
    afterUrl: "/demos/portrait-after.svg",
    aspectRatio: "4/3",
  },
  {
    id: "product",
    title: "Product Photo",
    description: "Sharper product texture and text readability.",
    beforeUrl: "/demos/product-before.svg",
    afterUrl: "/demos/product-after.svg",
    aspectRatio: "4/3",
  },
  {
    id: "old-photo",
    title: "Old Photo Restore",
    description: "Cleaner contrast for old and faded captures.",
    beforeUrl: "/demos/old-before.svg",
    afterUrl: "/demos/old-after.svg",
    aspectRatio: "4/3",
  },
  {
    id: "text-screenshot",
    title: "Text Screenshot",
    description: "Crisper letters for screenshots and UI captures.",
    beforeUrl: "/demos/text-before.svg",
    afterUrl: "/demos/text-after.svg",
    aspectRatio: "16/10",
  },
];
