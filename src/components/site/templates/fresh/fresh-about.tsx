interface FreshAboutProps {
	description: string;
}

export function FreshAbout({description}: FreshAboutProps) {
	if (!description) return null;

	return (
		<section className="px-4 py-16">
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="mb-6 text-sm font-semibold tracking-widest uppercase text-[var(--site-accent)]">
					About
				</h2>
				<p className="text-lg leading-relaxed text-gray-600">{description}</p>
			</div>
		</section>
	);
}
