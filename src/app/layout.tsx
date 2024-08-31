/* eslint-disable @next/next/no-img-element */
import { Footer, Navbar } from "@/components";
import { cn } from "@/shared";
import { Provider } from "jotai";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Дизайн-радиаторы отопления",
  description:
    "Интернет-магазин дизайн-радиаторов отопления от ведущих российских производителей. Выгодные цены и официальная гарантия.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full box-border">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>

        <noscript>
          <div>
            <img
              src="https://top-fwz1.mail.ru/counter?id=3549740;js=na"
              style={{ position: "absolute", left: "-9999px" }}
              alt="Top.Mail.Ru"
            />
          </div>
        </noscript>

        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/98171489"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </head>

      {/* Google Analytics */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-KC3BCY6RTT" />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KC3BCY6RTT');
          `,
        }}
      />

      {/* VK Pixel with delay 3000 ms */}
      <Script
        id="top-mail-ru-counter"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            setTimeout(function() {
              var _tmr = window._tmr || (window._tmr = []);
              _tmr.push({id: "3549740", type: "pageView", start: (new Date()).getTime()});
              (function (d, w, id) {
                if (d.getElementById(id)) return;
                var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
                ts.src = "https://top-fwz1.mail.ru/js/code.js";
                var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
                if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
              })(document, window, "tmr-code");
            }, 3000);
          `,
        }}
      />

      {/* Yandex Metrika upload with delay 3000 ms*/}

      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            setTimeout(function() {
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){
                  (m[i].a=m[i].a||[]).push(arguments)
                };
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {
                  if (document.scripts[j].src === r) { return; }
                }
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(98171489, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                ecommerce:"dataLayer"
              });
            }, 3000);
          `,
        }}
      />

      {/* amoCRM */}
      <Script
        id="amocrm-social-button"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(a,m,o,c,r,m){a[m]={id:"413976",hash:"ff941a71892f8cd301131b6f60806155598b097829bc8b4b5f9a8ea3e0720989",locale:"ru",inline:false,setMeta:function(p){this.params=(this.params||[]).concat([p])}};a[o]=a[o]||function(){(a[o].q=a[o].q||[]).push(arguments)};var d=a.document,s=d.createElement('script');s.async=true;s.id=m+'_script';s.src='https://gso.amocrm.ru/js/button.js';d.head&&d.head.appendChild(s)}(window,0,'amoSocialButton',0,0,'amo_social_button'));`,
        }}
      />
      <body className={cn("relative h-full m-0 p-0 font-sans antialiased", inter.className)}>
        <Provider>
          <main className="relative flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-grow flex-1 flex-col">{children}</div>
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
