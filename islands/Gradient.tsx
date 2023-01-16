import MeshGradient from "https://esm.sh/mesh-gradient.js@0.0.5";
import { useEffect } from "preact/hooks";

const COLORS = [
  "#765b7f",
  "#297789",
  "#d1e5eb",
  "#e7c9f0",
];

export default function Gradient() {
  // create instance of Gradient Class
  const gradient = new MeshGradient();
  const canvasId = "my-canvas";

  useEffect(() => {
    // initialize new gradient
    // @Params
    // 1. id of canvas elememt
    // 2. array of colors in hexcode
    gradient.initGradient("#" + canvasId, COLORS);
    // Mesh Id
    // Any positive numeric value which acts as a seed for mesh pattern
    gradient?.changePosition(780);
  }, []);

  const regenerate = () => {
    const value = Math.floor(Math.random() * 1000);
    // change pattern by changing mesh Id
    gradient?.changePosition(value);
  };

  return (
    <canvas
      id={canvasId}
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: "-1",
      }}
    />
  );
}
