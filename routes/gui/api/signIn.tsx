import { MiddlewareHandlerContext } from "$fresh/server.ts";
import "https://deno.land/x/dotenv/load.ts";

import { Pool, PoolClient } from "https://deno.land/x/postgres/mod.ts";
import * as cookie from "https://deno.land/std/http/cookie.ts";

import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { key } from "../../../utils/key.ts";
import { create } from "https://deno.land/x/djwt/mod.ts";
import {
  QueryArrayResult,
  QueryObjectResult,
} from "https://deno.land/x/postgres@v0.16.1/query/query.ts";

//import * as postgres from "https://deno.land/x/postgres/mod.ts";

const POOL_CONNECTIONS = 3;
const pool = new Pool(Deno.env.get("DB_URI"), POOL_CONNECTIONS, true);
const connection = await pool.connect();

interface Ilogin {
  username: string;
  password: string;
}

interface State {
  data: string;
}

export const handler: Handler<any, { data: string }> = {
  async POST(
    req: Request,
    res: Response,
    ctx: MiddlewareHandlerContext<State>,
  ) {
    console.log("in signIn Handler");
    const body: Ilogin = await req.json();
    const { username, password } = body;

    // check if user exists, if user does not exist - return 404
    const checkUser: QueryObjectResult = await connection.queryObject(
      `
      SELECT * FROM users WHERE username = '${username}'
      `,
    );

    if (checkUser.rows.length > 0) {
      // TODO: set up JWT and redirect passing JWT
      const checkPW: boolean = await bcrypt.compare(
        password,
        checkUser.rows[0].password,
      );

      if (checkPW) {
        const payload = {
          id: checkUser.rows[0].id,
          username: checkUser.rows[0].username,
        };

        const jwt: string = await create(
          { alg: "HS512", typ: "JWT" },
          { payload },
          key,
        );

        if (jwt) {
          const res = new Response(
            JSON.stringify({
              id: checkUser.rows[0].id,
              username: checkUser.rows[0].username,
              token: jwt,
            }),
            { status: 200, headers: new Headers({}) },
          );

          cookie.setCookie(res.headers, {
            name: "jwt",
            value: jwt,
            httpOnly: true,
          });

          return res;
        } else {
          return new Response("Please Contact Your Administrator", {
            status: 404,
          });
        }
      } else {
        return new Response("Incorrect Credentials", { status: 404 });
      }
    } else {
      return new Response("Incorrect Credentials", { status: 404 });
    }
  },
};
