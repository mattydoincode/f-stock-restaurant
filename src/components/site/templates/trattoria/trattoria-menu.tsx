import Image from "next/image";
import {DietaryBadge} from "@/components/site/dietary-badge";
import {formatPrice} from "@/lib/site-utils";
import type {MenuSectionResponse} from "@/types/menu";

interface TrattoriaMenuProps {
	sections: MenuSectionResponse[];
}

export function TrattoriaMenu({sections}: TrattoriaMenuProps) {
	if (sections.length === 0) return null;

	return (
		<section className="bg-stone-100 px-4 py-16">
			<div className="mx-auto max-w-5xl">
				<h2 className="mb-12 text-center font-[family-name:var(--font-caveat)] text-4xl text-[var(--site-primary)]">
					Menu
				</h2>

				<div className="space-y-12">
					{sections.map((section) => (
						<div key={section.id}>
							<h3 className="mb-2 font-[family-name:var(--font-caveat)] text-2xl text-[var(--site-accent)]">
								{section.name}
							</h3>
							{section.description && (
								<p className="mb-6 text-sm text-stone-500">
									{section.description}
								</p>
							)}

							<div className="grid gap-4 sm:grid-cols-2">
								{section.items
									.filter((item) => item.available)
									.map((item) => (
										<div
											key={item.id}
											className="flex gap-3 rounded-xl bg-white p-4 shadow-sm"
										>
											{item.image && (
												<div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
													<Image
														src={item.image}
														alt={item.name}
														fill
														className="object-cover"
														sizes="80px"
													/>
												</div>
											)}
											<div className="flex-1">
												<div className="flex items-baseline justify-between gap-2">
													<h4 className="font-semibold text-stone-800">
														{item.name}
													</h4>
													<span className="shrink-0 font-medium text-[var(--site-accent)]">
                            {formatPrice(item.price)}
                          </span>
												</div>
												{item.description && (
													<p className="mt-1 text-sm text-stone-500">
														{item.description}
													</p>
												)}
												{item.dietaryTags.length > 0 && (
													<div className="mt-2 flex flex-wrap gap-1">
														{item.dietaryTags.map((tag) => (
															<DietaryBadge
																key={tag}
																tag={tag}
																className="bg-amber-100 text-amber-800"
															/>
														))}
													</div>
												)}
											</div>
										</div>
									))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
