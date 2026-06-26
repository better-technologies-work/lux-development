"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface Props {
  imageSrc: string;
}

export default function OurMissionSection({ imageSrc }: Props) {
  const t = useTranslations("Home");

  return (
    <>
      <style>{`
        .mission-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 5rem 1.5rem;
        }

        .mission-inner {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 3rem;
          align-items: start;
        }

        .mission-image-wrap {
          position: sticky;
          top: 6rem;
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: 20px;
          overflow: hidden;
        }

        .mission-image-wrap img {
          object-fit: cover;
        }

        .mission-tag {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: #0A4D8C;
          margin: 0 0 1rem;
        }

        .mission-title {
          font-size: clamp(28px, 4vw, 42px);
          color: #0f172a;
          margin: 0 0 2rem;
          line-height: 1.3;
        }

        .mission-p1 {
          font-size: 17px;
          color: #475569;
          margin: 0 0 2rem;
          line-height: 1.8;
        }

        .mission-p3 {
          font-size: clamp(20px, 2.5vw, 26px);
          color: #0f172a;
          font-weight: 500;
          margin: 2rem 0 1rem;
          line-height: 1.5;
        }

        .mission-p4 {
          font-size: clamp(22px, 3vw, 32px);
          color: #0A4D8C;
          margin: 0;
          line-height: 1.35;
        }

        .mobile-image {
          display: none;
        }

        @media (max-width:768px){

          .mission-section{
            padding:3rem 1.5rem;
          }

          .mission-inner{
            display:block;
          }

          .desktop-image{
            display:none;
          }

          .mobile-image{
            display:block;
            position:relative;
            width:100%;
            height:260px;
            margin:2rem 0;
            border-radius:20px;
            overflow:hidden;
          }

          .mission-title{
            margin-bottom:1.5rem;
          }

          .mission-p1{
            margin-bottom:0;
          }

          .mission-p3{
            margin-top:0;
          }
        }
      `}</style>

      <section className="mission-section">
        <div className="mission-inner">

          {/* Imagen Desktop */}
          <div className="mission-image-wrap desktop-image">
            <Image
              src={imageSrc}
              alt="Casa moderna en Paraguay — Lux Development"
              fill
              className="object-cover"
              sizes="40vw"
            />
          </div>

          {/* Texto */}
          <div>

            <p className="mission-tag">
              {t("missionTag")}
            </p>

            <h2 className="mission-title">
              {t("missionTitle")}
            </h2>

            <p className="mission-p1">
              {t("missionParagraph1")}
            </p>

            {/* Imagen Mobile */}
            <div className="mobile-image">
              <Image
                src={imageSrc}
                alt="Casa moderna en Paraguay — Lux Development"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>

            <p className="mission-p3">
              {t("missionParagraph3")}
            </p>

            <p className="mission-p4">
              {t("missionParagraph4")}
            </p>

          </div>

        </div>
      </section>
    </>
  );
}