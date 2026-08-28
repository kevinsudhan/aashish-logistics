"use client";

import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Field, Input, Textarea } from "@/components/ui/field";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { contact } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error";

/** Must match the form declared in public/__forms.html. */
const FORM_NAME = "quote";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = event.currentTarget;

    // Netlify Forms expects a URL-encoded body with the form name included.
    const body = new URLSearchParams();
    body.append("form-name", FORM_NAME);
    new FormData(form).forEach((value, key) => {
      if (typeof value === "string") body.append(key, value);
    });

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      // Only report success once Netlify has actually accepted the
      // submission. A failure here must not look like a delivered enquiry.
      if (!response.ok) {
        throw new Error(
          `We could not send your enquiry (error ${response.status}). Please email ${contact.email} or call us instead.`,
        );
      }

      form.reset();
      setStatus("success");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : `We could not send your enquiry. Please email ${contact.email} or call us instead.`,
      );
      setStatus("error");
    }
  }

  return (
    <Section id="contact" className="bg-mist">
      <Container>
        <div id="quote" className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          {/* ------------------------------------- Heading, copy, media */}
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="text-[1.75rem] leading-[1.12] tracking-[-0.025em] text-navy-900 sm:text-[2.125rem] lg:text-[2.75rem]">
                Start with the shipment.
              </h2>
              <p className="mt-6 max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted">
                Send us your details and a short note about what you need moved.
                An operations specialist will come back to you within one
                business day.
              </p>
            </Reveal>

            <Reveal delay={0.06} className="mt-10 lg:mt-12">
              <MediaPlaceholder
                label="QUOTE SECTION VIDEO"
                alt="Freight operations in motion across ocean, air and road"
                src="/media/quote-cta.mp4"
                type="video"
                ratio="16/9"
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="rounded-2xl"
              />
            </Reveal>
          </div>

          {/* ---------------------------------------------------- Form */}
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="rounded-2xl border border-rule bg-paper p-6 shadow-[0_1px_2px_rgba(11,27,40,0.04)] sm:p-9">
              {status === "success" ? (
                <div>
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-navy-900 text-white">
                    <Check className="size-5" />
                  </span>
                  <h3 className="mt-6 text-xl text-navy-900">
                    Your request has been received.
                  </h3>
                  <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-muted">
                    An operations specialist will respond shortly. For
                    time-critical cargo, contact the operations desk directly at{" "}
                    {contact.operations.email}.
                  </p>
                  <Button
                    variant="outline"
                    size="lg"
                    className="mt-8 w-full rounded-lg"
                    onClick={() => setStatus("idle")}
                  >
                    Submit another request
                  </Button>
                </div>
              ) : (
                <form
                  name={FORM_NAME}
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  noValidate={false}
                >
                  <input type="hidden" name="form-name" value={FORM_NAME} />
                  {/* Spam trap: hidden from people, filled in by bots. */}
                  <p className="hidden">
                    <label>
                      Leave this field empty
                      <input name="bot-field" tabIndex={-1} autoComplete="off" />
                    </label>
                  </p>

                  {/* Direct email route, offered before the fields */}
                  <div className="mb-8 border-b border-rule pb-6">
                    <p className="text-[0.9375rem] leading-relaxed text-navy-800">
                      Reach out to us at{" "}
                      <a
                        href={`mailto:${contact.email}`}
                        className="font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent"
                      >
                        {contact.email}
                      </a>{" "}
                      — or send us your details below.
                    </p>
                  </div>

                  <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
                  <Field label="Name" htmlFor="name" required>
                    <Input
                      id="name"
                      name="name"
                      autoComplete="name"
                      required
                      placeholder="Full name"
                    />
                  </Field>

                  <Field label="Phone" htmlFor="phone" required>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      placeholder="+00 000 000 0000"
                    />
                  </Field>

                  <Field
                    label="Email"
                    htmlFor="email"
                    required
                    className="sm:col-span-2"
                  >
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="name@company.com"
                    />
                  </Field>

                  <Field
                    label="Additional Message"
                    htmlFor="message"
                    className="sm:col-span-2"
                  >
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell us what you're moving, where it needs to go, and when it needs to arrive…"
                    />
                  </Field>
                  </div>

                  <p aria-live="polite" className="mt-5 text-sm text-accent">
                    {status === "error" && error ? error : null}
                  </p>

                  <Button
                    type="submit"
                    size="lg"
                    variant="primary"
                    disabled={status === "submitting"}
                    className="mt-8 w-full rounded-lg"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Sending
                      </>
                    ) : (
                      <>
                        Request a Quote
                        <ArrowRight />
                      </>
                    )}
                  </Button>

                  <p className="mt-4 text-center text-xs leading-relaxed text-faint">
                    Fields marked <span className="text-accent">*</span> are
                    required. We respond to enquiries within one business day.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
