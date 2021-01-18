import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between w-full text-3xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-10 mt-8">
      <div>
        <Link href="/">
          <a className="hover:underline">SM</a>
        </Link>
        .
      </div>
      <div className="w-3/12 flex gap-10 text-xl font-bold text-purple-300">
        <Link href="/about">
          <a className="hover:underline">About</a>
        </Link>
        <Link href="/projects">
          <a className="hover:underline">Projects</a>
        </Link>
        <Link href="/posts">
          <a className="hover:underline">Blog</a>
        </Link>
        <Link href="/posts">
          <a className="hover:underline">Contact</a>
        </Link>
      </div>
    </div>
  );
};

export default Header;
