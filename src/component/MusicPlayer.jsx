import { useRef, useState } from "react";
import lofi1 from "../audio/Music/lofi/lofi-1.mp3";
import lofi2 from "../audio/Music/lofi/lofi-2.mp3";
import lofi3 from "../audio/Music/lofi/lofi-3.mp3";
import jazz1 from "../audio/Music/jazz/jazz-1.mp3";
import jazz2 from "../audio/Music/jazz/jazz-2.mp3";
import jazz3 from "../audio/Music/jazz/jazz-3.mp3";

import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaBars,
  FaExpand,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";

function MusicPlayer({theme}) {
  const audioList = [
    {
      name: "Lofi",
      tracks: [
        {
          src: lofi1,
          title: "lofi-1",
        },
        {
          src: lofi2,
          title: "lofi-2",
        },
        {
          src: lofi3,
          title: "lofi-3",
        }
      ],
    },
    {
      name: "Jazz",
      tracks: [
        {
          src: jazz1,
          title: "jazz-1",
        },
        {
          src: jazz2,
          title: "jazz-2",
        },
        {
          src: jazz3,
          title: "jazz-3",
        }
      ],
    },
  ];
  const audioRef = useRef(audioList[0].src);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [selectedAudio, setSelectedAudio] = useState(
    audioList[0].tracks[0].src
  );
  const [mute, setMute] = useState(false);
  const [musicAblemCard, setMusicAblemCard] = useState(false);
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const rewind = () => {
    // Calculate previous track position
    let prevTrackIndex = currentTrackIndex - 1;
    let prevAlbumIndex = currentAlbumIndex;

    // If we're at the start of current album's tracks
    if (prevTrackIndex < 0) {
      prevAlbumIndex = currentAlbumIndex - 1;
      // If we're at the first album, loop to last album
      if (prevAlbumIndex < 0) {
        prevAlbumIndex = audioList.length - 1;
      }
      prevTrackIndex = audioList[prevAlbumIndex].tracks.length - 1;
    }

    // Update current indices
    setCurrentTrackIndex(prevTrackIndex);
    setCurrentAlbumIndex(prevAlbumIndex);

    // Update selected audio
    setSelectedAudio(audioList[prevAlbumIndex].tracks[prevTrackIndex].src);

    // Play if currently playing
    if (isPlaying) {
      audioRef.current.load();
      audioRef.current.addEventListener(
        "canplay",
        () => {
          audioRef.current.play();
        },
        { once: true }
      );
    }
  };

  const forward = () => {
    // Calculate next track position
    let nextTrackIndex = currentTrackIndex + 1;
    let nextAlbumIndex = currentAlbumIndex;

    // If we've reached the end of current album's tracks
    if (nextTrackIndex >= audioList[currentAlbumIndex].tracks.length) {
      nextTrackIndex = 0;
      nextAlbumIndex = currentAlbumIndex + 1;
      // If we've reached the end of all albums, loop back to start
      if (nextAlbumIndex >= audioList.length) {
        nextAlbumIndex = 0;
      }
    }

    // Update current indices
    setCurrentTrackIndex(nextTrackIndex);
    setCurrentAlbumIndex(nextAlbumIndex);

    // Update selected audio
    setSelectedAudio(audioList[nextAlbumIndex].tracks[nextTrackIndex].src);

    // Play if currently playing
    if (isPlaying) {
      audioRef.current.load();
      audioRef.current.addEventListener(
        "canplay",
        () => {
          audioRef.current.play();
        },
        { once: true }
      );
    }
  };

  const changeVolume = (e) => {
    const vol = e.target.value;
    setVolume(vol);
    audioRef.current.volume = vol;
  };

  const toggleMute = () => {
    if (mute) {
      audioRef.current.volume = volume;
      setMute(false);
    } else {
      audioRef.current.volume = 0;
      setMute(true);
    }
  };

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  const handleAlbumChange = async (albumIndex) => {
    try {
      if (isPlaying) {
        await audioRef.current.pause();
      }
      setCurrentAlbumIndex(albumIndex);
      setCurrentTrackIndex(0);
      setSelectedAudio(audioList[albumIndex].tracks[0].src);
      if (isPlaying) {
        await audioRef.current.load();
        await audioRef.current.play();
      }
    } catch (error) {
      console.error("Error changing album:", error);
    }
  };

  return (
    <div className="relative ">
      <div className={`w-full fixed bottom-0 ${theme == "dark"? "bg-gray-800 text-white":"  bg-white border-t-1 text-black"}  p-4`}>
        <div className="flex justify-between items-center">
          <div className="flex items-between space-x-4 text-xl">
            <button
              onClick={() => {
                setMusicAblemCard(!musicAblemCard);
              }}
              className="cursor-pointer"
            >
              <FaBars />
            </button>

            <button className="cursor-pointer" onClick={rewind}>
              <FaStepBackward />
            </button>
            <button onClick={togglePlay} className="cursor-pointer">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button className="cursor-pointer" onClick={forward}>
              <FaStepForward />
            </button>

            <div className="flex items-center space-x-2">
              <button className="cursor-pointer" onClick={toggleMute}>
                {!mute ? <FaVolumeUp /> : <FaVolumeMute />}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={changeVolume}
                className="w-24 h-1 bg-gray-500 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <button className="cursor-pointer" onClick={handleFullScreen}>
            <FaExpand />
          </button>
        </div>

        <audio ref={audioRef} loop preload="auto" src={selectedAudio} />
      </div>
      <div
  className={`fixed bottom-12 z-50 w-full rounded-t-xl 
    ${musicAblemCard ? "block" : "hidden"}
    ${theme == "dark"? "bg-gray-800 text-white":"  bg-white border-t-1 text-black"}
  `}
>
  <div className="p-4">
    <div className="flex items-center justify-start space-x-4 overflow-x-auto">
      {audioList.map((album, albumIndex) => (
        <div
          key={albumIndex}
          onClick={() => {
            handleAlbumChange(albumIndex);
          }}
          className={`relative cursor-pointer rounded-lg p-3 transition-all
            min-w-[120px] h-auto aspect-square
            ${
              currentAlbumIndex === albumIndex
                ? "bg-gray-700"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
        >
          <h3 className="absolute bottom-0 left-0 p-2 font-medium text-white">
            {album.name}
          </h3>
        </div>
      ))}
    </div>
  </div>
</div>
    </div>
  );
}

export default MusicPlayer;
