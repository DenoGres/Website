import { HandlerContext } from "$fresh/server.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { create } from "https://deno.land/x/djwt/mod.ts";
import { Pool, PoolClient } from "https://deno.land/x/postgres/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
import {
  QueryArrayResult,
  QueryObjectResult,
} from "https://deno.land/x/postgres@v0.16.1/query/query.ts";

//import * as postgres from "https://deno.land/x/postgres/mod.ts";

const POOL_CONNECTIONS = 3;
const pool = new Pool(Deno.env.get("DB_URI"), POOL_CONNECTIONS, true);
const connection = await pool.connect();

export interface Ilogin {
  username: string;
  password: string;
}

export const handler: Handler<any, { data: string }> = {
  async POST(req: Request, res: Response, ctx: HandlerContext) {
    const body: Ilogin = await req.json();
    const { username, password } = body;
    const salt: string = await bcrypt.genSalt(8);
    const hashedPW: string = await bcrypt.hash(password, salt);

    // write to DB
    const checkUser: QueryObjectResult = await connection.queryObject(
      `
      SELECT * FROM users WHERE username = '${username}'
      `,
    );

    if (checkUser.rows.length === 0) {
      // TODO: set up JWT and redirect passing JWT
      const result: QueryArrayResult = await connection.queryObject(
        `INSERT INTO users (username, password) VALUES ('${username}', '${hashedPW}')`,
      );
      return new Response(JSON.stringify({ username, password }), {
        status: 201,
      });
    }
  },
};
