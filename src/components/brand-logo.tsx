import Image from "next/image";
import { cafeBoutiqueMedia } from "@/data/media-assets";

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-logo${compact ? " brand-logo--compact" : ""}`}>
      <Image
        src={cafeBoutiqueMedia.logo.src}
        alt={cafeBoutiqueMedia.logo.alt}
        width={cafeBoutiqueMedia.logo.width}
        height={cafeBoutiqueMedia.logo.height}
        quality={75}
        sizes={compact ? "86px" : "95px"}
      />
    </span>
  );
}
