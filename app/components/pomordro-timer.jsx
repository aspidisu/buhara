"use client";
import { useState, useEffect } from "react";
import { FaCog } from "react-icons/fa";

const PomodoroTimer = () => {
  const [time, setTime] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [motivationalQuote, setMotivationalQuote] = useState("");
  const [quoteVisible, setQuoteVisible] = useState(true);
  const [isSettingTime, setIsSettingTime] = useState(true);
  const [selectedTime, setSelectedTime] = useState(25);
  const [showSettings, setShowSettings] = useState(false);
  const [bgColor, setBgColor] = useState(
    "bg-gradient-to-r from-blue-400 to-blue-600"
  );
  const [startButtonColor, setStartButtonColor] = useState("bg-teal-500");
  const [resetButtonColor, setResetButtonColor] = useState("bg-gray-600");

  const quotes = [
    "Başarı, sürekli çaba gerektirir.",
    "Hayallerine ulaşmak için çabalamaktan asla vazgeçme.",
    "Zorluklar, başarının bir parçasıdır.",
    "Küçük adımlar büyük başarılara yol açar.",
    "Her gün daha iyi olmak için bir fırsattır.",
    "Düşmekten korkma, kalkmaktan vazgeçmekten kork.",
    "Bugün attığın adım, yarının temelini oluşturur.",
    "Başarısızlık, başarının anahtarıdır.",
    "Kendine inanmadan, kimse sana inanmaz.",
    "Kazanmak için önce inanmalısın.",
    "Zaman, en büyük servetindir; onu iyi kullan.",
    "Hedeflerine ulaşmak için her gün bir adım at.",
    "Başarı, konfor alanının dışında başlar.",
    "Yapabileceğine inandığında, yarı yolda sayılırsın.",
    "Her zorluk bir fırsat barındırır.",
    "Bugünün işini yarına bırakma.",
    "Hayallerinin peşinden koşarken yorulmaktan korkma.",
    "En büyük başarılar, en büyük zorlukların ardından gelir.",
    "İlerlemek için küçük adımlar yeterlidir.",
    "Her yeni gün, yeni bir başlangıçtır.",
  ];

  let pomodoroEndSound;
  let breakEndSound;

  useEffect(() => {
    if (typeof window !== "undefined") {
      pomodoroEndSound = new Audio("/zil.mp3");
      breakEndSound = new Audio("/zil.mp3");
    }

    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            if (isBreak) {
              breakEndSound.play();
              resetTimer();
            } else {
              setIsBreak(true);
              pomodoroEndSound.play();
              return 300;
            }
          }
          return prevTime > 0 ? prevTime - 1 : 0;
        });
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time, isBreak]);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setMotivationalQuote(quotes[randomIndex]);
        setQuoteVisible(true);
      }, 500);
    }, 10000);

    return () => clearInterval(quoteInterval);
  }, []);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setIsSettingTime(true);
    setTime(1500);
    setSelectedTime(25);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const startTimerWithSelectedTime = () => {
    setTime(selectedTime * 60);
    setIsSettingTime(false);
  };

  const handleBgColorChange = (color) => {
    setBgColor(color);
    setShowSettings(false);
  };

  const handleStartButtonColorChange = (color) => {
    setStartButtonColor(color);
  };

  const handleResetButtonColorChange = (color) => {
    setResetButtonColor(color);
  };

  return (
    <div
      className={`${bgColor} flex flex-col items-center justify-center h-screen text-white font-sans`}
    >
      <div className="absolute top-4 left-4">
        <FaCog
          className="text-3xl cursor-pointer hover:text-gray-300 transition"
          onClick={() => setShowSettings(!showSettings)}
        />
      </div>

      {showSettings && (
        <div className="absolute text-xl max-sm:text-base top-20 max-sm:top-16 left-4 bg-white text-black rounded-lg shadow-lg p-4 z-10">
          <h3 className="mb-4">Arka Plan Rengini Seç</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "bg-gradient-to-r from-blue-400 to-blue-600",
              "bg-gradient-to-r from-green-400 to-green-600",
              "bg-gradient-to-r from-red-400 to-red-600",
              "bg-gradient-to-r from-yellow-400 to-yellow-600",
              "bg-gradient-to-r from-purple-400 to-purple-600",
              "bg-gradient-to-r from-pink-400 to-pink-600",
              "bg-gradient-to-r from-indigo-400 to-indigo-600",
              "bg-gradient-to-r from-teal-400 to-teal-600",
              "bg-gradient-to-r from-gray-400 to-gray-600",
              "bg-gradient-to-r from-orange-400 to-orange-600",
            ].map((colorClass, index) => (
              <div
                key={index}
                className={`w-10 max-sm:w-7 h-10 max-sm:h-7 cursor-pointer rounded-lg ${colorClass}`}
                onClick={() => handleBgColorChange(colorClass)}
              />
            ))}
          </div>

          <h3 className="mt-4 mb-2">Başla Buton Rengini Seç</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "bg-teal-500",
              "bg-red-500",
              "bg-green-500",
              "bg-blue-500",
              "bg-yellow-500",
              "bg-purple-500",
              "bg-pink-500",
              "bg-indigo-500",
              "bg-gray-500",
              "bg-orange-500",
            ].map((colorClass, index) => (
              <div
                key={index}
                className={`w-10 max-sm:w-7 h-10 max-sm:h-7 cursor-pointer rounded-lg ${colorClass}`}
                onClick={() => handleStartButtonColorChange(colorClass)}
              />
            ))}
          </div>

          <h3 className="mt-4 mb-2">Sıfırla Buton Rengini Seç</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "bg-teal-500",
              "bg-red-500",
              "bg-green-500",
              "bg-blue-500",
              "bg-yellow-500",
              "bg-purple-500",
              "bg-pink-500",
              "bg-indigo-500",
              "bg-gray-500",
              "bg-orange-500",
            ].map((colorClass, index) => (
              <div
                key={index}
                className={`w-10 max-sm:w-7 h-10 max-sm:h-7 cursor-pointer rounded-lg ${colorClass}`}
                onClick={() => handleResetButtonColorChange(colorClass)}
              />
            ))}
          </div>
        </div>
      )}

      {isSettingTime ? (
        <div className="flex flex-col items-center">
          <h2 className="text-4xl max-sm:text-center font-semibold mb-5">
            Pomodoro Süresini Ayarla
          </h2>
          <input
            type="range"
            min="5"
            max="60"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="mb-5"
            step="1"
          />
          <p className="text-2xl mb-5">{selectedTime} dakika</p>
          <button
            className={`w-32 py-3 ${startButtonColor} hover:bg-opacity-70 transition-all duration-300 rounded-lg shadow-lg`}
            onClick={startTimerWithSelectedTime}
          >
            Başla
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-4xl max-sm:text-center font-semibold mb-5">
            Buhara Pomodoro Zamanlayıcı
          </h2>{" "}
          <h1 className="text-6xl mb-5">{formatTime(time)}</h1>
          <div className="flex gap-5">
            <button
              className={`w-32 py-3 ${startButtonColor} hover:bg-opacity-70 transition-all duration-300 rounded-lg shadow-lg`}
              onClick={toggleTimer}
            >
              {isActive ? "Durdur" : "Başlat"}
            </button>
            <button
              className={`w-32 py-3 ${resetButtonColor} hover:bg-opacity-70 transition-all duration-300 rounded-lg shadow-lg`}
              onClick={resetTimer}
            >
              Sıfırla
            </button>
          </div>
          {quoteVisible && (
            <div className="mt-10 text-center">
              <p className="text-xl italic">{motivationalQuote}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PomodoroTimer;
