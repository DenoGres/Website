import { HandlerContext, Handlers } from "$fresh/server.ts";

// obtain connection uri string and write file in user folder
export const handler: Handlers = {
  async POST(req: Request, ctx: HandlerContext): Promise<Response> {
    const uriText: string = await req.json();
    const uriFileText = `export const userUri = '${uriText}';`;
    const path: string = "./user/uri.ts";
    Deno.writeTextFileSync(path, uriFileText);

    return new Response("Successfully saved connection URI.", { status: 200 });
  },
};
