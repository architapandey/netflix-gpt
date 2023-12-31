const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-[100%] aspect-video pt-[20%] px-10 md:px-[72px] absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-[75%] lg:w-[50%]">
        {overview}
      </p>
      <div className="my-4 md:m-0">
        <button className=" bg-white py-2 md:py-4 px-3 md:px-12 text-xl bg-opacity-50  rounded-lg hover:bg-opacity-80">
          ▶ Play
        </button>
        <button className="hidden md:inline-block mx-2  bg-white p-4 px-12 text-xl bg-opacity-50 rounded-lg hover:bg-opacity-80">
          More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;
