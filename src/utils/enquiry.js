export const businessEmail = "worksdirectional@gmail.com";
export const whatsappNumber = "+91 9966966881";

export function whatsappUrl(serviceTitle, message) {
  const topic = serviceTitle ? ` about ${serviceTitle}` : "";
  const text = message?.trim() || `Hello Praveen, I visited the Directional Works website and would like to know more${topic}. Please share the available details.`;
  return `https://wa.me/919966966881?text=${encodeURIComponent(text)}`;
}

export function emailUrl(subject = "Directional Works enquiry", body = "") {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${businessEmail}?${params.toString()}`;
}
