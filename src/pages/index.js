import { Inter } from 'next/font/google'

import LinkComponent from '../../components/LinkComponent'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full  before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
      <h1 className={`mb-3 text-4xl font-bold`}>Trading System Charting Implementation</h1> 
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <LinkComponent heading="Phase I" description="Lightweight charts data (Single Instrument)" hreftag= "/phase1"/>
        <LinkComponent heading="Phase II" description="Fetch Data from websockets." hreftag= "/phase2"/>
        <LinkComponent heading="Phase III" description="OHLC(with option to change resolution)" hreftag= "/phase3"/>
        <LinkComponent heading="Phase IV" description="Multiple Instrument(OHLC + Choose data + resolution change)" hreftag= "/phase4"/>
      </div>
    </main>
  )
}
