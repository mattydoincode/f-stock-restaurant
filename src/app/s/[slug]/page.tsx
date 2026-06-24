interface PublishedSitePageProps {
  params: Promise<{ slug: string }>;
}

export default async function PublishedSitePage({ params }: PublishedSitePageProps) {
  const { slug } = await params;

  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="text-muted-foreground">
        Published site for <strong>{slug}</strong> will render here.
      </p>
    </div>
  );
}
