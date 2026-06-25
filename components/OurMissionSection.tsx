"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function OurMissionSection() {
  const t = useTranslations("Home");

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <h2 className="text-xl font-bold tracking-[0.2em] text-[#0A4D8C] uppercase mb-4">
          {t("missionTag")}
        </h2>

        <h3 className="text-4xl md:text-5xl font-light text-slate-900 mb-10">
          {t("missionTitle")}
        </h3>

        <div className="space-y-8 text-lg md:text-xl text-slate-600 font-light leading-relaxed">
          <p>{t("missionParagraph1")}</p>
          

          <p className="text-2xl md:text-3xl text-slate-900 font-medium">
            {t("missionParagraph3")}
          </p>

          <p className="text-3xl md:text-4xl text-[#0A4D8C] font-light">
            {t("missionParagraph4")}
          </p>
        </div>

      </div>
    </section>
  );
}