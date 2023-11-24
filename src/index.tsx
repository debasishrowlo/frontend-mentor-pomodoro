import { createRoot } from "react-dom/client"
import classnames from "classnames"

import logo from "./assets/logo.svg"
import settingsIcon from "./assets/icon-settings.svg"

import "./index.css"

const App = () => {
  return (
    <main className="font-sans">
      <img src={logo} className="mx-auto mt-8" />
      <div className="mx-6 mt-11 p-2 relative z-10 flex bg-blue-200 rounded-full">
        {[
          {
            name: "pomodoro",
            isActive: true,
          },
          {
            name: "short break",
            isActive: false,
          },
          {
            name: "long break",
            isActive: false,
          },
        ].map((button, index) => (
          <button 
            type="button" 
            className={classnames("w-1/3 py-4.5 text-12 rounded-full", {
              "text-gray-200/40": !button.isActive,
              "bg-red text-blue-100": button.isActive,
            })}
            key={index}
          >
            {button.name}
          </button>
        ))}
      </div>
      <div 
        className="mx-6.5 mt-12 p-4 aspect-square bg-gradient-to-br from-blue-200 to-blue-100 rounded-full"
        style={{ boxShadow: "50px 50px 100px 0px #121530, -50px -50px 100px 0px #272C5A" }}
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-blue-200 rounded-full">
          <div className="absolute inset-0">
            <svg
              className="w-full h-full -rotate-90"
              viewBox="0 0 100 100"
              style={{
                fill: "transparent",
                stroke: "#F87070",
                strokeWidth: "3",
                strokeDasharray: 285,
                strokeDashoffset: "0",
                strokeLinecap: "round",
              }}
            >
              <circle cx="50" cy="50" r="45" />
            </svg>
          </div>
          <p className="text-80 font-bold text-gray-200">17:59</p>
          <p className="text-center text-14 indent-3.5 tracking-[14px] font-bold text-gray-200">PAUSE</p>
        </div>
      </div>
      <button type="button" className="mx-auto mt-20 block">
        <img src={settingsIcon} />
      </button>
    </main>
  )
}

createRoot(document.getElementById("app")).render(<App />)