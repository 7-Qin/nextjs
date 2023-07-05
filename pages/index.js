import { useState, useEffect } from 'react';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { useContract, useTransferToken,useClaimToken, Web3Button } from "@thirdweb-dev/react";
import axios from 'axios';


export default function Home() {
  //字体特效
  const [description, setDescription] = useState('Make Azuki Great Again!');
  const [title, setTitle] = useState('Welcome to Azuki Crush');
  const [showDescription, setShowDescription] = useState(true);
  const [showTitle, setShowTitle] = useState(true);
  //字体特效
  useEffect(() => {
    const timer = setInterval(() => {
      setShowDescription(false);
      setShowTitle(false);
      setTimeout(() => {
        setDescription(prevDescription => prevDescription === 'Make Azuki Great Again!' ? 'STAND TOGETHER, AZUKI HOLDERS!' : 'Make Azuki Great Again!');
        setTitle(prevTitle => prevTitle === 'Welcome to Azuki Crush' ? 'A Match-3 Game to MOCK Azuki' : 'Welcome to Azuki Crush');
        setShowDescription(true);
        setShowTitle(true);
      }, 500); // Wait for the fade out animation to finish
    }, 2500); // Change every 3 seconds

    return () => clearInterval(timer); // Clean up on component unmount
  }, []);


  // Crypto与Claim相关
  // 你的智能合约地址
  const contractAddress = "0x3E2FBD482802De1d2e8BB80BB0C1f0EBaBc0b061";

  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [referrerPublicKey, setReferrerPublicKey] = useState(null);

  const address = useAddress();  // 使用useAddress hook来获取当前钱包地址
  const { contract } = useContract(contractAddress);  // 使用useContract hook来获取你的智能合约
  const { mutateAsync: claimToken, isLoading, error } = useClaimToken(contract);  // 使用useClaimToken hook来实现token的claim

  // 从URL中获取referrerPublicKey
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setReferrerPublicKey(urlParams.get('refer'));
  }, []);

  // console.log("address"+address);

  const handleInvestmentAmountChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && Number(value) >= 0) {
      setInvestmentAmount(value);
    } else {
      alert('Please enter a valid number.');
    }
  };

  const handleClaimToken = async () => {
    try {
      await claimToken({
        to: address,  // 使用useAddress hook来获取当前钱包地址
        amount: investmentAmount,  // 从输入框中获取要claim的token数量
      });
  
      // 如果claim成功，保存数据到MongoDB
      await saveToMongoDB();
    } catch (error) {
      console.error('Error claiming token:', error);
    }
  };
  
  // console.log("referrerPublicKey is"+referrerPublicKey);
  async function saveToMongoDB() {
    try {
      const response = await axios.get('https://nodejs.meme-crush.com/api/investment', {
        params: {
          investorPublicKey: address,
          referrerPublicKey: referrerPublicKey,
          investmentAmount: investmentAmount
        }
      });
  
      console.log(response.data);
    } catch (err) {
      console.error('Error sending request:', err);
    }
  }
  

  

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
    <video
      autoPlay
      loop
      muted
      className="fixed top-0 left-0 right-0 bottom-0 z-10 w-full h-full object-cover"
      src="https://yummy-ninja.oss-us-east-1.aliyuncs.com/videos/testing.mp4"
    >
      <source src="https://yummy-ninja.oss-us-east-1.aliyuncs.com/videos/testing.mp4" type="video/mp4" />
    </video>
    <div className="absolute z-20 w-full h-full bg-black opacity-80"></div>
    <div className="relative z-30">
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-5 text-white pt-5 md:pt-12 px-8 lg:px-12">
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
    <h1 className={`${styles.title} fade ${showTitle ? 'show' : ''} mt-12`}>{title}</h1>
        <p className={`${styles.description} fade ${showDescription ? 'show' : ''}`}>{description}</p>
        <div className={styles.grid}>
          <a href="https://testing.azukicrush.com/" className={styles.card}>
            <h2>Play Game &rarr;</h2>
            <p>
              A Match-3 Game Based on The Azuki Theme 
            </p>
          </a>

          <a href="https://testing.azukicrush.com/" className={styles.card}>
            <h2>Petition &rarr;</h2>
            <p>
              Unite Azuki Advocates to Stand Against Elementals
            </p>
          </a>
          <a
            href="https://testing.azukicrush.com/"
            className={styles.card}
          >
            <h2>Get $AZUKI</h2>
            <p>
              Unite to keep pressure on the Azuki Team to do the right thing
            </p>
          </a>
        </div>

        <section className={`${styles.section} mt-20 text-center`}>

          <p>Azuki Crush, a Match-3 game based on the Azuki theme, was built by a group of Azuki advocates and long-term Azuki holders to express their anger towards Azuki's recent actions.</p>
          <p>We hope that all Azuki advocates can unite to put pressure on Azuki and petition for a redesign of Elements Collection</p>
        </section>

        {/* get $AZUKI */}
        <section className="idoSection">
          <div className="idoText">
            <h2 className="idotitle">Get $AZUKI</h2>
            <p>Azuki Crush, a Match-3 game based on the Azuki theme, was built by a group of Azuki advocates and long-term Azuki holders to express their anger towards Azuki's recent actions.Azuki Crush, a Match-3 game based on the Azuki theme, was built by a group of Azuki advocates and long-term Azuki holders to express their anger towards Azuki's recent actions.Azuki Crush, a Match-3 game based on the Azuki theme, was built by a group of Azuki advocates and long-term Azuki holders to express their anger towards Azuki's recent actions.Azuki Crush, a Match-3 game based on the Azuki theme, was built by a group of Azuki advocates and long-term Azuki holders to express their anger towards Azuki's recent actions. </p>
          </div>
          <div className="idoForm">
          
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Get $AZUKI Now
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* TODO */}
          {/* 这个就是发送http get https://nodejs.meme-crush.com/api/investment的地方 */}
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="ethAmount" className="block text-sm font-medium leading-6 text-white">
                How much $ETH do you want to send?
              </label>
              <div className="mt-2">
                <input
                  id="ethAmount"
                  name="ethAmount"
                  type="number"
                  required
                  onChange={handleInvestmentAmountChange}
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <Web3Button
              contractAddress={contractAddress}
              action={handleClaimToken}
            >
              Claim Token
            </Web3Button>
          </form>

        </div>
      </div>
          </div>
        </section>
      </main>
      
    </div>
    
  </div>
  
  );
}
