// pages/_app.js
import "../app/globals.css";
import React from "react";
import { AppProps } from "next/app";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";

function MyApp({ Component, pageProps }) {
  return (
    <AnonAadhaarProvider>
      <Component {...pageProps} />
    </AnonAadhaarProvider>
  );
}

export default MyApp;
