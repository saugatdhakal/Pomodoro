import { useRef, useState } from "react";
import lofi1 from "../audio/Music/lofi/lofi-1.mp3";
import lofi2 from "../audio/Music/lofi/lofi-2.mp3";
import lofi3 from "../audio/Music/lofi/lofi-3.mp3";
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

function MusicPlayer() {
  const audioList = [
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
    },
  ];
  const audioRef = useRef(audioList[0].src);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [selectedAudio, setSelectedAudio] = useState(audioList[0].src);
  const [mute, setMute] = useState(false);

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
    const currentIndex = audioList.findIndex(
      (audio) => audio.src === selectedAudio
    );
    const newIndex = currentIndex > 0 ? currentIndex - 1 : audioList.length - 1;
    setSelectedAudio(audioList[newIndex].src);
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
    const currentIndex = audioList.findIndex(
      (audio) => audio.src === selectedAudio
    );
    const newIndex = currentIndex < audioList.length - 1 ? currentIndex + 1 : 0;
    setSelectedAudio(audioList[newIndex].src);
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

  return (
    <div className="w-full fixed bottom-0 bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-between space-x-4 text-xl">
          <button className="cursor-pointer">
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

          {/* Volume Control */}
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

        {/* Fullscreen Button */}
        <button className="cursor-pointer" onClick={handleFullScreen}>
          <FaExpand />
        </button>
      </div>

      <audio ref={audioRef} loop preload="auto" src={selectedAudio} />
    </div>
  );
}

export default MusicPlayer;
