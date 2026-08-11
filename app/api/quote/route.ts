import { NextResponse } from "next/server";

/**
 * Quote request endpoint.
 *
 * This validates and accepts the submission but does not yet deliver it
 * anywhere. Before go-live, replace the marked block with your transport of
 * choice (CRM webhook, transactional email, ticketing queue) — the request
 * shape below is already stable.
 */

type QuotePayload = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const REQUIRED: Array<keyof QuotePayload> = ["name", "phone", "email"];

export async function POST(request: Request) {
  let body: Partial<QuotePayload>;

  try {
    body = (await request.json()) as Partial<QuotePayload>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const missing = REQUIRED.filter((field) => !body[field]?.toString().trim());
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}.` },
      { status: 422 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email))) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 422 },
    );
  }

  // ---------------------------------------------------------------------
  // TODO(delivery): forward the enquiry to its destination.
  //   e.g. await fetch(process.env.CRM_WEBHOOK_URL, { method: "POST", ... })
  //        await sendMail({ to: process.env.SALES_INBOX, ... })
  // Until this is wired, submissions are acknowledged and logged only.
  // ---------------------------------------------------------------------
  console.info("[quote-request] received", {
    name: body.name,
    email: body.email,
    phone: body.phone,
    hasMessage: Boolean(body.message?.trim()),
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
