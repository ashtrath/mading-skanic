import Head from "next/head";
import { useMemo } from "react";

type MetaTagsProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

const MetaTags = ({ title, description, image, url }: MetaTagsProps) => {
  const formattedTitle = useMemo(() => {
    const defaultTitle = "Mading Skanic";

    if (title) {
      return `${title} | ${defaultTitle}`;
    }

    return defaultTitle;
  }, [title]);

  const DEFAULT_DESCRIPTION =
    "Mading Skanic adalah sebuah platform mading digital milik SMKN 1 Ciomas yang memungkinkan untuk kalian menemukan informasi dan pengumuman terkini seputar kegiatan dan perkembangan di SMKN 1 Ciomas.";
  const favicon = "/favicon.ico";

  const currentDescription = description ?? DEFAULT_DESCRIPTION;

  return (
    <Head>
      <title>{formattedTitle}</title>
      <link rel="icon" href={favicon} />
      <meta name="title" content={formattedTitle} />
      <meta name="description" content={currentDescription} />

      <meta
        name="keywords"
        content="mading, mading-skanic, mading-t3, mading-nextjs"
      />
      <meta
        name="googlebot"
        content="index, explore, search, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
      />
      <meta name="creator" content="ashtrath" />

      <meta property="og:type" content="website" />
      {/* <meta property="og:url" content={url} /> */}
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={currentDescription} />
      {/* <meta property="og:image" content={image} /> */}

      <meta property="twitter:card" content="summary_large_image" />
      {/* <meta property="twitter:url" content={url} /> */}
      <meta property="twitter:title" content={formattedTitle} />
      <meta property="twitter:description" content={currentDescription} />
      {/* <meta property="twitter:image" content={image} /> */}
    </Head>
  );
};

export default MetaTags;
