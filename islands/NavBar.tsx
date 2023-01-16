export default function NavBar() {
  const button = "border rounded shadow-md px-4 py-2 mx-4";

  return (
    <nav class="flex justify-end ... w-full px-r py-5 text-white">
      <a class={button + " bg-[#97C2DB]"} href="/">Home</a>
      <a class={button + " bg-[#B293B6]"} href="/docs/getting-started">
        Docs
      </a>
      <a
        class={button + " bg-gray-700"}
        href="https://github.com/oslabs-beta/DenoGres"
      >
        GitHub
      </a>
    </nav>
  );
}
