import emailjs from "@emailjs/browser";

export interface EmailParams {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

/**
 * Sends a contact form message via EmailJS.
 */
export async function sendContactEmail(params: EmailParams): Promise<void> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || serviceId === "your_service_id") {
    throw new Error(
      "EmailJS Service ID is missing. Please set NEXT_PUBLIC_EMAILJS_SERVICE_ID in .env.local"
    );
  }

  if (!templateId || templateId === "your_template_id") {
    throw new Error(
      "EmailJS Template ID is missing. Please set NEXT_PUBLIC_EMAILJS_TEMPLATE_ID in .env.local"
    );
  }

  if (!publicKey || publicKey === "your_public_key") {
    throw new Error(
      "EmailJS Public Key is missing. Please set NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env.local"
    );
  }

  const response = await emailjs.send(
    serviceId,
    templateId,
    {
      from_name: params.from_name,
      from_email: params.from_email,
      subject: params.subject,
      message: params.message,
    },
    publicKey
  );

  if (response.status !== 200) {
    throw new Error(`Failed to send email. Status code: ${response.status}`);
  }
}
