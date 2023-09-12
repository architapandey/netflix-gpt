import React from "react";

const VideoTitle = (props) => {
  const { title, overview } = props;
  return (
    <div className="w-screen aspect-video pt-[30%]  px-36  absolute text-white bg-gradient-to-r from black">
      <div className="font-bold text-2xl   m-2">{title}</div>
      <div className="flex justify-center w-1/4 text-lg m-2">{overview}</div>
      <div className="flex gap-8">
        <button className="bg-white p-4 px-12  font-bold text-black text-xl  rounded-lg hover: bg-opacity-80">
          ▶️ Play
        </button>
        <button className="bg-white p-4 px-12  font-bold text-black text-lg bg-opacity-50 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
