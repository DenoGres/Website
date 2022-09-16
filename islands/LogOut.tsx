import { useEffect } from "preact/hooks";

// list of saved Migrations
export default function LogOut() {
  useEffect(() => {
    const logout = async () => {
      await fetch("/gui/api/logOut");
    };
    logout();
    window.location.href = "/gui/";
  }, []);

  return (
    <div className="w-full flex flex-row">
      <div className="w-full bg-white rounded mx-3 p-3 items-center">
        <h2 className="mb-3">LogOut</h2>
      </div>
    </div>
  );
}
