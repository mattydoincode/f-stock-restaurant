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
			{children}
		</div>
	);
}
