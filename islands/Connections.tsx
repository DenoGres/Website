import data from "https://deno.land/std@0.141.0/_wasm_crypto/crypto.wasm.mjs";
import { useEffect, useState } from "preact/hooks";
import connectionsJson from "../data/connections.json" assert { type: "json" };

export interface IConnectionObject {
  _id: string;
  name: string;
  address: string;
  port: string;
  username: string;
  defaultdb: string;
  password: string;
}

export interface ModalStatus {
  show: boolean;
  text: string;
}

// list of saved connections
export default function Connections() {
  useEffect(() => {
    const getData = async (): Promise<void> => {
      const response = await fetch("/gui/api/handleConnectionSave");
      const data = await response.json();
      console.log(data);
      setConnectList(data);
    };
    getData();
  }, []);

  const [connectList, setConnectList] = useState<any[]>([]);
  const [connectionId, setConnectionId] = useState<number>();
  const [connectionName, setConnectionName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [port, setPort] = useState<number>();
  const [defaultDB, setDefaultDB] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [modalCreateStatus, setModalCreateStatus] = useState<ModalStatus>({
    show: false,
    text: "",
  });

  // <------------ EVENT LISTENERS ------------>

  const handleUriSaveAndRedirect = async (e: MouseEvent) => {
    e.preventDefault();
    const uriText: string =
      `postgres://${username}:${password}@${address}:${port}/${defaultDB}`;
    await fetch("/api/writeUriToFile", {
      method: "POST",
      body: JSON.stringify(uriText),
    });

    // const newConnectionObject: IConnectionObject = {
    //   _id: nanoid(),
    //   name: connectionName,
    //   address,
    //   port,
    //   username,
    //   defaultdb: defaultDB,
    //   password
    // };
    setConnectList([...connectList, newConnectionObject]);
    await fetch("/api/handleConnectionSave", {
      method: "POST",
      body: JSON.stringify(newConnectionObject),
    });

    // can add logic to save connection to list on clicking "connect"
    // in future this will be a request to db to save connection assoc. w/ user

    // must be a better way to do this. maybe can get preact router working?
    window.location.href = "/gui/explorer";
  };

  // <------------ LIST OF CONNECTIONS ------------>
  function connectionsList() {
    const handleDelete = async (): Promise<void> => {
      const reqBody = {
        connectionId,
      };

      await fetch("/gui/api/handleConnectionSave", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });
      window.location.reload();
    };

    const connections = connectList.map((ele, idx) => {
      return (
        <div className="bg-deno-blue-100 tracking-wider rounded flex flex-row justify-between my-1">
          <button
            key={idx}
            className="text-sm shadow-sm font-medium text-gray-600 text-left flex-1 p-3"
            type="button"
            onClick={() => {
              setConnectionId(ele.id);
              setConnectionName(ele.connection_name);
              setAddress(ele.connection_address);
              setPort(ele.port_number);
              setDefaultDB(ele.default_db);
              setUsername(ele.db_username);
              setPassword(ele.db_password);
            }}
          >
            {ele.connection_name}
          </button>
          <button
            className="text-sm shadow-sm font-medium text-gray-600 text-right p-3"
            onClick={handleDelete}
          >
            x
          </button>
        </div>
      );
    });

    // OPEN MODAL TO CREATE NEW CONNECTION
    const openCreateModal = (): void => {
      setConnectionId(null);
      setConnectionName("");
      setAddress("");
      setPort(null);
      setDefaultDB("");
      setUsername("");
      setPassword("");

      setShowCreateModal(true);
    };

    return (
      <div className="flex flex-col">
        {connections}
        <div className="flex flex-row justify-end my-1">
          <button
            onClick={openCreateModal}
            type="button"
            className="flex-0 bg-gray-300 py-1 px-2 text-sm shadow-sm font-medium text-gray-600 hover:shadow-2xl hover:bg-gray-400 rounded"
          >
            +
          </button>
        </div>
      </div>
    );
  }

  // <------------ CONNECTION FORM ------------>
  function connectionForm(type: string) {
    const labelStyle = "py-1";
    const inputStyle =
      "my-1 py-2 px-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12";

    const handleClick = async (): Promise<void> => {
      const method = (type === "new") ? "POST" : "PATCH";

      const reqBody = {
        connectionName,
        address,
        port,
        username,
        defaultDB,
        password,
      };

      console.log(reqBody);

      await fetch("/gui/api/handleConnectionSave", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });
      window.location.reload();
    };

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
            onClick={handleClick}
            type="button"
            className="bg-deno-pink-100 px-5 mx-1 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-600 rounded-full hover:shadow-2xl hover:bg-deno-pink-200"
          >
            Save
          </button>
          <button
            type="button"
            className={"bg-deno-blue-100 px-5 mx-1 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-600 rounded-full hover:shadow-2xl hover:bg-deno-blue-200" +
              ((type === "new") ? " hidden" : "")}
            onClick={handleUriSaveAndRedirect}
          >
            Connect
          </button>
          <button
            type="button"
            onClick={() => {
              setShowCreateModal(false);
            }}
            className={"bg-gray-300 px-5 mx-1 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-600 rounded-full hover:shadow-2xl hover:bg-gray-400" +
              ((type === "new") ? "" : " hidden")}
          >
            Close
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
      {showCreateModal
        ? (
          <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-3/12 max-w-3/12 pl-3 py-5 bg-white outline-none focus:outline-none">
                <h2 className="text-xl font-semibold">
                  Add New Connection
                </h2>
                {connectionForm("new")}
              </div>
            </div>
          </div>
        )
        : null}
    </div>
  );
}
