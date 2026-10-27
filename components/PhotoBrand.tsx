// PhotoBrand.tsx: the small "Photography by ..." line on the Photography pages.
// The name comes from PHOTO_BRAND in data/site.ts.
import { PHOTO_BRAND } from "@/data/site";

export default function PhotoBrand({ className = "" }: { className?: string }) {
  return (
    <p className={`font-serif text-sm italic text-muted ${className}`}>
      Photography by <span className="text-accent">{PHOTO_BRAND}</span>
    </p>
  );
}
