import {formatHoursRange, getDayLabel, ORDERED_DAYS,} from "@/lib/site-utils";
import type {WeeklyHours} from "@/types/restaurant";

interface BistroHoursProps {
	hours: WeeklyHours;
	address: string;
	mapEmbed: string;
}

export function BistroHours({hours, address, mapEmbed}: BistroHoursProps) {
	const hasHours = Object.keys(hours).length > 0;
	if (!hasHours && !address && !mapEmbed) return null;

	return (
		<section className="bg-neutral-900 px-4 py-20">
			<div className="mx-auto max-w-4xl">
				<h2 className="mb-12 text-center font-[family-name:var(--font-playfair)] text-4xl font-bold text-white">
					Visit Us
				</h2>

				<div className="grid gap-12 md:grid-cols-2">
					<div>
						{hasHours && (
							<div>
								<h3 className="mb-4 text-sm tracking-widest uppercase text-[var(--site-accent)]">
									Hours
								</h3>
								<dl className="space-y-2">
									{ORDERED_DAYS.map((day) => {
										const entry = hours[day];
										return (
											<div
												key={day}
												className="flex justify-between text-sm"
											>
												<dt className="text-neutral-300">
													{getDayLabel(day)}
												</dt>
												<dd className="text-white">
													{entry ? formatHoursRange(entry) : "Closed"}
												</dd>
											</div>
										);
									})}
								</dl>
							</div>
						)}

						{address && (
							<div className="mt-8">
								<h3 className="mb-2 text-sm tracking-widest uppercase text-[var(--site-accent)]">
									Location
								</h3>
								<p className="text-sm text-neutral-300 whitespace-pre-line">
									{address}
								</p>
							</div>
						)}
					</div>

					{mapEmbed && (
						<div className="aspect-[4/3] overflow-hidden rounded-lg">
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
