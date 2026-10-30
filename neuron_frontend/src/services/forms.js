const FALLBACK_ERROR = "We could not send your request right now. Please try again in a moment.";

/**
 * Saves a website form submission. `type` is the record collection, e.g. "callbacks".
 * Resolves with the server's thank-you message.
 */
export async function submitForm(type, data) {
  let response;
  try {
    response = await fetch(`/api/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...data, sourcePage: window.location.pathname }),
    });
  } catch {
    throw new Error(FALLBACK_ERROR);
  }

  let body = {};
  try {
    body = await response.json();
  } catch {
    body = {};
  }
  if (!response.ok) throw new Error(body.message || FALLBACK_ERROR);
  return body.message || "Thank you! We have received your request.";
}
