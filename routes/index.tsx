/** @jsx h */
import { h, render } from "preact";
import { apply, setup, tw } from "@twind";
import { style } from "twind/style";
import NavBar from "../islands/NavBar.tsx";

// import { setup, tw } from "https://esm.sh/twind@0.16.16";
import { getStyleTag, virtualSheet } from "https://esm.sh/twind@0.16.16/sheets";

const base = style({
  base: `bg-purple-500 text(white md) font-bold`,
  variants: {
    size: {
      small: `text-sm h-5 px-2`,
      large: `text-lg h-7 px-5`,
    },
  },
});

export default function Home() {
  return (
    // <div class={tw`h-screen bg-blue-100`}>
    <div class={tw`h-screen bg-gradient-to-b from-gray-500 via-gray-800 to-gray-900`}>
      <NavBar />
      <img
        class={tw`mx-auto`}
        src="/logo.png"
        height="250px"
        width="250px"
        alt="the DenoGres logo: a blue elephant and a purple dinosaur"
      />
      {/* <p class={tw`bg-gray-200 ${false && "rounded"}`}> */}
      <p class={tw`text-2xl text-center`}>
        Welcome to DenoGres!
      </p>
    </div>
  );
}
