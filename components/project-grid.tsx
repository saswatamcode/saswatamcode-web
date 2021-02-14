const ProjectGrid = () => {
  return (
    <div className="w-full h-screen">
      <div className="flex flex-col lg:grid lg:gap-4 2xl:gap-6 lg:grid-cols-4 2xl:row-span-2 2xl:pb-8 ml-2 pt-4 px-6">
        <div className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-125 bg-indigo-600 lg:order-1 lg:row-span-1 2xl:row-span-1 lg:col-span-2 rounded-lg shadow-xl mb-5 lg:mb-0">
          <div className="mt-6 relative">
            <h3 className="text-white text-4xl 2xl:text-4xl font-bold px-7 lg:px-9 2xl:pt-6 2xl:mx-2">
              Job Board
            </h3>
            <div className="flex w-full justify-center mt-3">
              <img
                src="assets/images/job_board.svg"
                className="h-4/12 w-4/12"
              ></img>
            </div>
            <p className="text-white text-opacity-50 text font-medium md:text-sm 2xl:text-3xl px-7 lg:px-9 mb-3 2xl:pb-8 2xl:mx-2">
              A web application which lists various jobs using the Github Jobs
              API. Built using React, Node.js, Express and Redis. I wanted to
              build an app with a slightly different architecture than a
              traditional CRUD application. Thus, this uses Redis to cache
              GitHub Jobs API results and runs an hourly cron job to update the
              cache.
            </p>
          </div>
        </div>

        <div className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-125 bg-gray-900 lg:order-2 lg:row-span-1 2xl:row-span-1 lg:col-span-1 rounded-lg shadow-xl pb-4 mb-5 lg:mb-0">
          <div className="mt-8 mx-1 lg:mx-2">
            <p className="text-white text-4xl lg:text-xl 2xl:text-4xl font-semibold pt-1 px-6 2xl:px-8 lg:pl-5 lg:pr-8">
              Digit Classifier
            </p>
            <div className="flex w-full justify-center mt-3">
              <img
                src="assets/images/digit_classifier.svg"
                className="h-4/12 w-4/12"
              ></img>
            </div>
            <p className="text-white text-opacity-50 font-medium md:text-sm 2xl:text-3xl pl-6 lg:pl-5 pr-4 -mt-1 lg:mt-6 2xl:mt-2 2xl:px-8">
              A web app which uses TensorFlow.js to train a model on the MNIST
              dataset and then classify handwritten digits. Also uses tfjs-vis
              to visualize training. Currently only works for desktop browsers.
            </p>
          </div>
        </div>

        <div className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-125 bg-red-400 lg:order-3 lg:row-span-2 2xl:row-span-1 lg:col-span-1 rounded-lg shadow-xl mb-5 lg:mb-0 2xl:mb-8">
          <div className="mt-8 ml-5 mr-11">
            <p className="text-4xl 2xl:text-4xl font-bold px-2 lg:px-3 -mt-6 lg:-mt-5 2xl:mt-12 2xl:pb-6">
              Positively
            </p>
            <div className="flex w-full justify-center mt-3 mb-6">
              <img
                src="assets/images/positively.svg"
                className="h-4/12 w-4/12"
              ></img>
            </div>
            <p className="text-white text-opacity-75 font-medium md:text-sm 2xl:text-3xl pl-2 lg:pl-3 lg:pr-4 mb-6 2xl:pt-2 -mt-3">
              A web application where you can store your thoughts throughout the
              day with images and view a detailed day-by-day sentiment analysis
              through an informative dashboard. Uses Next.js, Node.js, Golang,
              AWS and TensorFlow. This application follows complete
              microservices architecture.
            </p>
          </div>
        </div>

        <div className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-125 bg-purple-800 lg:order-4 lg:row-span-2 2xl:row-span-1 col-span-2 rounded-lg shadow-xl mb-5 lg:mb-0 2xl:mb-8 lg:pb-14 2xl:pb-20">
          <div className="px-3 mt-10 mb-5 lg:mb-0">
            <p className="text-white text-4xl 2xl:text-4xl font-semibold px-4 -mt-3 lg:-mt-6 2xl:mt-8">
              Quotes Search Engine
            </p>
            <div className="flex w-full justify-center m-3">
              <img
                src="assets/images/search_engine.svg"
                className="h-4/12 w-4/12"
              ></img>
            </div>
            <p className="text-white text-opacity-50 font-medium md:text-sm 2xl:text-3xl px-4 mt-2 lg:-mt-3 2xl:mt-6">
              It functions by scraping quotes from Goodreads and indexing the
              data into elasticsearch. With elasticsearch's robust text analysis
              capabilities, the data can then be queried. Here, we simply query
              based on the content of a quote or the name of the author. This
              application has both CLI and web UI for search and indexing
              operations.
            </p>
          </div>
        </div>

        <div className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-125 bg-white lg:order-2 lg:row-span-4 lg:col-span-1 rounded-lg shadow-xl mb-5 lg:pb-4 2xl:h-screen">
          <div className="mt-10 lg:px-5 mb-5 lg:mb-0">
            <p className="text-black text-4xl 2xl:text-4xl font-semibold px-4 lg:px-0 -mt-2 lg:-mt-0">
              Data Science API
            </p>
            <div className="flex w-full justify-center mt-3">
              <img
                src="assets/images/data_science_api.svg"
                className="h-6/12 w-6/12 mb-20"
              ></img>
            </div>
            <p className="text-gray-700 font-medium md:text-md 2xl:text-3xl px-4 lg:px-0 2xl:px-4 lg:pr-3 mt-2 lg:-mt-1 2xl:mt-2 2xl:pb-64">
              This is a RESTful API built using Flask and Scikit-Learn. It
              provides a host of Classification and Regression algorithms that
              can be used readily and returns results in the form of
              predictions, confusion matrices, accuracy scores and more. Can be
              utilized for a variety of easy predictive models for quick
              results. Frontend application incoming!!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectGrid;
