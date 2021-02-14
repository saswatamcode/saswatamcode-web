import PostTitle from "./post-title";
import Link from "next/link";

const Whoami = () => {
  return (
    <section className="pb-6">
      <PostTitle>
        <div className="flex gap-4">
          <img src="/assets/images/hand.png" /> About Me
        </div>
      </PostTitle>
      <div className="grid grid-cols-2 gap-3">
        <p>
          I'm a 20 year old student at Kalinga Institute Of Industrial
          Technology currently studying Computer Science and Engineering.
        </p>
        <p>
          As I've grown as a developer, I've worked alongside several peers and
          senior developers who have raised my standards for what is expected of
          any application.
        </p>
        <p>
          I've gained knowledge through my varied experiences, which has allowed
          me to create stellar experiences with clean, maintainable and
          accessible code.
        </p>
      </div>
      <div className="transition duration-500 ease-in-out w-min h-min flex bg-gradient-to-r mt-5 from-purple-600 via-red-500 to-yellow-500 hover:shadow-fire rounded-xl">
        <Link href="/assets/resume/Saswata_Mukherjee.pdf">
          <a className="m-1 w-40 h-10 flex font-bold text-lg bg-main justify-center items-center rounded-xl">
            Resume
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Whoami;
