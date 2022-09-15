import { HandlerContext, Handlers } from "$fresh/server.ts";
import * as cookie from "https://deno.land/std/http/cookie.ts";

export const handler: Handlers = {
  // GET REQUEST
  async POST(req: Request, ctx: HandlerContext): Promise<Response> {
    const { connectionId } = await req.json();
    const res = new Response(
      null,
      { status: 200, headers: new Headers({}) },
    );
    cookie.setCookie(res.headers, {
      name: "connectionId",
      value: connectionId,
      path: "/",
      httpOnly: true,
    });
    return res;
  }
};