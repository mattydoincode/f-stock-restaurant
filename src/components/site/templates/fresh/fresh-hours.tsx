import {formatHoursRange, getDayLabel, ORDERED_DAYS,} from "@/lib/site-utils";
import type {WeeklyHours} from "@/types/restaurant";

interface FreshHoursProps {
	hours: WeeklyHours;
	address: string;
	mapEmbed: string;
}

export function FreshHours({hours, address, mapEmbed}: FreshHoursProps) {
	const hasHours = Object.keys(hours).length > 0;
	if (!hasHours && !address && !mapEmbed) return null;

	return (
		<section className="bg-gray-50 px-4 py-16">
			<div className="mx-auto max-w-4xl">
				<h2 className="mb-8 text-center text-3xl font-bold text-[var(--site-primary)]">
					Find Us
				</h2>

				<div className="grid gap-8 md:grid-cols-2">
					<div className="space-y-6">
						{hasHours && (
							<div className="rounded-lg border border-gray-200 bg-white p-6">
								<h3 className="mb-4 font-semibold text-[var(--site-primary)]">
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
												<dt className="text-gray-600">{getDayLabel(day)}</dt>
												<dd className="font-medium">
													{entry ? formatHoursRange(entry) : "Closed"}
												</dd>
											</div>
										);
									})}
								</dl>
							</div>
						)}

						{address && (
							<div className="rounded-lg border border-gray-200 bg-white p-6">
								<h3 className="mb-2 font-semibold text-[var(--site-primary)]">
									Address
								</h3>
								<p className="text-sm text-gray-600 whitespace-pre-line">
									{address}
								</p>
							</div>
						)}
					</div>

					{mapEmbed && (
						<div className="aspect-[4/3] overflow-hidden rounded-lg border border-gray-200">
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
