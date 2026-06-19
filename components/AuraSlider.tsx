'use client';

import { useState } from 'react';
import Image from 'next/image';

interface DuplexSliderProps {
  locale: string;
}

export default function AuraSlider({ locale }: DuplexSliderProps){
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Available images in public folder
  const availableImages = ['/casa1.png', '/casa2.png', '/casa3.png', '/casa4.png', '/casa5.png', '/casa6.png', '/casa9.png'];
  const totalImages = availableImages.length;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const aura = {
    en: {
      title: 'Duplex Moderno (American Details) In Villa Elisa',
      location: 'Villa Elisa, Central',
      price: 'Gs. 600,000,000',
      bedrooms: '3',
      bathrooms: '3',
      area: '130 m²',
      description: 'Luxury Duplex for Sale – Villa Elisa (bordering Asunción). Located in one of the most strategic and growing areas of Villa Elisa, 5 minutes from Avda. Von Poleski and Americo Pico, 5 minutes from the municipality, 4 minutes from Luisito Supermarket. Ideal for living with comfort, style and security.',
      highlights: [
        'Land of 180 m² | Built area: 130 m²',
        'Garage for 3 large vehicles',
        'Spacious living room with social bathroom',
        'Designs with American details - unique to this duplex',
        'Electric gate for convenience',
        'Dining room integrated with modern kitchen with AC included',
        'Ground floor: Garage for 3 vehicles • Spacious living room • Dining and integrated kitchen with AC and excellent natural lighting',
        'Upper floor: 3 bedrooms (1 en suite with private bathroom), all with terraces • Family bathroom',
      ],
      amenities: ['Box / Storage', 'BBQ / Grill', 'Balcony / Terrace', 'Central Hot Water', 'Air Conditioning', 'Garden / Patio'],
      finance: 'AFD - My First Home - 27 years',
      monthlyPayment: 'Gs. 5,625,168',
    },
    es: {
      title: 'Duplex Moderno (Detalles Estadounidense) En Villa Elisa',
      location: 'Villa Elisa, Central',
      price: 'Gs. 600,000,000',
      bedrooms: '3',
      bathrooms: '3',
      area: '130 m²',
      description: 'Lujoso Dúplex en Venta – Villa Elisa (límite con Asunción). Ubicado en una de las zonas más estratégicas y en crecimiento de Villa Elisa, a 5 minutos de Avda. Von Poleski y Americo Pico, a 5 minutos de la municipalidad, a 4 minutos del Supermercado Luisito. Ideal para vivir con comodidad, estilo y seguridad.',
      highlights: [
        'Terreno de 180 m² | Superficie construida: 130 m²',
        'Cochera para 3 vehículos grandes',
        'Amplia sala con baño social',
        'Diseños con detalles estadounidenses - único en este duplex',
        'Portón eléctrico para su conveniencia',
        'Comedor integrado a cocina moderna con aire acondicionado incluido',
        'Planta baja: Cochera para 3 vehículos • Amplia sala • Comedor y cocina integrados con AC e iluminación natural',
        'Planta alta: 3 dormitorios (1 en suite con baño privado), todos con terraza • Baño familiar',
      ],
      amenities: ['Box / Depósito', 'Parrillero / Barbacoa', 'Balcón / Terraza', 'Agua Caliente Central', 'Aire Acondicionado', 'Jardín / Patio'],
      finance: 'AFD - Mi Primera Vivienda - 27 años',
      monthlyPayment: 'Gs. 5,625,168',
    },
  };

  const currentLocale = (locale === 'es') ? 'es' : 'en';
  const data = aura[currentLocale];

  return (
    <>
      {/* Slider Card */}
      <div className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-slate-400 transition-all duration-300">
        {/* Image Slider */}
        <div className="relative h-40 md:h-64 w-full overflow-hidden bg-slate-100">
          <Image
            src={availableImages[currentImage]}
            alt={`${data.title} - Image ${currentImage + 1}`}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />

          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-sky-900/80 hover:bg-sky-900 text-white p-2 rounded-full transition"
            aria-label="Previous image"
          >
            &#10094;
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-sky-900/80 hover:bg-sky-900 text-white p-2 rounded-full transition"
            aria-label="Next image"
          >
            &#10095;
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-2 right-2 bg-slate-950/80 text-white px-3 py-1 rounded text-xs font-semibold">
            {currentImage + 1} / {totalImages}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 md:p-6">
          <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">{data.location}</span>
          <h3 className="text-lg md:text-xl font-bold text-slate-950 mt-1 group-hover:text-slate-700 transition line-clamp-2">
            {data.title}
          </h3>
          <p className="text-lg md:text-xl text-slate-700 font-light mt-4">{data.price}</p>

          {/* Quick Details */}
          <div className="mt-4 flex gap-4 text-xs md:text-sm text-slate-600 font-light border-t border-slate-200 pt-4">
            <span>🛏️ {data.bedrooms}</span>
            <span>🚿 {data.bathrooms}</span>
            <span>📐 {data.area}</span>
          </div>

          {/* View Details Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full mt-4 bg-sky-900 text-white hover:bg-sky-800 px-4 py-2 rounded font-medium transition text-sm"
          >
            {locale === 'es' ? 'Ver Detalles' : 'View Details'}
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-sky-900 text-white p-6 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{data.title}</h2>
                <p className="text-sky-100 mt-2">{data.location}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-2xl font-light hover:text-sky-100 transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Price and Basic Info */}
              <div className="border-b border-slate-200 pb-4">
                <p className="text-3xl font-bold text-slate-950">{data.price}</p>
                <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600 font-light">{locale === 'es' ? 'Dormitorios' : 'Bedrooms'}</p>
                    <p className="text-lg font-bold text-sky-900">{data.bedrooms}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 font-light">{locale === 'es' ? 'Baños' : 'Bathrooms'}</p>
                    <p className="text-lg font-bold text-sky-900">{data.bathrooms}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 font-light">{locale === 'es' ? 'Área' : 'Area'}</p>
                    <p className="text-lg font-bold text-sky-900">{data.area}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-bold text-slate-950 mb-2">{locale === 'es' ? 'Descripción' : 'Description'}</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-light">{data.description}</p>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="text-lg font-bold text-slate-950 mb-3">{locale === 'es' ? 'Características Destacadas' : 'Highlighted Features'}</h3>
                <ul className="space-y-2 text-sm text-slate-600 font-light">
                  {data.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-sky-900 font-bold mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-bold text-slate-950 mb-3">{locale === 'es' ? 'Comodidades' : 'Amenities'}</h3>
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 font-light">
                  {data.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-sky-900">✓</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financing */}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                <h3 className="text-sm font-bold text-sky-900 uppercase">{locale === 'es' ? 'Financiación' : 'Financing'}</h3>
                <p className="text-slate-700 text-sm mt-2">{data.finance}</p>
                <p className="text-slate-600 text-xs mt-1 font-light">{locale === 'es' ? 'Cuota mensual' : 'Monthly Payment'}: <span className="font-bold text-slate-950">{data.monthlyPayment}</span></p>
              </div>

              {/* CTA Button */}
              <a
                href="https://www.infocasas.com.py/duplex-moderno-detalles-estadounidense-en-villa-elisa/193595624"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-sky-900 text-white hover:bg-sky-800 px-6 py-3 rounded-lg font-medium transition text-center"
              >
                {locale === 'es' ? 'Ver en InfoCasas' : 'View on InfoCasas'}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
