import Link from "next/link";

const Header = () => {
  return (
    <header className="mt-5 mb-10 ml-4 text-3xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight flex flex-wrap items-center">
      <style jsx>{`
        #menu-toggle:checked + #menu {
          display: block;
        }
      `}</style>

      <div className="flex-1 flex justify-between items-center">
        <div>
          <Link href="/">
            <a className="hover:underline text-5xl">SM</a>
          </Link>
          .
        </div>
      </div>

      <label htmlFor="menu-toggle" className="pointer-cursor lg:hidden block">
        <svg
          className="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </label>
      <input className="hidden" type="checkbox" id="menu-toggle" />

      <div
        className="hidden lg:flex lg:items-center lg:w-auto w-full"
        id="menu"
      >
        <nav>
          <ul className="lg:flex items-center justify-between text-xl font-bold text-purple-300 pt-4 lg:pt-0">
            <li>
              <Link href="/about">
                <a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">
                  About
                </a>
              </Link>
            </li>
            <li>
              <Link href="/projects">
                <a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">
                  Projects
                </a>
              </Link>
            </li>
            <li>
              <Link href="/posts">
                <a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400">
                  Blog
                </a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400 lg:mb-0 mb-2">
                  Contact
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
