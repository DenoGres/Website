import { Head } from "$fresh/runtime.ts";
import NavBar from "../islands/NavBar.tsx";
import Gradient from "../islands/Gradient.tsx";

const imageOutline = {
  filter: `drop-shadow(1px 1px 0 #4a4a4a60) 
          drop-shadow(-1px -1px 0 #4a4a4a60)`,
};

export default function Home() {
  return (
    <div class="h-screen">
      <Head>
        <title>DenoGres</title>
      </Head>
      <Gradient />
      <div class="sticky top-0">
        <NavBar />
      </div>
      <div class="flex h-5/6">
        <img
          style={imageOutline}
          class="mx-auto my-auto"
          src="/logo.png"
          height="500px"
          width="500px"
          alt="the DenoGres logo: a blue elephant and a purple dinosaur"
        />
      </div>
    </div>
  );
}
