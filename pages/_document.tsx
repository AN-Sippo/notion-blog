import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width"/>
      </Head>
      <body style={{backgroundColor:'rgb(193,179,170)'}}>
        <Main/>
        <NextScript />
      </body>
    </Html>
  )
}
