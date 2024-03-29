import { useState } from "preact/hooks";

export interface errorMessage {
  show: boolean;
  text: string;
}

interface reqBody {
  username: string;
  password: string;
}

export default function LoginSignup() {
  const [status, setStatus] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<errorMessage>({
    show: false,
    text: "",
  });

  const resetErrorMessage = () => {
    setTimeout(() => setErrorMessage({ show: false, text: "" }), 2000);
  };

  const labelStyle = "py-3";
  const inputStyle =
    "my-3 py-2 px-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12";

  const login = async (e?: Event): Promise<void> => {
    if (username === "" || password === "") {
      setErrorMessage({
        show: true,
        text: "Username/Password fields cannot be blank. Please try again.",
      });
      resetErrorMessage();
    } else {
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
        const data = await response.json();
        setErrorMessage({ show: true, text: data.err });
        resetErrorMessage();
      }
    }
  };

  const signup = async (): Promise<void> => {
    const reqBody: reqBody = {
      username,
      password,
    };

    const response = await fetch("gui/api/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    });

    if (response.ok) {
      login();
    } else {
      setErrorMessage({
        show: true,
        text: "Invalid credentials. Please try again.",
      });
      resetErrorMessage();
    }
  };

  const errorMessageStyle: string = "text-red-600 z-50" +
    ((errorMessage.show) ? " visible" : " invisible");

  const handleChangeStatus = () => {
    setStatus(status === "login" ? "signup" : "login");
    setUsername("");
    setPassword("");
    setErrorMessage({
      show: false,
      text: "",
    });
  };

  const boxColor = status === "login" ? "bg-deno-blue-100" : "bg-deno-pink-100";

  return (
    <div
      className={`flex flex-col px-5 z-10 w-5/12 h-96 m-auto ${boxColor} rounded`}
    >
      <div className="flex-1">
        <h2 className="py-5 font-extrabold text-lg">
          Denogres {status === "login" ? "Login" : "Signup"}
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
        <label className={labelStyle}>Password:</label>
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
          className={errorMessageStyle}
        >
          {errorMessage.text}
        </div>
      </div>
      <div className="flex flex-row justify-between pb-5">
        <button
          className="px-2 py-3 text-sm font-medium tracking-wider text-gray-700 rounded-full hover:shadow-2xl hover:bg-deno-blue-200"
          onClick={handleChangeStatus}
        >
          {status === "login" ? "Create account" : "Back to login"}
        </button>
        <button
          className="px-5 mx-1 py-3 text-sm font-medium tracking-wider text-gray-700 rounded-full hover:shadow-2xl hover:bg-deno-blue-200"
          onClick={status === "login" ? login : signup}
        >
          {status === "login" ? "Login" : "Signup"}
        </button>
      </div>
    </div>
  );
}
