import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  "./src/i18n/request.ts" // <-- Acá le decimos dónde está la configuración real
);

const nextConfig: NextConfig = {
  /* Tus otras opciones de configuración si tenías alguna */
};

export default withNextIntl(nextConfig);