import { useState } from "preact/hooks";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginFail, setLoginFail] = useState<boolean>(false);

  const labelStyle = "py-3";
  const inputStyle =
    "my-3 py-2 px-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12";

  const login = async (): Promise<any> => {
    interface reqBody {
      username: string;
      password: string;
    }

    const reqBody: reqBody = {
      username,
      password,
    };

    const response = await fetch("gui/api/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    });

    if (response.ok) {
      window.location.href = "/gui/home";
    } else {
      setLoginFail(true);
    }
  };

  const signup = (): void => {
    console.log("hello");
  };

  const failStyle: string = "text-red-900" +
    ((loginFail) ? " visible" : " invisible");

  return (
    <div className="flex flex-col px-5 z-10 w-5/12 h-96 m-auto bg-deno-blue-100 drop-shadow-2xl rounded">
      <div className="flex-1">
        <h2 className="py-5 font-extrabold text-lg">
          Denogres Login
        </h2>
        <label className={labelStyle}>Username:</label>
        <input
          className={inputStyle}
          onInput={(e) => {
            setUsername(e.currentTarget.value);
          }}
          value={username}
        >
        </input>
        <label className={labelStyle}>Password</label>
        <input
          className={inputStyle}
          onInput={(e) => {
            setPassword(e.currentTarget.value);
          }}
          value={password}
          type="password"
        >
        </input>
        <div
          className={failStyle}
        >
          Login failed. Please try again
        </div>
      </div>
      <div className="flex flex-row justify-end pb-5">
        <button
          className="px-5 mx-1 py-3 text-sm font-medium tracking-wider text-gray-700 rounded-full hover:shadow-2xl hover:bg-deno-blue-200"
          onClick={login}
        >
          Login
        </button>
        <button
          className="px-5 mx-1 py-3 text-sm font-medium tracking-wider text-gray-700 rounded-full hover:shadow-2xl hover:bg-deno-blue-200"
          onClick={signup}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
