export default function DocsNav() {
  return (
    <nav class="sm:w-72 md:w-80 lg:w-auto" id="sidenavSecExample">
      <ul class="relative">
        <li class="relative">
          <a
            class="flex items-center lg:text-xl md:text-lg sm:text-md py-4 px-6 h-10 overflow-hidden text-[#27272a] text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out"
            href="/docs/getting-started"
            data-mdb-ripple="true"
            data-mdb-ripple-color="primary"
          >
            <span>Getting Started</span>
          </a>
        </li>
        <li class="relative">
          <a
            class="flex items-center text-sm lg:text-xl md:text-lg py-4 px-6 h-10 overflow-hidden text-[#27272a] text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out"
            href="/docs/introspection-sync"
            data-mdb-ripple="true"
            data-mdb-ripple-color="primary"
          >
            <span>Synchronizing Your Database</span>
          </a>
        </li>
        <li class="relative">
          <a
            class="flex items-center lg:text-xl md:text-lg sm:text-md py-4 px-6 h-10 overflow-hidden text-[#27272a] text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out"
            href="/docs/seed"
            data-mdb-ripple="true"
            data-mdb-ripple-color="primary"
          >
            <span>Seeding Your Database</span>
          </a>
        </li>
        <li class="relative" id="sidenavSecEx4">
          <a
            href="/docs/model"
            class="flex items-center lg:text-xl md:text-lg sm:text-md py-4 px-6 h-10 overflow-hidden text-[#27272a] text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer"
            data-mdb-ripple="true"
            data-mdb-ripple-color="primary"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSidenavSecEx3"
            aria-expanded="false"
            aria-controls="collapseSidenavSecEx3"
          >
            <span>Model Class</span>
          </a>
        </li>
        <li class="relative" id="sidenavSecEx2">
          <a
            href="/docs/methods"
            class="flex items-center lg:text-xl md:text-lg sm:text-md py-4 px-6 h-10 overflow-hidden text-[#27272a] text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer"
            data-mdb-ripple="true"
            data-mdb-ripple-color="primary"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSidenavSecEx2"
            aria-expanded="false"
            aria-controls="collapseSidenavSecEx2"
          >
            <span>Methods</span>
          </a>
        </li>
        <li class="relative" id="sidenavSecEx3">
          <a
            href="/docs/associations"
            class="flex items-center lg:text-xl md:text-lg sm:text-md py-4 px-6 h-10 overflow-hidden text-[#27272a] text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer"
            data-mdb-ripple="true"
            data-mdb-ripple-color="primary"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSidenavSecEx3"
            aria-expanded="false"
            aria-controls="collapseSidenavSecEx3"
          >
            <span>Associations</span>
          </a>
        </li>
        <li class="relative" id="sidenavSecEx5">
          <a
            href="/docs/migrations"
            class="flex items-center lg:text-xl md:text-lg sm:text-md py-4 px-6 h-10 overflow-hidden text-[#27272a] text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer"
            data-mdb-ripple="true"
            data-mdb-ripple-color="primary"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSidenavSecEx3"
            aria-expanded="false"
            aria-controls="collapseSidenavSecEx3"
          >
            <span>Migrations</span>
          </a>
        </li>
        <li class="relative" id="sidenavSecEx5">
          <a
            href="/docs/gui"
            class="flex items-center lg:text-xl md:text-lg sm:text-md py-4 px-6 h-10 overflow-hidden text-[#27272a] text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer"
            data-mdb-ripple="true"
            data-mdb-ripple-color="primary"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSidenavSecEx3"
            aria-expanded="false"
            aria-controls="collapseSidenavSecEx3"
          >
            <span>Navigating the GUI</span>
          </a>
        </li>
        <li class="relative" id="sidenavSecEx5">
          <a
            href="/docs/development"
            class="flex items-center lg:text-xl md:text-lg sm:text-md py-4 px-6 h-10 overflow-hidden text-[#27272a] text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer"
            data-mdb-ripple="true"
            data-mdb-ripple-color="primary"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSidenavSecEx3"
            aria-expanded="false"
            aria-controls="collapseSidenavSecEx3"
          >
            <span>Under Development</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
