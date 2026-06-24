import {Caveat, Playfair_Display} from "next/font/google";

const playfair = Playfair_Display({
	variable: "--font-playfair",
	subsets: ["latin"],
	display: "swap",
});

const caveat = Caveat({
	variable: "--font-caveat",
	subsets: ["latin"],
	display: "swap",
});

export default function SiteLayout({
	                                   children,
                                   }: {
	children: React.ReactNode;
}) {
	return (
		<div className={`${playfair.variable} ${caveat.variable}`}>
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-lg"
			>
				Skip to content
			</a>
			{children}
		</div>
	);
}
