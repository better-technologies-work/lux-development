import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { nombre, email, telefono, mensaje } = body;

    await resend.emails.send({
      from: "Lux Contact <contact@luxdevelopmentpy.com>",
      to: "luxdevelopmentpy@gmail.com",
      subject: "Nuevo mensaje desde la web",
      html: `
        <h2>Nuevo contacto</h2>
        <p><b>Nombre:</b> ${nombre}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Teléfono:</b> ${telefono}</p>
        <p><b>Mensaje:</b> ${mensaje}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("ERROR EN EMAIL:", error);

    return NextResponse.json(
      { error: "No se pudo enviar el email" },
      { status: 500 }
    );
  }
}