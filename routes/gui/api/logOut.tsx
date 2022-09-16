import { HandlerContext } from "$fresh/server.ts";
import * as cookie from "cookie/cookie.ts";

export const handler = {
  GET(
    _req: Request,
    _res: Response,
    _ctx: HandlerContext,
  ): Response {
    try {
      const res = new Response(
        "Delete Cookies",
        { status: 200, headers: new Headers({}) },
      );

      cookie.setCookie(res.headers, {
        name: "jwt",
        value: "",
        path: "/",
        httpOnly: true,
      });

      cookie.setCookie(res.headers, {
        name: "connectionId",
        value: "",
        path: "/",
        httpOnly: true,
      });

      return res;
    } catch (err) {
      return new Response(
        JSON.stringify({ err }),
        { status: 404 },
      );
    }
  },
};
