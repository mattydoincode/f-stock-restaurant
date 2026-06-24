interface FreshFooterProps {
	name: string;
	phone: string;
	email: string;
}

export function FreshFooter({name, phone, email}: FreshFooterProps) {
	return (
		<footer className="border-t border-gray-200 px-4 py-8">
			<div className="mx-auto max-w-4xl text-center text-sm text-gray-500">
				<p className="font-semibold text-[var(--site-primary)]">{name}</p>
				<div className="mt-2 flex flex-wrap items-center justify-center gap-4">
					{phone && (
						<a href={`tel:${phone}`} className="hover:text-[var(--site-accent)]">
							{phone}
						</a>
					)}
					{email && (
						<a
							href={`mailto:${email}`}
							className="hover:text-[var(--site-accent)]"
						>
							{email}
						</a>
					)}
				</div>
			</div>
		</footer>
	);
}
