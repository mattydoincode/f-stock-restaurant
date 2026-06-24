interface BistroAboutProps {
	description: string;
}

export function BistroAbout({description}: BistroAboutProps) {
	if (!description) return null;

	return (
		<section className="bg-neutral-950 px-4 py-20">
			<div className="mx-auto max-w-2xl text-center">
				<div className="mb-6 flex items-center justify-center gap-4">
					<span className="h-px w-12 bg-[var(--site-accent)]"/>
					<h2 className="text-xs tracking-[0.3em] uppercase text-neutral-300">
            Our Story
					</h2>
					<span className="h-px w-12 bg-[var(--site-accent)]"/>
				</div>
				<p className="font-[family-name:var(--font-playfair)] text-lg leading-relaxed text-neutral-300">
					{description}
				</p>
			</div>
		</section>
	);
}
