import { useEffect, useState } from "preact/hooks";
import throttle from "../utils/throttle.ts";

export interface IConnectionObject {
  id: number;
  user_id: number;
  connection_name: string;
  connection_address: string;
  port_number: number;
  default_db: string;
  db_username: string;
  db_password: string;
}
export interface ErrorMessage {
  Error: string;
}

export interface ModalStatus {
  show: boolean;
  text: string;
}

// list of saved connections
export default function Connections() {
  const [connectList, setConnectList] = useState<IConnectionObject[]>([]);
  const [connectionId, setConnectionId] = useState<number>();
  const [connectionName, setConnectionName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [port, setPort] = useState<number>();
  const [defaultDB, setDefaultDB] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage[]>([]);
  const [connectionType, setConnectionType] = useState<string>("new");

  // function to retrieve list of connections to render
  const getData = async (): Promise<void> => {
    const response = await fetch("/gui/api/handleConnectionSave");
    const data = await response.json();
    setConnectList(data);
  };

  // render connection list on first load
  useEffect(() => {
    getData();
  }, []);

  // function to reset state for all fields
  const resetAllFields = (): void => {
    setConnectionId(NaN);
    setConnectionName("");
    setAddress("");
    setPort(NaN);
    setDefaultDB("");
    setUsername("");
    setPassword("");
    setConnectionType("new");
  };

  // <------------ EVENT LISTENERS ------------>

  // on clicking connect, attempt to validate uri by retrieving models
  // if successful, cache uri and models in handleRequests for further queries
  const handleUriSaveAndRedirect = async (): Promise<void> => {
    const uriText =
      `postgres://${username}:${password}@${address}/${defaultDB}`;
    const reqBody = {
      uri: uriText,
      task: "cache uri and validate",
    };
    await fetch("/gui/api/setConnectionIdCookie", {
      method: "POST",
      body: JSON.stringify({ connectionId }),
    });
    const response = await fetch("/gui/api/handleRequests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    });
    if (response.status === 400) {
      const error = await response.json();
      setErrorMessage(error);
      displayErrorModal();
      return;
    }
    window.location.href = "/gui/explorer";
  };

  // create throttled versions of handler
  const throttledHandleUriSaveAndRedirect = throttle(
    handleUriSaveAndRedirect,
    1000,
  );

  const displayErrorModal = (): void => {
    setShowErrorModal(true);
  };

  // <------------ LIST OF CONNECTIONS ------------>
  function connectionsList() {
    const connections = connectList.map((ele, idx) => {
      return (
        <button
          key={idx}
          className="text-sm shadow-sm font-medium text-gray-600 text-left flex-1 p-3 bg-deno-blue-100 tracking-wider rounded flex flex-row justify-between my-1"
          type="button"
          onClick={() => {
            setConnectionId(ele.id);
            setConnectionName(ele.connection_name);
            setAddress(ele.connection_address);
            setPort(ele.port_number);
            setDefaultDB(ele.default_db);
            setUsername(ele.db_username);
            setPassword(ele.db_password);
            setConnectionType("old");
          }}
        >
          {ele.connection_name}
        </button>
      );
    });

    return (
      <div className="flex flex-col">
        {connections}
      </div>
    );
  }

  // <------------ CONNECTION FORM ------------>
  function connectionForm(type: string) {
    const labelStyle = "py-1";
    const inputStyle =
      "my-1 py-2 px-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12";

    const handleClick = async (): Promise<void> => {
      const method = (connectionType === "new") ? "POST" : "PATCH";

      const reqBody = {
        connectionId,
        connectionName,
        address,
        port,
        username,
        defaultDB,
        password,
      };

      await fetch("/gui/api/handleConnectionSave", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });
      getData();
      resetAllFields();
    };

    const handleDelete = async (): Promise<void> => {
      const reqBody = {
        connectionId,
      };

      const deleteConnection = await fetch("/gui/api/handleConnectionSave", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });
      getData();
      resetAllFields();
    };

    // create throttled versions of handlers
    const throttledHandleClick = throttle(handleClick, 1000);
    const throttledHandleDelete = throttle(handleDelete, 1000);

    return (
      <form className="flex flex-col my-5 py-5">
        <label className={labelStyle}>Connection Name:</label>
        <input
          className={inputStyle}
          onInput={(e) => setConnectionName(e.currentTarget.value)}
          value={connectionName}
        >
        </input>
        <label className={labelStyle}>HostName/Address :</label>
        <input
          className={inputStyle}
          onInput={(e) => setAddress(e.currentTarget.value)}
          value={address}
        >
        </input>
        <label className={labelStyle}>Port Number:</label>
        <input
          type="number"
          className={inputStyle}
          onInput={(e) => setPort(e.currentTarget.valueAsNumber)}
          value={port}
        >
        </input>
        <label className={labelStyle}>Default DB:</label>
        <input
          className={inputStyle}
          onInput={(e) => setDefaultDB(e.currentTarget.value)}
          value={defaultDB}
        >
        </input>
        <label className={labelStyle}>UserName:</label>
        <input
          className={inputStyle}
          onInput={(e) => setUsername(e.currentTarget.value)}
          value={username}
        >
        </input>
        <label className={labelStyle}>Password:</label>
        <input
          className={inputStyle}
          onInput={(e) => setPassword(e.currentTarget.value)}
          value={password}
          type="password"
        >
        </input>
        <div className="flex flex-row py-5">
          <button
            type="button"
            className="bg-gray-300 px-5 mx-1 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-600 rounded-full hover:shadow-2xl hover:bg-gray-400 hidden"
          >
            Test Connection
          </button>
          <button
            onClick={throttledHandleClick}
            type="button"
            className="bg-deno-pink-100 px-5 mx-1 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-600 rounded-full hover:shadow-2xl hover:bg-deno-pink-200"
          >
            {(connectionType === "new") ? "Create" : "Update"}
          </button>
          <button
            type="button"
            className={"bg-gray-300 px-5 mx-1 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-600 rounded-full hover:shadow-2xl hover:bg-gray-400" +
              ((connectionType === "new") ? " hidden" : "")}
            onClick={throttledHandleDelete}
          >
            Delete
          </button>
          <button
            type="button"
            className={"bg-deno-blue-100 px-5 mx-1 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-600 rounded-full hover:shadow-2xl hover:bg-deno-blue-200" +
              ((connectionType === "new") ? " hidden" : "")}
            onClick={throttledHandleUriSaveAndRedirect}
          >
            Connect
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="w-full flex flex-row">
      <div className="w-5/12 bg-white rounded mx-3 p-3 items-center">
        <h2 className="mb-3 text-center">Connections List</h2>
        {connectionsList()}
        <button
          className="text-sm shadow-sm font-medium text-gray-600 text-left w-full p-3 bg-deno-pink-100 tracking-wider rounded flex flex-row justify-between my-1"
          type="button"
          onClick={resetAllFields}
        >
          Add New Connection
        </button>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col h-full bg-white p-3 rounded">
          <div>
            <h2>Connection Details</h2>
            {connectionForm("existing")}
          </div>
        </div>
      </div>
      {/* <--------Import Model File MODAL--------> */}
      {showErrorModal
        ? (
          <div>
            <div
              className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-non`}
            >
              <div className={`relative w-auto my-6 mx-auto max-w-3xl`}>
                {/*content*/}
                <div
                  className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none`}
                >
                  {/*header*/}
                  <div
                    className={`flex items-start justify-between p-5 rounded-t`}
                  >
                  </div>
                  <p className="mx-5">{errorMessage[0].Error}</p>
                  <div
                    className={`flex items-center justify-end p-6 border-solid border-slate-200 rounded-b`}
                  >
                    <button
                      className={`bg-gray-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-300`}
                      type="button"
                      onClick={() => {
                        setShowErrorModal(false);
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
  );
}
