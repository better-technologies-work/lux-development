import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
 
export const routing = defineRouting({
  // Los idiomas que vamos a soportar en Lux Development
  locales: ['en', 'es'],
  // El idioma por defecto si no se especifica ninguno en la URL
  defaultLocale: 'en'
});
 
// Exportamos los helpers de navegación configurados con nuestros idiomas
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);