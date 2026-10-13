export interface EmailParams {
  from_name: string;
  from_email: string;
  subject?: string;
  message: string;
}

export interface Web3FormsResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

const DEFAULT_ACCESS_KEY = "57d3fb23-1d4f-4b96-bc1a-e9040662d0fe";

/**
 * Sends a contact form message via Web3Forms API.
 */
export async function sendContactEmail(params: EmailParams): Promise<Web3FormsResponse> {
  let accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();

  // Fall back to the configured key if environment variable is missing or placeholder
  if (!accessKey || accessKey === "your_web3forms_access_key") {
    accessKey = DEFAULT_ACCESS_KEY;
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      name: params.from_name,
      email: params.from_email,
      subject: params.subject || "Portfolio Contact Inquiry",
      message: params.message,
      from_name: `${params.from_name} via Portfolio`,
    }),
  });

  const data: Web3FormsResponse = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to send message. Please try again.");
  }

  return data;
}
