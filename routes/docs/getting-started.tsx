/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import NavBar from "../../islands/NavBar.tsx";

export default function GettingStartedPage() {
  return (
    <div class={tw`h-screen text-white bg-gradient-to-b from-gray-500 via-gray-800 to-gray-900`}>
      <NavBar />
      <a class={tw`flex justify-center mx-4 mb-10 text-2xl`} href="/docs/getting-started">Getting Started</a>
      <a class={tw`flex justify-center mx-4 mb-10 text-2xl`} href="/docs/methods">Methods</a>
      <a class={tw`flex justify-center mx-4 mb-10 text-2xl`} href="/docs/data-introspection">Data Introspection</a>
    </div>
  );
}
