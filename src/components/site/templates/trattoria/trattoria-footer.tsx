import {Mail, MapPin, Phone} from "lucide-react";

interface TrattoriaFooterProps {
	name: string;
	phone: string;
	email: string;
	address: string;
}

export function TrattoriaFooter({name, phone, email, address}: TrattoriaFooterProps) {
	return (
		<footer className="bg-amber-900 px-4 py-12 text-amber-100">
			<div className="mx-auto max-w-4xl text-center">
				<p className="font-[family-name:var(--font-caveat)] text-3xl text-white">
					{name}
				</p>
				<div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
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
		</footer>
	);
}
