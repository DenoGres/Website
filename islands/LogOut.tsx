import { useEffect } from "preact/hooks";

// list of saved Migrations
export default function LogOut() {
  useEffect(() => {
    const logout = async () => {
      setTimeout(() => window.location.href = "/gui/", 3000);
      await fetch("/gui/api/logOut");
      await fetch("/gui/api/handleRequests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: 'clear user cache'})
      })
    };
    logout();
  }, []);

  return (
    <div className="w-full flex flex-row">
      <div className="w-full bg-white rounded mx-3 p-3 items-center">
        {/* <h2 className="mb-3">LogOut</h2> */}
        <p>Thank you for using DenoGres. Logging out...</p>
      </div>
    </div>
  );
}
