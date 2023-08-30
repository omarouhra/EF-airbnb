import { Player } from "@editframe/react";
import { useEffect, useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import AirbnbIcon from "./icons/AirbnbIcon";
import CloseIcon from "./icons/CloseIcon";
import EarthIcon from "./icons/EarthIcon";
import HouseIcon from "./icons/HouseIcon";
import LaptopIcon from "./icons/LaptopIcon";
import MobileIcon from "./icons/MobileIcon";
import ShopIcon from "./icons/ShopIcon";
import { CongratsAd } from "./templates/congratsAd copy";
import { ListingAd } from "./templates/listingAd";
import { SocialAd } from "./templates/socialAd";
import PlayIcon from "./icons/PlayIcon";

function App() {
  // const [playerState, setPlayerState] = useState<
  //   "stopped" | "playing" | "paused"
  // >("playing"); // you can use this to control the player
  // const [seek, setSeek] = useState(0); // you can use this to seek the player
  // const [trackTitle, setTrackTitle] = useState("Demo");
  // const [artistName, setArtistName] = useState("Editframe");

  const [videoType, setVideoType] = useState<string>("ad");
  const [videoResolution, setVideoResolution] = useState<string>("mobile");
  const [showModal, setShowModal] = useState(false);

  const VIDEO_VARIANTS = [
    {
      icon: <HouseIcon />,
      label: "I want a video for my airbnb listing",
      key: "ad",
    },
    {
      icon: <ShopIcon />,
      label: "I just booked an airbnb, i am excited",
      key: "social",
    },
    {
      icon: <EarthIcon />,
      label: "Congratulation for your booking",
      key: "congratulation",
    },
  ];
  const VIDEO_RESOLUTIONS = [
    {
      icon: <MobileIcon />,
      label: "1080X1920",
      key: "mobile",
      value: "w-full h-[800px]",
    },
    {
      icon: <LaptopIcon />,
      label: "2560X1440",
      key: "desktop",
      value: "w-full h-[800px]",
    },
  ];

  const video =
    videoType === "ad"
      ? ListingAd
      : videoType === "social"
      ? SocialAd
      : CongratsAd;

  const defaultConfig = {
    layers: [
      {
        id: 0,
        trim: {
          start: 0,
        },
        type: "audio",
        audio: {
          volume: 1,
        },
        source: video.musicUrl,
        timeline: {
          start: 0,
        },
        transitions: [],
      },
      {
        id: 1,
        html: {
          page: {
            body: video.template,
            styles: video.css,
          },
          selector: "#template",
          withTailwind: true,
          withTransparentBackground: false,
        },
        size: {
          scale: 1,
          width: videoResolution === "mobile" ? 1080 : 2560,
          height: videoResolution === "mobile" ? 1920 : 1440,
          format: "fill",
        },
        trim: {
          start: 0,
        },
        type: "html",
        position: {
          x: 0,
          y: 0,
          z: 0,
          angle: 0,
          angleX: 0,
          angleY: 0,
          origin: "center",
          isRelative: false,
        },
        timeline: {
          start: 0,
        },
        transitions: [],
      },
    ],
    duration: 12,
    metadata: {
      userId: 3,
    },
    extension: "mp4",
    dimensions: {
      width: videoResolution === "mobile" ? 1080 : 2560,
      height: videoResolution === "mobile" ? 1920 : 1440,
    },
    backgroundColor: "#000000FF",
    shouldWatermark: true,
  };

  const [config, setConfig] = useState(defaultConfig);
  useEffect(() => {
    const newConfig = { ...config };
    setConfig(newConfig);
    console.log(config);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video]);

  return (
    <div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="bg-white h-screen w-full p-4">
          <div>
            <button onClick={() => setShowModal(false)}>
              <CloseIcon />
            </button>
          </div>
          <div className="mt-6">
            <div className=" border-gray-200 rounded-md  ">
              <form>
                <div className="flex flex-col text-sm text-gray-500">
                  <label htmlFor="" className="mb-2">
                    Listing Url
                  </label>
                  <input
                    type="text"
                    className="border-gray-200 bg-gray-50 rounded-md"
                  />
                </div>
              </form>
              <div className="my-8">
                <p className="text-sm text-gray-500 mb-2">Video Type</p>
                <div className="flex flex-col space-y-4">
                  {VIDEO_VARIANTS.map(({ icon, label, key }, index) => (
                    <button key={index} onClick={() => setVideoType(key)}>
                      <div
                        className={`flex items-center space-x-4 border p-4 rounded-md border-gray-200 hover:scale-[0.989] duration-150 ${
                          videoType === key &&
                          " bg-[#FF5A5F] hover:bg-[#FF5A5F] text-white"
                        }`}
                      >
                        {icon}
                        <p className="text-sm">{label}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="my-8">
                <p className="text-sm text-gray-500 mb-2">Video Resolution</p>
                <div className="flex items-center space-x-4 ">
                  {VIDEO_RESOLUTIONS.map(({ icon, label, key }, index) => (
                    <button key={index} onClick={() => setVideoResolution(key)}>
                      <div
                        className={`flex  items-center space-x-4 border p-4 rounded-md border-gray-200 hover:scale-[0.989] duration-150  ${
                          videoResolution === key &&
                          " bg-[#FF5A5F] hover:bg-[#FF5A5F] text-white"
                        }`}
                      >
                        {icon}
                        <p className="text-sm">{label}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="flex justify-end"></div>

      <div>
        <div className="items-center justify-center flex flex-col my-4 mb-12">
          <div className="flex space-x-2 items-center justify-center">
            <AirbnbIcon />{" "}
            <p className="text-3xl font-medium -translate-y-0.5">
              ads videos generator
            </p>
          </div>
          <button
            onClick={() => setShowModal(!showModal)}
            className="px-4 py-2 bg-red-50 hover:bg-red-100 rounded-md flex items-center space-x-2 text-[#FF5A5F] duration-150"
          >
            <p>Generate your video</p> <PlayIcon />
          </button>
        </div>
        <main className="my-12 flex items-center justify-center border rounded-md bg-gray-50 border-gray-100 py-8 shadow-lg">
          <div
            className={` ${
              videoResolution === "mobile" ? "w-[40%] h-[800px]" : "w-full"
            }  rounded-lg overflow-hidden h-[800px] duration-300 shadow-2xl`}
          >
            <Player
              config={config}
              applicationId="demo"
              loop={false}
              host={"https://player.editframe.dev"}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
export default App;
