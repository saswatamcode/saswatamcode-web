import Container from "./container";
import { EXAMPLE_PATH } from "../lib/constants";

const Footer = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <linearGradient id="gradient-foot" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop stopColor="#352688" offset="10%" />
          <stop stopColor="#1F1557" offset="200%" />
        </linearGradient>
        <path
          fill="url(#gradient-foot)"
          d="M0,128L60,122.7C120,117,240,107,360,128C480,149,600,203,720,240C840,277,960,299,1080,288C1200,277,1320,235,1380,213.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>

      <footer className="bg-footer">
        <div className="py-28 flex flex-col lg:flex-row items-center p-10">
          <div className="flex flex-col gap-10 pr-20">
            <h3 className="w-full text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left lg:mb-0 lg:pr-4">
              Let's build something together!
            </h3>
            <p className="text-lg">
              Looking for a developer or have an interesting idea? Feel free to
              reach out via email or any of my other socials
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <img src="assets/images/building.svg" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
