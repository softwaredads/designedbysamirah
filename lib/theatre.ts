export const servicesHeadline = "What do you need?";

export const servicesHint =
  "Tap a service below — or Enquire anytime from the header.";

export const servicesScopeNote = "Full studio scope available on request";

export const servicesNote =
  "London · International projects · By appointment only";

export const serviceEnquireCta = "Enquire about this";

export const contactHeadline = "Begin a commission";

export const contactLine =
  "For private commissions and studio inquiries — by appointment only.";

export const contactResponse =
  "We aim to respond within two business days.";

export const contactCta = "Enquire by email";

export const swipeHint = "Swipe or use arrows to explore";

export const MAILTO = "studio@designedbysamirah.com";

export function serviceMailto(categoryTitle: string) {
  return `mailto:${MAILTO}?subject=${encodeURIComponent(`Enquiry: ${categoryTitle}`)}`;
}
