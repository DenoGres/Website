import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { generateModels } from "../../../utils/generateModels.ts";
export interface State {
  data: any;
  body: any;
  uri: string;
  connectionId: number;
  getTextModels: boolean;
}

const cache: any = {};

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  const reqBody = await req.json();
  switch (reqBody.task) {
    // validate uri by attempting to retrieve and cache db models
    // caching db models here instead of "next" handler 
    // since it seems like classes cannot be stringified and passed back in response
    case 'cache uri and validate': {
      cache['dbUri'] = reqBody.uri;
      cache['connectionId'] = reqBody.connectionId;
      try {
        cache['modelObj'] = await generateModels(cache.dbUri);
        console.log(cache);
        return new Response('Successfully cached database model.', { status: 200 });
      } catch (err) {
        return new Response(
          JSON.stringify([{ Error: `Failed to retrieve database models. Please check your database credentials.`}]),
          { status: 400 }
        );
      }
    }
    case 'get text models to render': {
      ctx.state.uri = cache.dbUri
      const response = await ctx.next();
      return response;
    }
    case 'save query': {
      ctx.state.uri = cache.dbUri
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
      console.log('in default case');
      ctx.state.body = reqBody;
      ctx.state.data = reqBody;
      const response = await ctx.next();
      return response;
    }
  }
  // ctx.state.data = "myData";
  // const resp = await ctx.next();
  // resp.headers.set("server", "fresh server");
  // return resp;
}