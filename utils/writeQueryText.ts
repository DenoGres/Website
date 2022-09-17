// write the body of AsyncFunction to run query based on user input
export default function (uri: string, userQueryStr: string): string {
  // replace any weirdly formatted quotation marks from webview to single quotes
  userQueryStr = userQueryStr
    .replaceAll('‘', '\'')
    .replaceAll('’', '\'')
    .replaceAll('“', '"');
  const fullQueryString: string = userQueryStr.slice(0, -2) + '\'' + uri + '\'' + userQueryStr.slice(-2);

  return `
    const denogres = input \n
    const result = await denogres.${fullQueryString}; \n
    const stringified = JSON.stringify( \n
      result, \n
      (key, value) => typeof value === "bigint" ? value.toString() : value \n
    ); \n
    return stringified;
  `;
};