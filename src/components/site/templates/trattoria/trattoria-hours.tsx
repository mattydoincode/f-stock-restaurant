import {formatHoursRange, getDayLabel, ORDERED_DAYS,} from "@/lib/site-utils";
import type {WeeklyHours} from "@/types/restaurant";

interface TrattoriaHoursProps {
	hours: WeeklyHours;
	address: string;
	mapEmbed: string;
}

export function TrattoriaHours({hours, address, mapEmbed}: TrattoriaHoursProps) {
	const hasHours = Object.keys(hours).length > 0;
	if (!hasHours && !address && !mapEmbed) return null;

	return (
		<section className="bg-stone-100 px-4 py-16">
			<div className="mx-auto max-w-4xl">
				<h2 className="mb-8 text-center font-[family-name:var(--font-caveat)] text-4xl text-[var(--site-primary)]">
					Visit Us
				</h2>

				<div className="grid gap-8 md:grid-cols-2">
					<div className="space-y-6">
						{hasHours && (
							<div className="rounded-xl bg-white p-6 shadow-sm">
								<h3 className="mb-4 font-[family-name:var(--font-caveat)] text-xl text-[var(--site-accent)]">
									Hours
								</h3>
								<dl className="space-y-1.5">
									{ORDERED_DAYS.map((day) => {
										const entry = hours[day];
										return (
											<div
												key={day}
												className="flex justify-between text-sm"
											>
												<dt className="text-stone-600">{getDayLabel(day)}</dt>
												<dd className="font-medium text-stone-800">
													{entry ? formatHoursRange(entry) : "Closed"}
												</dd>
											</div>
										);
									})}
								</dl>
							</div>
						)}

						{address && (
							<div className="rounded-xl bg-white p-6 shadow-sm">
								<h3 className="mb-2 font-[family-name:var(--font-caveat)] text-xl text-[var(--site-accent)]">
									Location
								</h3>
								<p className="text-sm text-stone-600 whitespace-pre-line">
									{address}
								</p>
							</div>
						)}
					</div>

					{mapEmbed && (
						<div className="aspect-[4/3] overflow-hidden rounded-xl shadow-sm">
							<iframe
								src={mapEmbed}
								className="h-full w-full border-0"
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								title="Restaurant location"
							/>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
