import Head from 'next/head';
import {useRouter} from 'next/router';
import {seoForPath,structuredData,siteOrigin} from '../lib/seo.mjs';
/** One owner for metadata prevents page and embedded workspace tags conflicting. */
export function Seo(){
 const router=useRouter();const meta=seoForPath(router.pathname==='/404'?'/404':router.asPath);
 return <Head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description}/>
  <link rel="canonical" href={meta.url}/>
  <meta name="robots" content={meta.noindex?'noindex, follow':'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}/>
  <meta property="og:site_name" content="WEBSPACEAI"/>
  <meta property="og:locale" content="en_US"/>
  <meta property="og:type" content={meta.article?'article':'website'}/>
  <meta property="og:url" content={meta.url}/>
  <meta property="og:title" content={meta.title}/>
  <meta property="og:description" content={meta.description}/>
  <meta property="og:image" content={meta.imageUrl}/>
  <meta property="og:image:secure_url" content={meta.imageUrl}/>
  <meta property="og:image:type" content="image/jpeg"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:image:alt" content={meta.imageAlt}/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content={meta.title}/>
  <meta name="twitter:description" content={meta.description}/>
  <meta name="twitter:image" content={meta.imageUrl}/>
  <meta name="twitter:image:alt" content={meta.imageAlt}/>
  {meta.article&&<meta property="article:published_time" content={`${meta.article.date}T00:00:00Z`}/>}
  {meta.article&&<meta property="article:modified_time" content={`${meta.article.date}T00:00:00Z`}/>}
  {meta.article&&<meta property="article:section" content={meta.article.category}/>}
  <link rel="alternate" type="application/rss+xml" title="WEBSPACEAI Journal" href={`${siteOrigin}/research/feed.xml`}/>
  <script key="structured-data" type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData(meta)).replace(/</g,'\\u003c')}}/>
 </Head>;
}
