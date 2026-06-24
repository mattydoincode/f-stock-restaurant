import {Mail, MapPin, Phone} from "lucide-react";

interface BistroFooterProps {
	name: string;
	phone: string;
	email: string;
	address: string;
}

export function BistroFooter({name, phone, email, address}: BistroFooterProps) {
	return (
		<footer className="border-t border-neutral-800 bg-neutral-950 px-4 py-12">
			<div className="mx-auto max-w-4xl">
				<div className="text-center">
					<p className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">
						{name}
					</p>
					<div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-300">
						{phone && (
							<a
								href={`tel:${phone}`}
								className="flex items-center gap-2 underline decoration-1 underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
							>
								<Phone className="h-4 w-4"/>
								{phone}
							</a>
						)}
						{email && (
							<a
								href={`mailto:${email}`}
								className="flex items-center gap-2 underline decoration-1 underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
							>
								<Mail className="h-4 w-4"/>
								{email}
							</a>
						)}
						{address && (
							<span className="flex items-center gap-2">
                <MapPin className="h-4 w-4"/>
								{address}
              </span>
						)}
					</div>
				</div>
			</div>
		</footer>
	);
}
