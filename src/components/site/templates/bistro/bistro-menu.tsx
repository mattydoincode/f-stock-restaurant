import Image from "next/image";
import {DietaryBadge} from "@/components/site/dietary-badge";
import {formatPrice} from "@/lib/site-utils";
import type {MenuSectionResponse} from "@/types/menu";

interface BistroMenuProps {
	sections: MenuSectionResponse[];
}

export function BistroMenu({sections}: BistroMenuProps) {
	if (sections.length === 0) return null;

	return (
		<section className="bg-neutral-900 px-4 py-20">
			<div className="mx-auto max-w-3xl">
				<h2 className="mb-12 text-center font-[family-name:var(--font-playfair)] text-4xl font-bold text-white">
					Menu
				</h2>

				<div className="space-y-16">
					{sections.map((section) => (
						<div key={section.id}>
							<div className="mb-8 text-center">
								<h3 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[var(--site-accent)]">
									{section.name}
								</h3>
								{section.description && (
									<p className="mt-2 text-sm text-neutral-400">
										{section.description}
									</p>
								)}
							</div>

							<div className="space-y-6">
								{section.items
									.filter((item) => item.available)
									.map((item) => (
										<div
											key={item.id}
											className="flex gap-4 border-b border-neutral-800 pb-6 last:border-0"
										>
											{item.image && (
												<div className="relative h-20 w-20 shrink-0 overflow-hidden rounded">
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
													<h4 className="font-[family-name:var(--font-playfair)] text-lg font-medium text-white">
														{item.name}
													</h4>
													<span className="shrink-0 text-[var(--site-accent)]">
                            {formatPrice(item.price)}
                          </span>
												</div>
												{item.description && (
													<p className="mt-1 text-sm text-neutral-400">
														{item.description}
													</p>
												)}
												{item.dietaryTags.length > 0 && (
													<div className="mt-2 flex flex-wrap gap-1">
														{item.dietaryTags.map((tag) => (
															<DietaryBadge
																key={tag}
																tag={tag}
																className="border border-neutral-700 text-neutral-400"
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
