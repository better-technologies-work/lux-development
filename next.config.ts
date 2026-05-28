import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// 1. Cambiamos "./src/i18n/request.ts" por "./i18n/request.ts"
const withNextIntl = createNextIntlPlugin(
  "./i18n/request.ts" 
);

const nextConfig: NextConfig = {
  /* Tus otras opciones */
};

export default withNextIntl(nextConfig);