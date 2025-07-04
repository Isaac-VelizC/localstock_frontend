interface PageMetaProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
}

export default function PageMeta({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
}: PageMetaProps) {
  const nameApp = import.meta.env.VITE_NAME_APP || 'AISAKVELIZ';
  return (
    <>
      {/* Meta estándar */}
      <title>{`${title} | ${nameApp}`}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </>
  );
}
