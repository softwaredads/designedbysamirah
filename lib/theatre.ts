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

export const WHATSAPP_NUMBER = "447340879813";
export const WHATSAPP_DISPLAY = "+44 7340 879813";
export const MAILTO = "studio@designedbysamirah.com";

export function serviceMailto(categoryTitle: string) {
  return `mailto:${MAILTO}?subject=${encodeURIComponent(`Enquiry: ${categoryTitle}`)}`;
}

export function whatsappLink(message = "Hello, I'd like to make an enquiry.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function serviceWhatsApp(categoryTitle: string) {
  return whatsappLink(`Hello, I'd like to enquire about ${categoryTitle}.`);
}
