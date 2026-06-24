"use client";

import {X} from "lucide-react";
import {useGallery} from "@/hooks/use-gallery";
import {SaveIndicator} from "@/components/dashboard/save-indicator";
import {ImageUpload} from "@/components/dashboard/image-upload";
import {ReorderButtons} from "@/components/dashboard/reorder-buttons";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export default function PhotosPage() {
	const gallery = useGallery();

	if (gallery.loading) {
		return (
			<div className="flex items-center justify-center py-12 text-muted-foreground">
				Loading...
			</div>
		);
	}

  return (
	  <div className="space-y-6">
		  <div className="flex items-center justify-between">
			  <div>
				  <h1 className="text-2xl font-bold">Photo Gallery</h1>
				  <p className="mt-1 text-sm text-muted-foreground">
					  Upload photos of your food, restaurant, and ambiance.
				  </p>
			  </div>
			  <SaveIndicator
				  status={gallery.status}
				  errorMessage={gallery.errorMessage}
			  />
		  </div>

		  <Card>
			  <CardHeader>
				  <CardTitle>Hero Image</CardTitle>
				  <CardDescription>
					  The main banner image for your restaurant website
				  </CardDescription>
			  </CardHeader>
			  <CardContent>
				  <ImageUpload
					  currentImage={gallery.heroImage || undefined}
					  onUpload={gallery.uploadHero}
					  onRemove={gallery.removeHero}
					  label="Upload hero image (recommended 1920x600)"
				  />
			  </CardContent>
		  </Card>

		  <Card>
			  <CardHeader>
				  <CardTitle>Gallery</CardTitle>
				  <CardDescription>
					  Additional photos shown on your restaurant website
				  </CardDescription>
			  </CardHeader>
			  <CardContent className="space-y-4">
				  {gallery.galleryImages.length > 0 ? (
					  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
						  {gallery.galleryImages.map((url, idx) => (
							  <div key={`${url}-${idx}`} className="group relative">
								  <div className="aspect-square overflow-hidden rounded-lg border">
									  <img
										  src={url}
										  alt={`Gallery image ${idx + 1}`}
										  className="h-full w-full object-cover"
									  />
								  </div>
								  <div className="absolute right-1 top-1 flex gap-1 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
									  <Button
										  variant="destructive"
										  size="icon"
										  className="h-7 w-7"
										  onClick={() => gallery.removeGalleryImage(idx)}
										  aria-label="Remove image"
									  >
										  <X className="h-3.5 w-3.5"/>
									  </Button>
								  </div>
								  <div className="absolute bottom-1 right-1 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
									  <div className="rounded bg-background/80 p-0.5">
										  <ReorderButtons
											  onMoveUp={() => gallery.moveGalleryImageUp(idx)}
											  onMoveDown={() => gallery.moveGalleryImageDown(idx)}
											  isFirst={idx === 0}
											  isLast={idx === gallery.galleryImages.length - 1}
										  />
									  </div>
								  </div>
							  </div>
						  ))}
					  </div>
				  ) : (
					  <p className="py-6 text-center text-sm text-muted-foreground">
						  No gallery photos yet. Add photos of your food, restaurant, and
						  ambiance.
					  </p>
				  )}

				  <ImageUpload
					  onUpload={gallery.addGalleryImage}
					  label="Add gallery photo"
				  />
			  </CardContent>
		  </Card>
    </div>
  );
}
