import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
 
export default getRequestConfig(async ({ locale }) => {
  const currentLocale = locale || routing.defaultLocale;
 
  // Cargamos el JSON de traducciones correspondiente
  const messages = (await import(`../messages/${currentLocale}.json`)).default;
 
  return {
    locale: currentLocale,
    messages: messages as Record<string, any>
  };
});