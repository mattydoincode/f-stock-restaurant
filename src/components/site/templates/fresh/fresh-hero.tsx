import Image from "next/image";

interface FreshHeroProps {
	name: string;
	cuisine: string;
	heroImage: string;
}

export function FreshHero({name, cuisine, heroImage}: FreshHeroProps) {
	return (
		<section className="relative flex min-h-[50vh] items-center justify-center bg-gray-50">
			{heroImage ? (
				<>
					<Image
						src={heroImage}
						alt={name}
						fill
						className="object-cover"
						priority
						sizes="100vw"
					/>
					<div className="absolute inset-0 bg-white/40"/>
				</>
			) : null}
			<div className="relative z-10 px-4 text-center">
				<h1 className="text-5xl font-bold tracking-tight text-[var(--site-primary)] sm:text-6xl">
					{name}
				</h1>
				{cuisine && (
					<p className="mt-3 text-lg font-medium text-[var(--site-accent)]">
						{cuisine}
					</p>
				)}
			</div>
		</section>
	);
}
