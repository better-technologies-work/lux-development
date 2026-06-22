"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function WhoWeHelpSection() {
  const t = useTranslations("Home");

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-xl font-bold tracking-[0.2em] text-[#0A4D8C] uppercase mb-4">
          {t("whoWeHelpTag")}
        </h2>

        <h3 className="text-4xl md:text-5xl font-light text-slate-900 max-w-4xl mb-16">
          {t("whoWeHelpTitle")}
        </h3>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Card 1 */}
          <div className="p-8 rounded-2xl border border-slate-200 hover:shadow-xl hover:-translate-y-1 hover:border-[#0A4D8C] transition-all duration-300">
            <h4 className="text-2xl font-semibold text-slate-900 mb-3">
              {t("audience1Title")}
            </h4>
            <p className="text-slate-600 font-light leading-relaxed">
              {t("audience1Description")}
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-2xl border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <h4 className="text-2xl font-semibold text-slate-900 mb-3">
              {t("audience2Title")}
            </h4>
            <p className="text-slate-600 font-light leading-relaxed">
              {t("audience2Description")}
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-2xl border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <h4 className="text-2xl font-semibold text-slate-900 mb-3">
              {t("audience3Title")}
            </h4>
            <p className="text-slate-600 font-light leading-relaxed">
              {t("audience3Description")}
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-8 rounded-2xl border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <h4 className="text-2xl font-semibold text-slate-900 mb-3">
              {t("audience4Title")}
            </h4>
            <p className="text-slate-600 font-light leading-relaxed">
              {t("audience4Description")}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}