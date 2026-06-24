import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Eye} from "lucide-react";

export default function PreviewPage() {
  return (
	  <div className="space-y-6">
		  <div>
			  <h1 className="text-2xl font-bold">Preview</h1>
			  <p className="mt-1 text-sm text-muted-foreground">
				  Preview your restaurant website before publishing.
			  </p>
		  </div>

		  <Card>
			  <CardHeader className="items-center text-center">
				  <Eye className="mb-2 h-12 w-12 text-muted-foreground/40"/>
				  <CardTitle>Preview Coming Soon</CardTitle>
				  <CardDescription>
					  Live preview will be available once restaurant templates are built.
					  Your data is being saved and will be used to generate your website.
				  </CardDescription>
			  </CardHeader>
			  <CardContent className="flex justify-center">
				  <Link
					  href="/dashboard"
					  className={buttonVariants({variant: "outline"})}
				  >
					  Back to Dashboard
				  </Link>
			  </CardContent>
		  </Card>
    </div>
  );
}
