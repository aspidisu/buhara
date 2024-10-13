import PomodoroTimer from "./components/pomordro-timer";

export const metadata = {
  title: "Buhara Pomodoro Zamanlayıcı",
  description: "Buhara Pomodoro Zamanlayıcı",
};

export default function Home() {
  return (
    <div className="">
      <PomodoroTimer />
    </div>
  );
}
