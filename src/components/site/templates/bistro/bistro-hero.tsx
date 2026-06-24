import Image from "next/image";

interface BistroHeroProps {
	name: string;
	cuisine: string;
	heroImage: string;
}

export function BistroHero({name, cuisine, heroImage}: BistroHeroProps) {
	return (
		<section className="relative flex min-h-[60vh] items-center justify-center">
			{heroImage ? (
				<Image
					src={heroImage}
					alt={name}
					fill
					className="object-cover"
					priority
					sizes="100vw"
				/>
			) : (
				<div className="absolute inset-0 bg-neutral-800"/>
			)}
			<div className="absolute inset-0 bg-black/60"/>
			<div className="relative z-10 px-4 text-center text-white">
				<h1 className="font-[family-name:var(--font-playfair)] text-5xl font-bold tracking-tight sm:text-7xl">
					{name}
				</h1>
				{cuisine && (
					<p className="mt-4 text-lg tracking-widest uppercase text-white/70">
						{cuisine}
					</p>
				)}
			</div>
		</section>
	);
}
