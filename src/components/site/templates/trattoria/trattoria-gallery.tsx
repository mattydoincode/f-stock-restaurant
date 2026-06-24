import Image from "next/image";

interface TrattoriaGalleryProps {
	images: string[];
}

export function TrattoriaGallery({images}: TrattoriaGalleryProps) {
	if (images.length === 0) return null;

	return (
		<section className="bg-amber-50 px-4 py-16">
			<div className="mx-auto max-w-5xl">
				<h2 className="mb-8 text-center font-[family-name:var(--font-caveat)] text-4xl text-[var(--site-primary)]">
					Gallery
				</h2>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{images.map((url, idx) => (
						<div
							key={`${url}-${idx}`}
							className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md"
						>
							<Image
								src={url}
								alt={`Gallery ${idx + 1}`}
								fill
								className="object-cover"
								sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
