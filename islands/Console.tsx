import { useEffect, useState } from "preact/hooks";
import Record from "../components/Record.tsx";

export interface IQueryObject {
  queryName: string;
  queryText: string;
  queryId?: number;
}

interface IModelDisplayRowObject {
  level: number;
  content: string;
}

export default function Console() {
  //TODO: Currently state here is set as dummy data
  const [showModal, setShowModal] = useState<boolean>(false);
  const [queryName, setQueryName] = useState<string>("");
  const [queryText, setQueryText] = useState<string>("");
  const [queryId, setQueryId] = useState<number>(-1);

  const [records, setRecords] = useState<object[]>([]);
  const [queriesList, setQueriesList] = useState<any[]>([]);
  const [modelNames, setModelNames] = useState<string[]>([]);
  const [modelContent, setModelContent] = useState<object[]>([]);
  const [indexToDisplay, setIndexToDisplay] = useState<number>(-1);
  const [queryType, setQueryType] = useState<string>("new");

  const getModels = async (): Promise<any> => {
    const res = await fetch("/gui/api/handleQueryRun", {
      method: "POST",
      body: JSON.stringify({ getTextModels: true }),
    });
    if (res.status === 400) {
      return;
    }
    const parsed = await res.json();
    return [parsed[0], parsed[1]];
  };

  // on first load, make GET request to retrieve models names & content to display
  useEffect(() => {
    const getModelsToDisplay = async (): Promise<void> => {
      const [names, content] = await getModels();
      setModelNames(names);
      setModelContent(content);
    };
    getModelsToDisplay();
  }, []);

  // on first load, make GET request to retrieve saved queries from DB
  useEffect(() => {
    const getQueriesToDisplay = async (): Promise<void> => {
      const response = await fetch("/gui/api/handleQuerySave");
      const queries = await response.json();
      console.log(queries);
      const sortedList = queries.sort((a: any, b: any) => b.id - a.id);
      setQueriesList(sortedList);
    };
    getQueriesToDisplay();
  }, []);

  // ----EVENT LISTENERS -----

  // Saves query in external DB
  const handleSave = async (e: MouseEvent): Promise<void> => {
    e.preventDefault();
    const method = (queryType === "new") ? "POST" : "PATCH";
    const newQuery: IQueryObject = (queryType === "new") ? 
      {
        queryName,
        queryText,
      } :
      {
        queryName,
        queryText,
        queryId 
      };
    console.log(newQuery);
    await fetch("/gui/api/handleQuerySave", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuery),
    });
    window.location.reload();
  };

  // Deletes current query from external DB
  const handleDelete = async (e: MouseEvent): Promise<void> => {
    e.preventDefault();
    const reqBody = {
      queryId
    };
    console.log(reqBody);
    await fetch("/gui/api/handleQuerySave", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    });
    window.location.reload();
  };

  // Runs query and updates state to render result
  const handleRun = async (e: MouseEvent) => {
    e.preventDefault();
    const bodyObj = {
      queryText,
    };
    const res = await fetch("/gui/api/handleQueryRun", {
      method: "POST",
      body: JSON.stringify(bodyObj),
    });
    const data: object[] = await res.json();
    setRecords(data);
  };

  // map saved queries to display components
  const savedQueries = queriesList.map((ele, idx) => {
    return (
      <button
        key={idx}
        className="bg-deno-blue-100 text-sm shadow-sm p-3 my-1 font-medium tracking-wider text-gray-600 rounded text-left"
        type="button"
        onClick={(e) => {
          setQueryName(ele.query_name);
          setQueryText(ele.query_text);
          setQueryId(ele.id);
          setQueryType("old");
        }}
      >
        {ele.query_name}
      </button>
    );
  });

  // map data rows to row components in results
  const queryRows = records.map((ele) => {
    let results = [];

    for (const [key, value] of Object.entries(ele)) {
      const keyStr = key;
      const valStr = value;
      results.push(keyStr + " : " + valStr);
    }

    results = results.map((ele) => <li>{ele}</li>);

    return (
      <Record>
        <ul>{results}</ul>
      </Record>
    );
  });

  // map retrieved model names to buttons that open modal on click
  const activeModelNames = modelNames.map((ele, idx) => {
    return (
      <button
        key={idx}
        className={`bg-deno-blue-100 text-sm shadow-sm p-3 my-1 font-medium tracking-wider text-gray-600 rounded text-left`}
        type="button"
        onClick={() => {
          setShowModal(true);
          setIndexToDisplay(idx);
        }}
      >
        {ele}
      </button>
    );
  });

  // map retrieved model content to an array of records
  const activeModelContent = modelContent.map((ele) => {
    let results: any[] = [];

    // IIFE to generate arrays of objects representing each row to be rendered
    // each object has level (num) indicating indentation, and content (string)
    (function generateTextRowObjs(
      arr,
      obj,
      level = 0,
      recurse = false,
    ): IModelDisplayRowObject[] {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "object") {
          // if value is obj, add key name and curly braces on current indentation level
          // and recursively call function at level + 1
          // n.b. need to 'backtrack' and reset to prev. indent level
          arr.push({ level, content: `${String(key)} : {` });
          level++;
          arr.push(...generateTextRowObjs([], value, level, true));
          level--;
          arr.push({ level, content: "}" });
        } else {
          // else if value is primitive, check if we are in a recursive call
          // if so, need to add 1 indent level to k-v string
          if (recurse) {
            level++;
            arr.push({ level, content: `${String(key)} : ${String(value)}` });
            level--;
          } else {
            arr.push({ level, content: `${String(key)} : ${String(value)}` });
          }
        }
      }
      return arr;
    })(results, ele);

    // map results to JSX elements with proper left-margin
    results = results.map((ele) => {
      const leftMarginClass = `mx-${ele.level}`;
      return <li className={`${leftMarginClass}`}>{ele.content}</li>;
    });

    return (
      <div
        className={`bg-gray-100 m-3 p-5 pr-10 max-h-60 overflow-y-auto text-gray-700 text-xs font-mono rounded`}
      >
        <ul>{results}</ul>
      </div>
    );
  });

  // Tailwind CSS styling - for textArea;
  const textArea =
    "bg-gray-50 appearance-none border-1 border-gray-200 rounded p-2 my-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-xs font-mono";

  return (
    <div className="w-full flex flex-row">
      <div className="w-5/12 bg-white rounded mx-3">
        <div className="h-2/4 p-3 flex flex-col items-center">
          <h2 className="mb-3">Saved Queries</h2>
          <div className="flex flex-col w-full overflow-y-auto">
            {savedQueries}
          </div>
        </div>
        <div className="flex flex-col items-center p-3 h-2/4">
          <h2 className="mb-3">Active Models</h2>
          <div className="flex flex-col w-full overflow-y-auto">
            {activeModelNames}
          </div>
          {
            /* <button
            type="button"
            className="bg-gray-300 px-5 mx-1 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-600 rounded-full hover:shadow-2xl hover:bg-gray-400"
            onClick={() => setShowModal(true)}
          >
            Import Model File
          </button> */
          }
          {/* <--------Import Model File MODAL--------> */}
          {showModal
            ? (
              <div>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto px-20 max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 rounded-t">
                        <h2 className="text-xl font-semibold">
                          {/* Import Model File */}
                          {modelNames[indexToDisplay]}
                        </h2>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                        </button>
                      </div>
                      {/*body*/}
                      {
                        /* <div className="relative px-6 flex-auto">
                        <textarea
                          className={textArea}
                          onInput={(e) => {
                            setModelText(e.currentTarget.value);
                          }}
                          value={modelText}
                          id="queryInput"
                          name="queryInput"
                          rows={20}
                          cols={70}
                        />
                      </div> */
                      }
                      {activeModelContent[indexToDisplay]}
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-solid border-slate-200 rounded-b">
                        {
                          /* <button
                          className="bg-gray-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-300"
                          type="button"
                          onClick={handleModelSave}
                        >
                          Save
                        </button> */
                        }
                        <button
                          className="bg-gray-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-300"
                          type="button"
                          onClick={() => {
                            setShowModal(false);
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
            : null}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col h-2/4 bg-white p-3 mb-3 rounded">
          <h2>
            Query Console
          </h2>
          <div className="my-1">
            <label className="mr-1">
              Query Name:
            </label>
            <input
              className={textArea}
              onInput={(e) => {
                setQueryName(e.currentTarget.value);
              }}
              value={queryName}
            >
            </input>
          </div>
          <textarea
            className={textArea}
            onInput={(e) => {
              setQueryText(e.currentTarget.value);
            }}
            value={queryText}
            id="queryInput"
            name="queryInput"
            rows={8}
            cols={10}
          />
          <div className="flex flex-row justify-end">
            <button
              type="button"
              className="bg-deno-pink-100 px-5 mx-1 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-600 rounded-full hover:shadow-2xl hover:bg-deno-pink-200"
              onClick={handleSave}
            >
              {(queryType === "new") ? "Save" : "Update"}
            </button>
            <button
            type="button"
            className={"bg-gray-300 px-5 mx-1 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-600 rounded-full hover:shadow-2xl hover:bg-gray-400" +
              ((queryType === "new") ? " hidden" : "")}
            onClick={handleDelete}
          >
            Delete
          </button>
            <button
              className="bg-deno-blue-100 px-5 mx-1 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-600 rounded-full hover:shadow-2xl hover:bg-deno-blue-200"
              onClick={handleRun}
            >
              Run
            </button>
          </div>
        </div>
        <div className="bg-white h-full rounded p-3 overflow-y-scroll flex flex-col">
          <h2 className="mb-3">Results</h2>
          {queryRows}
        </div>
      </div>
    </div>
  );
}
