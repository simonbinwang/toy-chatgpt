export async function* getAzureChatTokenGenerator(
  endpoint: string,
  apiKey: string,
  messages: { role: string; content: string }[]
) {
  const response = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo-0301",
      messages: messages,
      stream: true,
    }),
  });

  const reader = response.body
    ?.pipeThrough(new TextDecoderStream())
    .getReader();

  while (true) {
    const res = await reader?.read();
    if (res?.done) break;
    const lines =
      res?.value
        .toString()
        .split("\n")
        .filter((line) => line.trim() !== "") ?? [];
    for (const line of lines) {
      const message = line.replace(/^data: /, "");
      if (message === "[DONE]") {
        return; // Stream finished
      }
      if (!response.ok) {
        yield message;
      }
      try {
        const parsed = JSON.parse(message);
        // console.log("parsed", parsed);
        if (parsed.choices[0].delta.content) {
          yield parsed.choices[0].delta.content;
        }
        // yield parsed;
      } catch (error) {
        console.error("Could not JSON parse stream message", message, error);
      }
    }
  }
}
