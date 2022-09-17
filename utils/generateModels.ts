import { introspect } from "denogres-functions/introspect.ts"
import { createClassName } from "denogres-functions/StringFormat.ts";
import { Model } from "denogres/mod.ts";

// helper func to delete any keys in models that have value of false
// applies to k-v pairs such as "notNull: false" (i.e. no 'NOT NULL' constraint)
const deleteFalseKeys = (modelsObj: any) => {
  for (const key in modelsObj) {
    if (typeof modelsObj[key] === "object") {
      deleteFalseKeys(modelsObj[key]);
    }
    if (modelsObj[key] === false) {
      delete modelsObj[key];
    }
  }
  return modelsObj;
};

// return object containing all model classes given the db uri
// if "asText" option set to true, return a stringifiable models object for FE to render
export const generateModels = async (
  userUri: string,
  options?: { "asText": boolean },
): Promise<any> => {
  // introspect by default would attempt to load URI from env if not provided
  // here we explicitly check for missing URI and throw error
  if (!userUri) {
    return new Error("Please provide valid database URI to obtain models.");
  }

  const [tableListObj, enumObj] = await introspect(userUri);

  let modelsList: any = {};

  // iterate over all table objs, create each as a class extending Model
  // insert each into the "denogres" models object
  for (const key in tableListObj) {
    const className = createClassName(key);
    if (options?.asText) {
      modelsList[className] = {};
    } else {
      modelsList[className] = class extends Model {};
    }
    modelsList[className].table = key;
    modelsList[className].columns = tableListObj[key].columns;
  }

  modelsList = deleteFalseKeys(modelsList);

  /*
  iterate over all enum objs from db
  create each as an enum object and insert into "denogres" models object
  sample form of enum object: {"sad": 0, "ok": 1, "happy": 2, "0": "sad", "1": "ok", "2": happy}

  see https://stackoverflow.com/questions/20278095/enums-in-typescript-what-is-the-javascript-code-doing
  for example of implementing enum using the Immediately Invoked Function Expression (IIFE) pattern below
  further testing is needed to determine if this is (un)necessary
  */
  for (const key in enumObj) {
    const enumName = key[0].toUpperCase().concat(key.slice(1));
    let TempEnum: any;
    (function (TempEnum) {
      for (let i = 0; i < enumObj[key].length; i++) {
        TempEnum[enumObj[key][i]] = i;
        // for FE rendering as text, only need {0: sad, 1: ok} not the reverse ({sad: 0, ok: 1})
        if (options?.asText) {
          continue;
        }
        TempEnum[i] = enumObj[key][i];
      }
    })(TempEnum || (TempEnum = {}));
    // for FE rendering, will want to label enums as such
    if (options?.asText) {
      modelsList[`${enumName} (ENUM)`] = TempEnum;
    } else {
      modelsList[enumName] = TempEnum;
    }
  }
  return modelsList;
};
