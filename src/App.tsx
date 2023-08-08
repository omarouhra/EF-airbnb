import "./App.css";
import { Player } from "@editframe/react";
import { useState, useEffect } from "react";

function App() {
  const [playerState, setPlayerState] = useState<
    "stopped" | "playing" | "paused"
  >("playing"); // you can use this to control the player
  const [seek, setSeek] = useState(0); // you can use this to seek the player
  const [trackTitle, setTrackTitle] = useState("Demo");
  const [artistName, setArtistName] = useState("Editframe");
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
        source:
          "https://editframe.com/docs/composition/layers/audio/audio-example.mp3",
        timeline: {
          start: 0,
        },
        transitions: [],
      },
      {
        id: 1,
        html: {
          page: {
            body: '\n      <div>\n      <div id="template" style="background-color: rgb(131,58,180);background: linear-gradient(90deg, rgba(131,58,180,0.5) 0%, rgba(253,29,29,0.5) 50%, rgba(252,176,69,0.5) 100%),  url(\'https://images.unsplash.com/photo-1560800452-f2d475982b96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80\');height: 1920px;width: 1080px;background-repeat:no-repeat;background-size: cover;"  class="relative">\n        <div class="absolute inset-0 flex h-full w-full flex-col justify-between" style="padding: 48px;">\n          <div class="absolute inset-0 bg-black/20"></div>\n          <div class="z-50 flex flex-col justify-center">\n            <img src="https://www.editframe.com/images/logo.png" class="mx-auto h-full w-56 py-12" alt="logo" />\n            <div>\n              <div class="flex w-full flex-col items-center justify-center gap-10">\n                <img class="mx-auto h-full w-[-96rem] origin-center rounded-xl  animate-fadein" src="https://images.unsplash.com/photo-1560800452-f2d475982b96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" />\n                <div class="flex flex-col items-center justify-center gap-4 animate-fadein">\n                  <p class="text-5xl font-bold text-white">{{trackName}}</p>\n                  <p class="text-2xl font-normal text-white">{{artistName}}</p>\n                </div>\n                <div class="flex flex-col items-center justify-center gap-4 animate-spotify">\n                  <p class="text-xl font-bold text-white">Find us on</p>\n                  <img class="mx-auto h-full w-36 origin-center rounded-xl" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" />\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    \n    \n        ',
            styles:
              "\n      .animate-fadein {\n        animation: fadeIn 1s ease-in-out forwards;\n        animation-delay: 1s;\n        opacity: 0;\n        animation-iteration-count: 1;\n        animation-fill-mode: forwards;\n      }\n      .animate-spotify {\n        animation: fadeIn 1s ease-in-out forwards;\n        animation-delay: 5s;\n        opacity: 0;\n        animation-iteration-count: 1;\n        animation-fill-mode: forwards;\n      }\n      \n      @keyframes fadeIn {\n        to {\n          opacity: 1;\n        }\n      }\n      \n        ",
          },
          selector: "#template",
          withTailwind: true,
          withTransparentBackground: false,
        },
        size: {
          scale: 1,
          width: 1080,
          height: 1920,
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
    duration: 10,
    metadata: {
      userId: 3,
    },
    extension: "mp4",
    dimensions: {
      width: 1080,
      height: 1920,
    },
    backgroundColor: "#000000FF",
    shouldWatermark: true,
  };
  const [config, setConfig] = useState(defaultConfig);
  useEffect(() => {
    const newConfig = { ...config };
    newConfig.layers = defaultConfig.layers.map((layer) => {
      if (layer.html) {
        layer.html.page.body = layer.html.page.body.replace(
          "{{trackName}}",
          trackTitle
        );
        layer.html.page.body = layer.html.page.body.replace(
          "{{artistName}}",
          artistName
        );
        return layer;
      } else {
        return layer;
      }
    });
    setConfig(newConfig);
    console.log(config);

    return () => {};
  }, [artistName, trackTitle]);

  return (
    <>
      <div className="min-h-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="https://efapi.nyc3.cdn.digitaloceanspaces.com/web/logo_black.png"
                  alt="Editframe"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                Edit your video
              </h1>
            </div>
          </header>
          <main className="my-4">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 justify-between gap-20">
                <div className="flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Artist Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="artist"
                        id="artist"
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Track title
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="track"
                        id="track"
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={trackTitle}
                        onChange={(e) => setTrackTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="aspect-[9/16]"
                  style={{
                    height: "calc(100vh - 300px)",
                  }}
                >
                  <Player
                    config={config}
                    applicationId="demo"
                    loop={false}
                    playerState={playerState}
                    seek={seek}
                    host={"https://player.editframe.dev"}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
export default App;
