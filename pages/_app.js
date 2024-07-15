
// import "@/styles/globals.css";
// import "../styles/globals.css";
import React from "react";
import { AppProps } from "next/app";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";

function MyApp({ Component, pageProps }, AppProps) {
  // Your component logic here
  return (
    <AnonAadhaarProvider>
      <Component {...pageProps} />
    </AnonAadhaarProvider>
  );
}

export default MyApp;
