import { BiUpArrow } from "react-icons/bi";
const Timeline = () => {
  return (
    <div className="container mt-10 mx-auto w-full h-full">
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div className="w-full flex justify-center text-6xl">
          <BiUpArrow />
        </div>
        <div
          className="border-2-2 absolute border-opacity-20 border-white h-full border"
          style={{ left: "50%" }}
        ></div>

        <div className="mb-8 flex justify-between items-center w-full right-timeline">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 flex items-center order-1 bg-gray-100 shadow-xl w-8 h-8 rounded-full">
            <h1 className="mx-auto font-semibold text-lg text-black"></h1>
          </div>
          <div className="order-1 bg-blue-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
            <h3 className="mb-3 font-bold text-gray-800 text-xl">
              Software Engineer Intern, MayaData
            </h3>
            <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
              Developed UI components and screens and worked on code refactors
              for data intensive dashboards of LitmusChaos, an open source
              Cloud-Native Chaos Engineering Toolkit for SREs, as well as
              Kubera, a single-click enterprise Kubernetes automation solution
              Worked on transitioning frontend codebases for detailed Chaos
              Engineering dashboards to use a custom in-house component library,
              Kubera-UI, using technologies like React.js, Material-UI,
              TypeScript & StoryBook.
            </p>
          </div>
        </div>

        <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 flex items-center order-1 bg-gray-100 shadow-xl w-8 h-8 rounded-full">
            <h1 className="mx-auto text-black font-semibold text-lg"></h1>
          </div>
          <div className="order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
            <h3 className="mb-3 font-bold text-white text-xl">
              Developer Student Clubs(Google), KIIT
            </h3>
            <p className="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">
              Developed CLI for Divert, the internal URL redirect service, with
              secure authentication and aesthetic design. Released as an npm
              package. Developed the judging web portal for devhack, an online
              hackathon, for judges to mark submissions using Gatsby.js and
              Styled-Components. Conducted online sessions and wrote technical
              blogs.
            </p>
          </div>
        </div>

        <div className="mb-8 flex justify-between items-center w-full right-timeline">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 flex items-center order-1 bg-gray-100 shadow-xl w-8 h-8 rounded-full">
            <h1 className="mx-auto font-semibold text-lg text-black"></h1>
          </div>
          <div className="order-1 bg-blue-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
            <h3 className="mb-3 font-bold text-gray-800 text-xl">
              Mozilla Club BBSR
            </h3>
            <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
              Developed new website from scratch with React.js and Firebase,
              with features like easy & secure uploading of event content and
              images. Organized workshops on Git & GitHub as well as Streamlit,
              a framework for rapid prototyping of machine learning applications
              using Pytorch & Tensorflow
            </p>
          </div>
        </div>

        <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 flex items-center order-1 bg-gray-100 shadow-xl w-8 h-8 rounded-full">
            <h1 className="mx-auto text-black font-semibold text-lg"></h1>
          </div>
          <div className="order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
            <h3 className="mb-3 font-bold text-white text-xl">
              Computer Science & Engineering, @ KIIT
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
