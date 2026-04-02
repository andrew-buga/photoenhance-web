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
    beforeUrl: "https://picsum.photos/600/450?random=1",
    afterUrl: "https://picsum.photos/600/450?random=1&sharp=3",
    aspectRatio: "4/3",
  },
  {
    id: "product",
    title: "Product Photo",
    description: "Sharper product texture and text readability.",
    beforeUrl: "https://picsum.photos/600/450?random=2",
    afterUrl: "https://picsum.photos/600/450?random=2&sharp=3",
    aspectRatio: "4/3",
  },
  {
    id: "old-photo",
    title: "Old Photo Restore",
    description: "Cleaner contrast for old and faded captures.",
    beforeUrl: "https://picsum.photos/600/450?random=3&grayscale",
    afterUrl: "https://picsum.photos/600/450?random=3",
    aspectRatio: "4/3",
  },
  {
    id: "text-screenshot",
    title: "Text Screenshot",
    description: "Crisper letters for screenshots and UI captures.",
    beforeUrl: "https://picsum.photos/700/440?random=4",
    afterUrl: "https://picsum.photos/700/440?random=4&sharp=3",
    aspectRatio: "16/10",
  },
];
