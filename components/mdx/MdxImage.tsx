// components/mdx/MdxImage.tsx

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
};

export default function MdxImage({
  src,
  alt,
  width = 900,
  height = 500,
  caption,
}: Props) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-xl border"
      />

      {caption && (
        <figcaption className="mt-2 text-sm text-zinc-500 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}