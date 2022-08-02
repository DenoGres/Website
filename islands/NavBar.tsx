/** @jsx h */
import { h } from "preact";
import { tw } from "@twind"


export default function NavBar() {

  const button = `border rounded shadow-md px-4 py-2 mx-4`;

  return (
    <div>
      {/* <nav class={tw`flex justify-end ... w-full px-r py-5 text-white mb-10 bg-gradient-to-r from-[#B293B6] to-[#97C2DB]`}> */}
      <nav class={tw`flex justify-end ... w-full px-r py-5 text-white mb-10 bg-gray-800 dark:bg-gray-800`}>
        <a class={tw`${button} bg-[#97C2DB]`} href="/">Home</a>
        <a class={tw`${button} bg-[#B293B6]`} href="/docs/getting-started">Docs</a>
        <a class={tw`${button} bg-gray-700`} href="https://github.com/oslabs-beta/DenoGres">GitHub</a>
      </nav>
    </div>
  );
}
