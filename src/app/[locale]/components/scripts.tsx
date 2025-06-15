"use client"

import React from "react"
import Script from "next/script"
import { GoogleTagManager } from "@next/third-parties/google"

type Props = {}

const Scripts = (props: Props) => {
  return (
    <>
      <GoogleTagManager gtmId="GTM-NZRRZ8G7" />
      <Script
        defer
        src=""
        onLoad={() =>
          (function (h: any, o: any, t: any, j: any, a?: any, r?: any) {
            h.hj =
              h.hj ||
              function (...args: any[]) {
                ;(h.hj.q = h.hj.q || []).push(args)
              }
            h._hjSettings = { hjid: 3899176, hjsv: 6 }
            a = o.getElementsByTagName("head")[0]
            r = o.createElement("script")
            r.async = 1
            r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv
            a.appendChild(r)
          })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=")
        }
      />
      {/* <Script
        defer
        id="analysis2"
        dangerouslySetInnerHTML={{
          __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-KNRTR8HX');
              `,
        }}
      /> */}
    </>
  )
}

export default Scripts
