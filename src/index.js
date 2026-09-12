export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/write" && request.method === "POST") {
      const { prompt } = await request.json();

      if (!prompt) {
        return Response.json(
          { error: "Prompt required" },
          { status: 400 }
        );
      }

      const result = await env.AI.run(
        "@cf/google/gemma-4-26b-a4b-it",
        { prompt }
      );

      return Response.json(result);
    }

    return env.ASSETS.fetch(request);
  }
};
