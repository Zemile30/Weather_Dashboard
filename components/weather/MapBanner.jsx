import Image from "next/image";

export default function MapBanner({ data }) {
  const { title, image } = data;

  return (
    <section className="relative h-full overflow-hidden rounded-[24px]">
      <Image
        src={image}
        alt={title ?? ""}
        fill
        sizes="404px"
        className="object-cover rounded-[24px]"
      />
    </section>
  );
}