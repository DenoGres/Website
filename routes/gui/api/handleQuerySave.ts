import { HandlerContext, Handlers } from "$fresh/server.ts";
import { Pool } from "https://deno.land/x/postgres/mod.ts";
import * as cookie from "https://deno.land/std/http/cookie.ts";
import { QueryObjectResult } from "https://deno.land/x/postgres@v0.16.1/query/query.ts";
import "https://deno.land/x/dotenv/load.ts";
import formatQueryText from "../../../utils/formatQueryTextToSave.ts";

export const handler: Handlers = {
  // GET REQUEST
  async GET(req: Request, ctx: HandlerContext): Promise<Response> {
    try {
      const { connectionId } = cookie.getCookies(req.headers);

      const POOL_CONNECTIONS = 3;
      const pool = new Pool(Deno.env.get("DB_URI"), POOL_CONNECTIONS, true);
      const connection = await pool.connect();

      const queryList: QueryObjectResult = await connection.queryObject(
        `
        SELECT * FROM queries WHERE connection_id = '${connectionId}'
      ;`,
      );
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
      const pool = new Pool(Deno.env.get("DB_URI"), POOL_CONNECTIONS, true);
      const connection = await pool.connect();

      const { queryName, queryText } = await req.json();
      const formattedQuery = formatQueryText(queryText);
      await connection.queryObject(
        `
        INSERT INTO queries (connection_id, query_name, query_text)
        VALUES ('${connectionId}', '${queryName}', (E'${formattedQuery}')::text)
      ;`,
      );

      connection.end();

      return new Response("Successfully saved new query", {
        status: 200,
      });
    } catch (err) {
      return new Response(err, { status: 404 });
    }
  },

  // PATCH REQUEST
  async PATCH(req: Request, ctx: HandlerContext): Promise<Response> {
    console.log("in PATCH: handleQuerySave - PATCH");
    try {
      const POOL_CONNECTIONS = 3;
      const pool = new Pool(Deno.env.get("DB_URI"), POOL_CONNECTIONS, true);
      const connection = await pool.connect();

      const { queryName, queryText, queryId } = await req.json();
      const formattedQuery = formatQueryText(queryText);
      console.log('trying to update queryID:', queryId, "querytext:", formattedQuery);
      await connection.queryObject(
        `
        UPDATE queries SET
        query_name = '${queryName}', query_text = (E'${formattedQuery}')::text
        WHERE id = ${queryId}
      ;`,
      );

      connection.end();

      return new Response("Successfully updated old query", {
        status: 200,
      });
    } catch (err) {
      return new Response(err, { status: 404 });
    }
  },

  // DELETE REQUEST
  async DELETE(req: Request): Promise<Response> {
    console.log("in POST: handleConnectionSave - DELETE");
    const cookies = cookie.getCookies(req.headers);
    try {
      if (cookies.jwt) {
        console.log('in try block');
        const POOL_CONNECTIONS = 3;
        const pool = new Pool(Deno.env.get("DB_URI"), POOL_CONNECTIONS, true);
        const connection = await pool.connect();

        const body = await req.json();
        console.log(body);
        const queryId = body.queryId;

        await connection.queryObject(
          `
          DELETE FROM queries WHERE id = '${queryId}'
        ;`,
        );

        connection.end();

        return new Response("Successfully deleted saved query", {
          status: 200,
        });
      }
    } catch (err) {
      return new Response(err, { status: 404 });
    }
    return new Response(JSON.stringify({ error: "error in middleware" }), {
      status: 404,
    });
  }
};
