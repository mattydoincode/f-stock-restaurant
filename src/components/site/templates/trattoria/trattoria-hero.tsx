import Image from "next/image";

interface TrattoriaHeroProps {
	name: string;
	cuisine: string;
	heroImage: string;
}

export function TrattoriaHero({name, cuisine, heroImage}: TrattoriaHeroProps) {
	return (
		<section className="relative flex min-h-[55vh] items-center justify-center bg-amber-900">
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
					<div className="absolute inset-0 bg-amber-950/50"/>
				</>
			) : (
				<div className="absolute inset-0 bg-gradient-to-b from-amber-800 to-amber-950"/>
			)}
			<div className="relative z-10 px-4 text-center text-white">
				<h1 className="font-[family-name:var(--font-caveat)] text-6xl sm:text-8xl">
					{name}
				</h1>
				{cuisine && (
					<p className="mt-3 text-lg text-amber-200">{cuisine}</p>
				)}
			</div>
		</section>
	);
}
