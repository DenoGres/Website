export default function NavBar() {
  const button =
    "border rounded shadow-md 2xl:px-[1vw] 2xl:py-[0.8vh] mx-4 2xl:text-[1vw] text-base px-4 py-2";
  return (
    <nav class="flex justify-start items-center w-full px-5 py-5 text-white">
       <a href="/">
        <img
          src="/favicon.ico"
          class="w-20 sm:w-20 md:w-24 lg:w-28"
          alt="Logo"
        />
      </a>
      <a class={button + " bg-[#B293B6] ml-auto"} href="/docs/getting-started">
        Docs
      </a>
      <a
        class={button + " bg-gray-700"}
        href="https://github.com/open-source-labs/DenoGres"
      >
        GitHub
      </a>
    </nav>
  );
}
