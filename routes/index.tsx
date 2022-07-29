/** @jsx h */
import { h, render } from "preact";
import { apply, setup, tw } from "@twind";
import { style } from 'twind/style'
import Counter from "../islands/Counter.tsx";
import Countdown from "../islands/Countdown.tsx"

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
})

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <img
        src="/logo.png"
        height="200px"
        width="200px"
        alt="the DenoGres logo: a blue elephant and a purple dinosaur"
      />
      <p class={tw`bg-gray-200 ${false && 'rounded'}`}>
        Welcome to DenoGres! Try update this message in the ./routes/index.tsx
        file, and refresh.
      </p>
      <Counter start={3} />
    </div>
  );
}
