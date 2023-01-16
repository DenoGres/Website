import { Head } from "$fresh/runtime.ts";
import { Gradient } from "../static/gradient.js";
import { useEffect } from "preact/hooks";

export default function GradientBG() {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, []);

  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <canvas
        id="gradient-canvas"
        data-transition-in
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: "-1",
          "--gradient-color-1": "#297789",
          "--gradient-color-2": "#24616b",
          "--gradient-color-3": "#765b7f",
          "--gradient-color-4": "#976aa5",
        }}
      />
    </>
  );
}
