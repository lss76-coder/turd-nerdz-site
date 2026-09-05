// Builds a clean, sectioned plain-text email body for the mailto: links
// used across the quote flow, contact form, referral form, and portal
// waitlist — so every lead that lands in the inbox reads the same way:
// a title, grouped fields with headers, and a footer signature.

export type EmailSection =
  | { title?: string; fields: Record<string, string | number>; raw?: never }
  | { title?: string; raw: string; fields?: never };

export function buildEmailBody(
  intro: string,
  sections: EmailSection[],
  footer = `Sent from theturdnerdz.com`
) {
  const parts = sections.map((section) => {
    const body = section.raw ?? Object.entries(section.fields ?? {}).map(([k, v]) => `${k}: ${v}`).join("\n");
    if (!section.title) return body;
    const rule = "-".repeat(section.title.length);
    return `${section.title}\n${rule}\n${body}`;
  });

  return [intro, "", parts.join("\n\n"), "", footer].join("\n");
}
