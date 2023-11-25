import { useEffect, useRef, useState } from "react"
import { createRoot } from "react-dom/client"
import classnames from "classnames"

import logo from "./assets/logo.svg"
import settingsIcon from "./assets/icon-settings.svg"

import "./index.css"

const App = () => {
  const timerRef = useRef<NodeJS.Timeout>(null)
  const stopTimerRef = useRef<NodeJS.Timeout>(null)

  const [timerDuration, setTimerDuration] = useState(0)
  const [secondsElapsed, setSecondsElapsed] = useState(0)

  const timeRemaining = timerDuration - secondsElapsed
  const timeRemainingPercentage = (timeRemaining / timerDuration) * 100
  const radius = 46
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = `${circumference * (timeRemainingPercentage / 100)}, ${circumference}`

  const startTimer = (seconds:number) => {
    setTimerDuration(seconds)
    setSecondsElapsed(0)

    timerRef.current = setInterval(() => {
      setSecondsElapsed(value => value + 1)
    }, 1000)

    stopTimerRef.current = setTimeout(() => {
      clearInterval(timerRef.current)
    }, seconds * 1000)
  }

  const padZero = (value:number):string => {
    if (value < 10) {
      return `0${value}`
    }

    return value.toString()
  }

  const formattedTimeRemaining = (() => {
    let diff = timeRemaining

    const seconds = Math.round(diff % 60)

    diff = Math.floor(diff / 60)
    const minutes = Math.floor(diff % 60)

    return `${padZero(minutes)}:${padZero(seconds)}`
  })()

  useEffect(() => {
    startTimer(1 * 60)
  }, [])

  return (
    <main className="font-sans">
      <img src={logo} className="mx-auto mt-8" />
      <div className="md:mx-auto md:max-w-[410px]">
        <div className="mx-6 mt-11 p-2 relative z-10 flex bg-blue-200 rounded-full md:mx-4.5 lg:mt-14">
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
              className={classnames("w-1/3 py-4.5 text-12 rounded-full md:text-14", {
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
          className="mx-6.5 mt-12 p-4 aspect-square bg-gradient-to-br from-[#0E112A] to-[#2E325A] rounded-full md:mx-0 md:mt-25 lg:mt-11"
          style={{ boxShadow: "50px 50px 100px 0px #121530, -50px -50px 100px 0px #272C5A" }}
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-blue-200 rounded-full">
            {(timeRemainingPercentage > 0) && (
              <div className="absolute inset-0">
                <svg
                  className="w-full h-full -rotate-90 stroke-red transition-all"
                  viewBox="0 0 100 100"
                  style={{
                    fill: "transparent",
                    strokeWidth: "3",
                    strokeDasharray,
                    strokeDashoffset: "0",
                    strokeLinecap: "round",
                  }}
                >
                  <circle cx="50" cy="50" r={radius} />
                </svg>
              </div>
            )}
            <p className="text-80 tracking-[-2px] font-bold text-gray-200 md:text-100">{formattedTimeRemaining}</p>
            <p className="text-center text-14 indent-3.5 tracking-[14px] font-bold text-gray-200 md:text-16">PAUSE</p>
          </div>
        </div>
      </div>
      <button type="button" className="mx-auto mt-20 block md:mt-24 lg:mt-16">
        <img src={settingsIcon} />
      </button>
    </main>
  )
}

createRoot(document.getElementById("app")).render(<App />)