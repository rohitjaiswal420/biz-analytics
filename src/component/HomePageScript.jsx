"use client";
import { usePathname } from "next/navigation";
import Script from "next/script";

const HomePageScripts = () => {
  const pathname = usePathname();

  if (pathname !== "/") return null; // Load scripts only on the home page

  return (
    <>
      <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="lazyOnload" />
      <Script src="/revolution/js/jquery.themepunch.revolution.min.js" strategy="lazyOnload" />
      <Script src="/revolution/js/jquery.themepunch.tools.min.js" strategy="lazyOnload" />
      <Script src="/revolution/js/extensions/revolution.extension.actions.min.js" strategy="lazyOnload" />
      <Script src="/revolution/js/extensions/revolution.extension.carousel.min.js" strategy="lazyOnload" />
      <Script src="/revolution/js/extensions/revolution.extension.kenburn.min.js" strategy="lazyOnload" />
      <Script src="/revolution/js/extensions/revolution.extension.layeranimation.min.js" strategy="lazyOnload" />
      <Script src="/revolution/js/extensions/revolution.extension.migration.min.js" strategy="lazyOnload" />
      <Script src="/revolution/js/extensions/revolution.extension.navigation.min.js" strategy="lazyOnload" />
      <Script src="/revolution/js/extensions/revolution.extension.parallax.min.js" strategy="lazyOnload" />
      <Script src="/revolution/js/extensions/revolution.extension.slideanims.min.js" strategy="lazyOnload" />
      <Script src="/revolution/js/extensions/revolution.extension.video.min.js" strategy="lazyOnload" />
    </>
  );
};

export default HomePageScripts;
