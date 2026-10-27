export async function GET() {
  const source = "https://srv.adstxtmanager.com/19390/vantezzen.io";
  const googleLine =
    "google.com, pub-8508732166185621, DIRECT, f08c47fec0942fa0";

  const response = await fetch(source);
  const text = await response.text();

  if (!text.includes(googleLine)) {
    const updatedText = `${text.trim()}\n${googleLine}`;
    return new Response(updatedText, {
      headers: { "Content-Type": "text/plain" },
    });
  }

  return new Response(text, {
    headers: { "Content-Type": "text/plain" },
  });
}
