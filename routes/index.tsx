import { Head } from "$fresh/runtime.ts";
import NavBar from "../islands/NavBar.tsx";
import Gradient from "../islands/Gradient.tsx";

const imageOutline = {
  filter: `drop-shadow(1px 1px 0 #4a4a4a40) 
          drop-shadow(-1px -1px 0 #4a4a4a40)`,
};

export default function Home() {
  return (
    <div>
      <Head>
        <title>DenoGres</title>
      </Head>
      <Gradient />
      <div class="sticky top-0">
        <NavBar />
      </div>
      <br />
      <img
        style={imageOutline}
        class="mx-auto"
        src="/logo.png"
        height="500px"
        width="500px"
        alt="the DenoGres logo: a blue elephant and a purple dinosaur"
      />
    </div>
  );
}
