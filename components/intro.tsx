import Header from "./header";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import Socials from "./socials";

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mb-16 md:mb-12">
      <div className="animate-gradient bg-400 bg-gradient-to-br from-header-m via-header-l to-header-r w-full h-screen p-10">
        <Header />
        <div className="flex w-full">
          <div className="flex-col w-6/12">
            <Socials />
            <h1 className="text-header font-bold tracking-tighter leading-tight pl-10">
              <Typist cursor={{ hideWhenDone: true, hideWhenDoneDelay: 1000 }}>
                Hi there! <br /> I'm Saswata Mukherjee,
                <br /> a Web Developer!
              </Typist>
            </h1>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <linearGradient id="gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop stopColor="#AC6DBD" offset="0%" />
              <stop stopColor="#7F56DF" offset="100%" />
            </linearGradient>
            <path
              fill="url(#gradient-1)"
              d="M0,32L40,58.7C80,85,160,139,240,144C320,149,400,107,480,80C560,53,640,43,720,85.3C800,128,880,224,960,229.3C1040,235,1120,149,1200,96C1280,43,1360,21,1400,10.7L1440,0L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div className="absolute inset-x-0 -bottom-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop stopColor="#3D3190" offset="0%" />
              <stop stopColor="#1F1F47" offset="100%" />
            </linearGradient>
            <path
              fill="url(#gradient)"
              d="M0,192L24,181.3C48,171,96,149,144,170.7C192,192,240,256,288,272C336,288,384,256,432,250.7C480,245,528,267,576,272C624,277,672,267,720,234.7C768,203,816,149,864,122.7C912,96,960,96,1008,128C1056,160,1104,224,1152,224C1200,224,1248,160,1296,117.3C1344,75,1392,53,1416,42.7L1440,32L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Intro;
