import { HandlerContext, Handlers } from "$fresh/server.ts";
import { writeQueryText } from "../../../utils/fileTextWriters.ts";
import { checkInput, extractType, IError } from "../../../utils/inputCheckers.ts";
import * as denogres from '../../../user/model.ts';

export const handler: Handlers = {
  async POST(req: Request, ctx: HandlerContext): Promise<Response> {

    // SEE DOCS HERE: https://deno.com/deploy/docs/runtime-fs had to remove file writeFileSync API's

    const uriFilePath = "../../user/uri.ts";
    // console.log(uriFilePath);

    // IMPORTANT: Outstanding issue with the import not working - disabled for now
    // const { userUri } = await import(uriFilePath);
    const queryStr: string = await req.json();

    // error handling
    const errorObj: IError | null = await checkInput(queryStr);
    if (errorObj) {
      return new Response(JSON.stringify([errorObj]));
    }

    const queryType: string = extractType(queryStr);
    
    // TODO: need to fix this writeQueryText - put a placeholder for now
    const fileStr = writeQueryText('abcde', queryStr)
    
    // Async Constructor - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction
    const AsyncFunction = (async function () {}).constructor;
    
    // construct the new function (as opposed to writing it to a separate file)
    const newFunc = new AsyncFunction('input', fileStr);

    // evaluate the function, passing in the denogres models
    const response = await newFunc(denogres);
  
    if (queryType === "insert") {
      return new Response(JSON.stringify([{
        Success: `
        Inserted record into database.
      `,
      }]));
    }
    if (queryType === "edit") {
      return new Response(JSON.stringify([{
        Success: `
        Updated record(s) in database.
      `,
      }]));
    }
    if (queryType === "delete") {
      return new Response(JSON.stringify([{
        Success: `
        Deleted record(s) from database.
      `,
      }]));
    }

    // const test = [{a: 'test'}]
    return new Response(response);
  },
};
