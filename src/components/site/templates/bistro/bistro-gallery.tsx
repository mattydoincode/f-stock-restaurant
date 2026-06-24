import Image from "next/image";

interface BistroGalleryProps {
	images: string[];
}

export function BistroGallery({images}: BistroGalleryProps) {
	if (images.length === 0) return null;

	return (
		<section className="bg-neutral-950 px-4 py-20">
			<div className="mx-auto max-w-5xl">
				<h2 className="mb-12 text-center font-[family-name:var(--font-playfair)] text-4xl font-bold text-white">
					Gallery
				</h2>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{images.map((url, idx) => (
						<div
							key={`${url}-${idx}`}
							className="relative aspect-[4/3] overflow-hidden rounded-lg"
						>
							<Image
								src={url}
								alt={`Gallery ${idx + 1}`}
								fill
								className="object-cover transition-transform duration-500 hover:scale-105"
								sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
