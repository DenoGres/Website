export default function DocsNav() {
  return (
    <nav class="sm:w-72 md:w-80 lg:w-auto" id="sidenavSecExample">
      <a href="/">
        <img
          src="/favicon.ico"
          class="w-20 sm:w-20 md:w-24 lg:w-28 fixed left-5 top-5"
          alt="Logo"
        />
      </a>
      <ul class="relative px-3 pt-8">
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
          <ul
            class="relative accordion-collapse collapse"
            id="collapseSidenavSecEx2"
            aria-labelledby="sidenavSecEx2"
            data-bs-parent="#sidenavSecExample"
          >
            <li class="relative">
              <a
                href="/docs/methods#instance"
                class="flex items-center lg:text-xl md:text-lg sm:text-md py-4 pl-12 pr-6 h-6 overflow-hidden text-[#27272a] text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="primary"
              >
                Instance Methods
              </a>
            </li>
            <li class="relative">
              <a
                href="/docs/methods#model"
                class="flex items-center lg:text-xl md:text-lg sm:text-md py-4 pl-12 pr-6 h-6 overflow-hidden text-[#27272a] text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="primary"
              >
                Model Methods
              </a>
            </li>
            <li class="relative">
              <a
                href="/docs/methods#queries-and-transaction"
                class="flex items-center lg:text-xl md:text-lg sm:text-md py-4 pl-12 pr-6 h-6 overflow-hidden text-[#27272a] text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="primary"
              >
                Queries and Transactions
              </a>
            </li>
          </ul>
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
          <ul
            class="relative accordion-collapse collapse"
            id="collapseSidenavSecEx3"
            aria-labelledby="sidenavSecEx3"
            data-bs-parent="#sidenavSecExample"
          >
            <li class="relative">
              <a
                href="/docs/associations#one-to-one"
                class="flex items-center lg:text-xl md:text-lg sm:text-md py-4 pl-12 pr-6 h-6 overflow-hidden text-[#27272a] text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="primary"
              >
                One-to-One
              </a>
            </li>
            <li class="relative">
              <a
                href="/docs/associations#one-to-many"
                class="flex items-center lg:text-xl md:text-lg sm:text-md py-4 pl-12 pr-6 h-6 overflow-hidden text-[#27272a] text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="primary"
              >
                One-to-Many
              </a>
            </li>
            <li class="relative">
              <a
                href="/docs/associations#many-to-many"
                class="flex items-center lg:text-xl md:text-lg sm:text-md py-4 pl-12 pr-6 h-6 overflow-hidden text-[#27272a] text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="primary"
              >
                Many-to-Many
              </a>
            </li>
          </ul>
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
          <ul
            class="relative accordion-collapse collapse"
            id="collapseSidenavSecEx2"
            aria-labelledby="sidenavSecEx2"
            data-bs-parent="#sidenavSecExample"
          >
            <li class="relative">
              <a
                href="/docs/gui#database"
                class="flex items-center lg:text-xl md:text-lg sm:text-md py-4 pl-12 pr-6 h-6 overflow-hidden text-[#27272a] text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="primary"
              >
                Database Connections
              </a>
            </li>
            <li class="relative">
              <a
                href="/docs/gui#queries"
                class="flex items-center lg:text-xl md:text-lg sm:text-md py-4 pl-12 pr-6 h-6 overflow-hidden text-[#27272a] text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out"
                data-mdb-ripple="true"
                data-mdb-ripple-color="primary"
              >
                Queries
              </a>
            </li>
          </ul>
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
