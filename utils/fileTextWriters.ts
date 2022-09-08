export const writeQueryText = (uri: string, userQueryStr: string): string => {
  userQueryStr = userQueryStr.replaceAll("‘", "'").replaceAll("’", "'");
  // console.log(userQueryStr);
  // const fullQueryString: string = userQueryStr.slice(0, -2) + '\'' + uri + '\'' + userQueryStr.slice(-2);
  return `
      const denogres = input \n
      const result = await denogres.${userQueryStr}; \n
      const stringified = JSON.stringify( \n
        result, \n
        (key, value) => typeof value === "bigint" ? value.toString() : value \n
      ); \n
      return stringified;
  `;
};
