import { MiddlewareHandlerContext } from "$fresh/server.ts";

interface State {
  data: string;
  uri: string;
}

const cache: any = {};

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  const reqBody = await req.json();
  switch (reqBody.task) {
    case 'validate uri': {
      cache['dbUri'] = reqBody.uri;
      ctx.state.uri = reqBody.uri;
      const response = await ctx.next();
      return response;
    }
    case 'run query': {
      ctx.state.uri = cache.dbUri
      const response = await ctx.next();
      return response;
    }
    case 'log out': {
      for (const key in cache) {
        delete cache[key];
      }
      return new Response(null, { status: 200 });
    }
    // default could be error handling once all endpoints are accounte for!
    default: {
      const response = await ctx.next();
      return response;
    }
  }
  // ctx.state.data = "myData";
  // const resp = await ctx.next();
  // resp.headers.set("server", "fresh server");
  // return resp;
}