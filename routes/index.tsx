import { Head } from "$fresh/runtime.ts";
import NavBarHome from "../islands/NavBarHome.tsx";
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
        <NavBarHome />
      </div>
      <div class="flex h-5/6">
        <img
          style={imageOutline}
          class="m-auto h-[65vh] "
          src="/logo.png"
          alt="the DenoGres logo: a blue elephant and a purple dinosaur"
        />
      </div>
    </div>
  );
}
