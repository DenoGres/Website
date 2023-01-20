import { Gradient } from "../static/gradient.js";
import { useEffect } from "preact/hooks";

export default function GradientBG() {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, []);

  return (
    <canvas
      id="gradient-canvas"
      data-transition-in
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: "-1",
        "--gradient-color-1": "#297789",
        "--gradient-color-2": "#70b9d0",
        "--gradient-color-3": "#d9bfe2",
        "--gradient-color-4": "#abd3dd",
      }}
    />
  );
}
