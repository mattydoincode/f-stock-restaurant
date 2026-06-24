"use client";

import {useRestaurant} from "@/hooks/use-restaurant";
import {SaveIndicator} from "@/components/dashboard/save-indicator";
import {HoursEditor} from "@/components/dashboard/hours-editor";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";

export default function InfoPage() {
	const {restaurant, loading, updateField, status, errorMessage} =
		useRestaurant();

	if (loading || !restaurant) {
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
				  <h1 className="text-2xl font-bold">Restaurant Info</h1>
				  <p className="mt-1 text-sm text-muted-foreground">
					  Changes are saved automatically.
				  </p>
			  </div>
			  <SaveIndicator status={status} errorMessage={errorMessage}/>
		  </div>

		  <Card>
			  <CardHeader>
				  <CardTitle>Basic Info</CardTitle>
				  <CardDescription>
					  Your restaurant name and description
				  </CardDescription>
			  </CardHeader>
			  <CardContent className="space-y-4">
				  <div className="space-y-2">
					  <Label htmlFor="name">Restaurant Name</Label>
					  <Input
						  id="name"
						  value={restaurant.name}
						  onChange={(e) => updateField("name", e.target.value)}
						  placeholder="e.g. Bella Cucina"
					  />
				  </div>
				  <div className="space-y-2">
					  <Label htmlFor="cuisine">Cuisine Type</Label>
					  <Input
						  id="cuisine"
						  value={restaurant.cuisine}
						  onChange={(e) => updateField("cuisine", e.target.value)}
						  placeholder="e.g. Italian, Mexican, Japanese"
					  />
				  </div>
				  <div className="space-y-2">
					  <Label htmlFor="description">Description</Label>
					  <Textarea
						  id="description"
						  value={restaurant.description}
						  onChange={(e) => updateField("description", e.target.value)}
						  placeholder="Tell your story — what makes your restaurant special?"
						  rows={4}
					  />
				  </div>
			  </CardContent>
		  </Card>

		  <Card>
			  <CardHeader>
				  <CardTitle>Contact</CardTitle>
				  <CardDescription>How customers can reach you</CardDescription>
			  </CardHeader>
			  <CardContent className="space-y-4">
				  <div className="grid gap-4 sm:grid-cols-2">
					  <div className="space-y-2">
						  <Label htmlFor="phone">Phone Number</Label>
						  <Input
							  id="phone"
							  type="tel"
							  value={restaurant.phone}
							  onChange={(e) => updateField("phone", e.target.value)}
							  placeholder="(555) 123-4567"
						  />
					  </div>
					  <div className="space-y-2">
						  <Label htmlFor="email">Email</Label>
						  <Input
							  id="email"
							  type="email"
							  value={restaurant.email}
							  onChange={(e) => updateField("email", e.target.value)}
							  placeholder="hello@yourrestaurant.com"
						  />
					  </div>
				  </div>
			  </CardContent>
		  </Card>

		  <Card>
			  <CardHeader>
				  <CardTitle>Location</CardTitle>
				  <CardDescription>Your restaurant address</CardDescription>
			  </CardHeader>
			  <CardContent className="space-y-4">
				  <div className="space-y-2">
					  <Label htmlFor="address">Address</Label>
					  <Textarea
						  id="address"
						  value={restaurant.address}
						  onChange={(e) => updateField("address", e.target.value)}
						  placeholder="123 Main Street, City, State ZIP"
						  rows={2}
					  />
				  </div>
				  <div className="space-y-2">
					  <Label htmlFor="mapEmbed">Google Maps Embed URL</Label>
					  <Input
						  id="mapEmbed"
						  value={restaurant.mapEmbed}
						  onChange={(e) => updateField("mapEmbed", e.target.value)}
						  placeholder="Paste your Google Maps embed URL"
					  />
					  <p className="text-xs text-muted-foreground">
						  Go to Google Maps, click Share, then Embed a map, and paste the
						  src URL here.
					  </p>
				  </div>
			  </CardContent>
		  </Card>

		  <Card>
			  <CardHeader>
				  <CardTitle>Hours of Operation</CardTitle>
				  <CardDescription>
					  Toggle each day on/off and set open/close times
				  </CardDescription>
			  </CardHeader>
			  <CardContent>
				  <HoursEditor
					  hours={restaurant.hours}
					  onChange={(hours) => updateField("hours", hours)}
				  />
			  </CardContent>
		  </Card>
    </div>
  );
}
