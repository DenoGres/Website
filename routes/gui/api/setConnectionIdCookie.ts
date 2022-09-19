import { HandlerContext, Handlers } from "$fresh/server.ts";
import * as cookie from "cookie/cookie.ts";

// when user connects to valid uri, set connectionId as cookie
// to associate query CRUD under the db uri
// can extract all cookie functionality into one module in future
export const handler: Handlers = {
  async POST(req: Request, _ctx: HandlerContext): Promise<Response> {
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
  },
};
