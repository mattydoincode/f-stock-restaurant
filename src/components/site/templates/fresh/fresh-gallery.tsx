import Image from "next/image";

interface FreshGalleryProps {
	images: string[];
}

export function FreshGallery({images}: FreshGalleryProps) {
	if (images.length === 0) return null;

	return (
		<section className="px-4 py-16">
			<div className="mx-auto max-w-5xl">
				<h2 className="mb-8 text-center text-3xl font-bold text-[var(--site-primary)]">
					Gallery
				</h2>
				<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
					{images.map((url, idx) => (
						<div
							key={`${url}-${idx}`}
							className="relative aspect-square overflow-hidden rounded-lg"
						>
							<Image
								src={url}
								alt={`Gallery ${idx + 1}`}
								fill
								className="object-cover"
								sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
