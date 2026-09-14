import Image from 'next/image';
import { COLOUR_PALETTES, MATERIAL_SWATCHES } from '@/lib/content';

/** All material swatches and colour palettes composed into one frame. Fills its (relatively positioned) parent. */
export default function MaterialBoard() {
  return (
    <div className="absolute inset-0 flex flex-col gap-6 p-6 md:p-10">
      <div className="grid grid-cols-5 gap-2 sm:gap-3 md:gap-4 flex-1 min-h-0">
        {MATERIAL_SWATCHES.map((material) => (
          <figure key={material.src} className="flex flex-col items-center gap-2 min-h-0">
            <div className="relative w-full flex-1 min-h-0 rounded-full overflow-hidden bg-dark-bg">
              <Image src={material.src} alt={material.label} fill sizes="(max-width: 1024px) 20vw, 12vw" className="object-cover" />
            </div>
            <figcaption className="text-[11px] md:text-xs uppercase tracking-[0.12em] text-champagne text-center leading-tight">
              {material.label}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
        {COLOUR_PALETTES.map((palette) => (
          <div key={palette.name} className="flex items-center gap-3">
            <div className="flex">
              {palette.colors.map((color, i) => (
                <span
                  key={color}
                  className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-dark-surface"
                  style={{ backgroundColor: color, marginLeft: i === 0 ? 0 : -8 }}
                  title={color}
                />
              ))}
            </div>
            <span className="text-[11px] md:text-xs uppercase tracking-[0.18em] text-champagne">{palette.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
