import {
  FaGithub,
  FaLinkedin,
  FaDev,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

import { IconContext } from "react-icons";

const Socials = () => {
  return (
    <IconContext.Provider
      value={{
        className: "transform-gpu hover:scale-150 transition duration-300",
      }}
    >
      <div className="flex gap-5 items-center text-2xl mb-10 w-8/12 text-white pl-10">
        <a
          title="GitHub Repositories"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/saswatamcode"
        >
          <FaGithub />
        </a>
        <a
          title="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/saswatamcode/"
        >
          <FaLinkedin />
        </a>
        <a
          title="DEV"
          target="_blank"
          rel="noopener noreferrer"
          href="https://dev.to/saswatamcode"
        >
          <FaDev />
        </a>
        <a
          title="Twitter"
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/saswatamcode"
        >
          <FaTwitter />
        </a>
        <a
          title="Email"
          target="_blank"
          rel="noopener noreferrer"
          href="mailto:saswataminsta@yahoo.com"
        >
          <FaEnvelope />
        </a>
        <div className="w-4/12 bg-gradient-to-r from-purple-600 via-red-500 to-yellow-500 h-1.5 rounded-md"></div>
      </div>
    </IconContext.Provider>
  );
};

export default Socials;
