import Image from "next/image";
import {DietaryBadge} from "@/components/site/dietary-badge";
import {formatPrice} from "@/lib/site-utils";
import type {MenuSectionResponse} from "@/types/menu";

interface FreshMenuProps {
	sections: MenuSectionResponse[];
}

export function FreshMenu({sections}: FreshMenuProps) {
	if (sections.length === 0) return null;

	return (
		<section className="bg-gray-50 px-4 py-16">
			<div className="mx-auto max-w-5xl">
				<h2 className="mb-12 text-center text-3xl font-bold text-[var(--site-primary)]">
					Menu
				</h2>

				<div className="space-y-12">
					{sections.map((section) => (
						<div key={section.id}>
							<h3 className="mb-2 text-xl font-semibold text-[var(--site-primary)]">
								{section.name}
							</h3>
							{section.description && (
								<p className="mb-6 text-sm text-gray-600">
									{section.description}
								</p>
							)}

							<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
								{section.items
									.filter((item) => item.available)
									.map((item) => (
										<div
											key={item.id}
											className="rounded-lg border border-gray-200 bg-white p-4"
										>
											{item.image && (
												<div className="relative mb-3 aspect-[3/2] overflow-hidden rounded-md">
													<Image
														src={item.image}
														alt={item.name}
														fill
														className="object-cover"
														sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
													/>
												</div>
											)}
											<div className="flex items-baseline justify-between gap-2">
												<h4 className="font-semibold text-[var(--site-primary)]">
													{item.name}
												</h4>
												<span className="shrink-0 font-medium text-[var(--site-accent)]">
                          {formatPrice(item.price)}
                        </span>
											</div>
											{item.description && (
												<p className="mt-1 text-sm text-gray-600">
													{item.description}
												</p>
											)}
											{item.dietaryTags.length > 0 && (
												<div className="mt-2 flex flex-wrap gap-1">
													{item.dietaryTags.map((tag) => (
														<DietaryBadge
															key={tag}
															tag={tag}
															className="bg-gray-100 text-gray-600"
														/>
													))}
												</div>
											)}
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
