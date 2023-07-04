import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Token() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
    <video
      autoPlay
      loop
      muted
      className="absolute z-10 w-full h-full object-cover"
      src="https://yummy-ninja.oss-us-east-1.aliyuncs.com/videos/testing.mp4"
    >
      <source src="https://yummy-ninja.oss-us-east-1.aliyuncs.com/videos/testing.mp4" type="video/mp4" />
    </video>
    <div className="absolute z-20 w-full h-full bg-black opacity-80"></div>
    <div className="relative z-30">
    <header className="flex justify-between items-center p-5 text-white">
        <img src="logo.png" alt="Logo" className="h-10 w-auto" />
        <div className="flex items-center space-x-4">
        <a href="https://twitter.com/AzukiCrush" target="_blank" rel="noopener noreferrer">
          <button>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg" alt="Twitter" className="h-6 w-6 inline-block align-text-top" />
          </button>
        </a>
          <a href="https://t.me/AzukiCrush" target="_blank" rel="noopener noreferrer">
            <button>
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt="Telegram" className="h-6 w-6 inline-block align-text-top" />
            </button>
          </a>
            <div>
                <ConnectWallet />
            </div>
        </div>
    </header>
    <main className={styles.main}>

      </main>
      
    </div>
    
  </div>
  )
}
