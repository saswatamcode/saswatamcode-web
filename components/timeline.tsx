import { BiUpArrow } from "react-icons/bi";
const Timeline = () => {
  return (
    <div className="container  mx-auto w-full h-full">
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
              - Working on the frontend aspects of LitmusChaos, an open-source
              Cloud-Native Kubernetes Chaos Engineering toolset for SREs as well
              as Kubera, a single-click enterprise-level K8s automation solution
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
              Worked on several projects using React, Node.js, Firebase, HTML5,
              CSS3, MongoDB as well as website maintenance. Wrote several
              technical blogs on dev.to and took online sessions on YouTube as
              well. Aiding in building a strong developer community.
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
              Implemented a new website with React, Firebase, and Bootstrap.
              Organized workshops on Git & GitHub and Streamlit, a framework for
              rapid prototyping of ML apps. Helping in making the internet a
              better place.
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
              Computer Science & Engineer, @ KIIT
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
