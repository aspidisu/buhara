"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaCog, FaInfoCircle, FaGithub } from "react-icons/fa";

const PomodoroTimer = () => {
  const [time, setTime] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [motivationalQuote, setMotivationalQuote] = useState("");
  const [quoteVisible, setQuoteVisible] = useState(true);
  const [isSettingTime, setIsSettingTime] = useState(true);
  const [selectedTime, setSelectedTime] = useState(25);
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [bgColor, setBgColor] = useState(
    "bg-gradient-to-r from-blue-400 to-blue-600"
  );
  const [startButtonColor, setStartButtonColor] = useState("bg-teal-500");
  const [resetButtonColor, setResetButtonColor] = useState("bg-gray-600");
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

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
    setNotes([]);
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

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    if (showInfo) {
      setShowInfo(false);
    }
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
    if (showSettings) {
      setShowSettings(false);
    }
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

  const increaseTime = () => {
    setSelectedTime((prev) => (prev < 60 ? prev + 1 : 60));
  };

  const decreaseTime = () => {
    setSelectedTime((prev) => (prev > 5 ? prev - 1 : 5));
  };

  const quickSetTime = (minutes) => {
    setSelectedTime(minutes);
  };

  const handleNoteAdd = () => {
    if (newNote.trim()) {
      const remainingTime = formatTime(time);
      setNotes([...notes, `${newNote} ( ${remainingTime})`]);
      setNewNote("");
    }
  };

  const handleTextareaTransfer = () => {
    if (newNote.trim() !== "") {
      setNotes([...notes, { text: newNote, time: formatTime(time) }]);
      setNewNote("");
    }
  };

  return (
    <div
      className={`${bgColor} flex flex-col items-center justify-center h-screen text-white font-sans`}
    >
      <div className="absolute top-4 left-4">
        <FaCog
          className="text-3xl cursor-pointer hover:text-gray-300 transition"
          onClick={toggleSettings}
        />
      </div>

      <div className="absolute top-4 left-14">
        <FaInfoCircle
          className="text-3xl cursor-pointer hover:text-gray-300 transition"
          onClick={toggleInfo}
        />
      </div>

      <div className="absolute top-4 left-24">
        <Link href="https://github.com/aspidisu/buhara" target="_blank">
          {" "}
          <FaGithub className="text-3xl cursor-pointer hover:text-gray-300 transition" />
        </Link>
      </div>

      {showInfo && (
        <div className="absolute text-xl max-sm:text-base max-xs:text-sm top-20 max-sm:top-16 left-4 bg-white text-black rounded-lg shadow-lg p-4 z-10 w-[24rem] max-xs:w-[20.5rem]">
          <h3 className="mb-4 font-semibold">Buhara Nasıl Çalışır?</h3>
          <div className="flex flex-wrap gap-5">
            <p>
              Buhara, çalışma sürelerinizi daha verimli hale getirmek için
              tasarlanmış bir uygulamadır. Uygulama, istediğiniz çalışma
              süresini seçmenize olanak tanır ve bu süre boyunca tamamen
              odaklanarak çalışmanızı sağlar.
            </p>
            <p>
              {" "}
              Çalışma süresi sona erdiğinde, 5 dakikalık kısa bir ara
              verirsiniz. Bu ara, zihninizi dinlendirmek ve odaklanmanızı
              tazelemek için önemlidir.{" "}
            </p>
            <p>
              Uygulama, belirlediğiniz süreleri tutarak size geri bildirim
              sağlar. Böylece, çalışma alışkanlıklarınızı takip edebilir ve
              gerektiğinde ayarlamalar yapabilirsiniz. Buhara, verimliliğinizi
              artırmak ve tükenmişliği önlemek amacıyla geliştirilmiştir.
            </p>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="absolute text-xl max-sm:text-base top-20 max-sm:top-16 left-4 bg-white text-black rounded-lg shadow-lg p-4 z-10">
          <h3 className="mb-4">Arka Plan Rengini Seç</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600",
              "bg-gradient-to-r from-green-400 via-green-500 to-green-600",
              "bg-gradient-to-r from-red-400 via-red-500 to-red-600",
              "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600",
              "bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600",
              "bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600",
              "bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600",
              "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600",
              "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600",
              "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600",
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
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl max-sm:text-4xl font-bold my-4">Buhara</h1>
          <h2 className="text-4xl max-sm:text-2xl max-sm:text-center font-semibold mb-5">
            Çalışma Süresini Ayarla
          </h2>
          <div className="flex items-center gap-4 mb-5">
            <button
              className="bg-gray-600 px-3 py-1 rounded-lg"
              onClick={decreaseTime}
            >
              -
            </button>
            <p className="text-2xl">{selectedTime} dakika</p>
            <button
              className="bg-gray-600 px-3 py-1 rounded-lg"
              onClick={increaseTime}
            >
              +
            </button>
          </div>
          <div className="flex gap-4 mb-5">
            {[15, 25, 30, 45].map((minute) => (
              <button
                key={minute}
                className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-opacity-80 transition"
                onClick={() => quickSetTime(minute)}
              >
                {minute} dk
              </button>
            ))}
          </div>
          <button
            className={`w-32 py-3 ${startButtonColor} hover:bg-opacity-70 transition-all duration-300 rounded-lg shadow-lg`}
            onClick={startTimerWithSelectedTime}
          >
            Başla
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-5xl max-sm:text-3xl max-sm:text-center font-bold mb-5">
              Buhara
            </h2>{" "}
            <h1 className="text-6xl max-sm:text-4xl mb-5">{formatTime(time)}</h1>
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
            <div
              className={`mt-10 text-2xl max-sm:text-xl text-center transition-opacity duration-500 ${
                quoteVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {motivationalQuote || "İşinize odaklanın!"}
            </div>
            <div className="mt-10 flex items-start justify-center">
              <textarea
                className="bg-gray-700 w-80 max-sm:w-60 p-4 rounded-lg text-white mb-4"
                placeholder="Not ekle..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              ></textarea>
              <button
                className="bg-green-500 px-4 py-2 rounded-lg ml-2"
                onClick={handleNoteAdd}
              >
                Not Ekle
              </button>
            </div>{" "}
            <div className="mx-3">
              <h4 className="text-2xl font-semibold  mt-4 mb-2 text-center">
                Notlar
              </h4>
              <div className="flex items-center justify-center gap-5 flex-wrap">
                {notes.map((note, index) => (
                  <textarea
                    key={index}
                    value={note}
                    readOnly
                    className="w-80 h-24 mb-2 p-2 border-gray-300 rounded-lg bg-gray-700 "
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PomodoroTimer;
