import {cn} from "@/lib/utils";

interface DietaryBadgeProps {
	tag: string;
	className?: string;
}

export function DietaryBadge({tag, className}: DietaryBadgeProps) {
	return (
		<span
			className={cn(
				"inline-block rounded-full px-2 py-0.5 text-xs font-medium",
				className,
			)}
		>
      {tag.charAt(0).toUpperCase() + tag.slice(1)}
    </span>
	);
}
