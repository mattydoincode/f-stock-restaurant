interface TrattoriaAboutProps {
	description: string;
}

export function TrattoriaAbout({description}: TrattoriaAboutProps) {
	if (!description) return null;

	return (
		<section className="bg-amber-50 px-4 py-16">
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="mb-6 font-[family-name:var(--font-caveat)] text-3xl text-[var(--site-primary)]">
					Our Story
				</h2>
				<p className="text-lg leading-relaxed text-stone-600">{description}</p>
			</div>
		</section>
	);
}
