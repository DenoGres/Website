import { HandlerContext, Handlers } from "$fresh/server.ts";
import { Pool } from "https://deno.land/x/postgres/mod.ts";
// import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import * as cookie from "https://deno.land/std/http/cookie.ts";
// import { decode } from "https://deno.land/x/djwt/mod.ts";
import { QueryObjectResult } from "https://deno.land/x/postgres@v0.16.1/query/query.ts";
import "https://deno.land/x/dotenv/load.ts";
import formatQueryText from "../../../utils/formatQueryText.ts";

// interface Connection {
//   connectionName: string;
//   address: string;
//   port: string;
//   username: string;
//   defaultDB: string;
//   password: string;
// }

export const handler: Handlers = {
  // GET REQUEST
  async GET(req: Request, ctx: HandlerContext): Promise<Response> {
    try {
      const { connectionId } = cookie.getCookies(req.headers);
      console.log('getting queries for connection id:', connectionId);

      const POOL_CONNECTIONS = 3;
      const pool = new Pool(Deno.env.get("DB_URI"), POOL_CONNECTIONS, true);
      const connection = await pool.connect();

      const queryList: QueryObjectResult = await connection.queryObject(
        `
        SELECT * FROM queries WHERE connection_id = '${connectionId}'
      ;`,
      );
      console.log(queryList.rows);
      // close connection
      connection.end();

      return new Response(
        JSON.stringify(queryList.rows), 
        {status: 200,}
      );
    } catch (err) {
      return new Response(err, { status: 404 });
    }
  },

  // POST REQUEST
  async POST(req: Request, ctx: HandlerContext): Promise<Response> {
    console.log("in POST: handleQuerySave - POST");
    try {
      const { connectionId } = cookie.getCookies(req.headers);

      const POOL_CONNECTIONS = 3;
      console.log(Deno.env.get("DB_URI"));
      const pool = new Pool(Deno.env.get("DB_URI"), POOL_CONNECTIONS, true);
      const connection = await pool.connect();

      const { queryName, queryText } = await req.json();
      console.log('trying to add query:', connectionId, queryName, queryText);
      const formattedQuery = formatQueryText(queryText);
      console.log(formattedQuery);
      await connection.queryObject(
        `
        INSERT INTO queries (connection_id, query_name, query_text)
        VALUES ('${connectionId}', '${queryName}', (E'${formattedQuery}')::text)
      ;`,
      );

      console.log('after attempt');

      connection.end();

      return new Response("Successfully saved new query", {
        status: 200,
      });
    } catch (err) {
      return new Response(err, { status: 404 });
    }
  },

//   // PATCH REQUEST
//   async PATCH(req: Request, ctx: HandlerContext): Promise<Response> {
//     console.log("in POST: handleConnectionSave - PATCH");
//     try {
//       const cookies = cookie.getCookies(req.headers);

//       // if jwt exists, get user id from jwt, insert connection record
//       if (cookies.jwt) {
//         const [header, payload, signature] = decode(cookies.jwt);
//         const body = await req.json();
//         const {
//           connectionId,
//           connectionName,
//           address,
//           port,
//           username,
//           defaultDB,
//           password,
//         } = body;

//         const POOL_CONNECTIONS = 3;
//         const pool = new Pool(Deno.env.get("DB_URI"), POOL_CONNECTIONS, true);
//         const connection = await pool.connect();

//         await connection.queryObject(
//           `
//         UPDATE connections SET 
//         connection_name = '${connectionName}', connection_address ='${address}', port_number = ${port}, default_db = '${defaultDB}', db_username = '${username}', db_password = '${password}'
//         WHERE id = ${connectionId}
//       ;`,
//         );

//         connection.end();

//         return new Response("Successfully updated connection", {
//           status: 200,
//         });
//       }
//     } catch (err) {
//       return new Response(err, { status: 404 });
//     }
//   },

//   // POST REQUEST
//   async DELETE(req: Request, ctx: HandlerContext): Promise<Response> {
//     console.log("in POST: handleConnectionSave - DELETE");
//     try {
//       const cookies = cookie.getCookies(req.headers);

//       // if jwt exists, get user id from jwt, insert connection record
//       if (cookies.jwt) {
//         const body = await req.json();
//         const { connectionId } = body;

//         console.log(connectionId);

//         const POOL_CONNECTIONS = 3;
//         const pool = new Pool(Deno.env.get("DB_URI"), POOL_CONNECTIONS, true);
//         const connection = await pool.connect();

//         await connection.queryObject(
//           `
//           DELETE FROM connections WHERE id = '${connectionId}'
//         ;`,
//         );

//         connection.end();

//         return new Response("Successfully deleted new connection", {
//           status: 200,
//         });
//       }
//     } catch (err) {
//       return new Response(err, { status: 404 });
//     }
//   },
};
