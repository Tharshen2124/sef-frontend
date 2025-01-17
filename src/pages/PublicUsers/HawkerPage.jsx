import React from 'react'
import HawkTuahLogo from "../../assets/hawkTuahLogo.svg"
import HawkerCard from '../../components/PublicUsers/HawkerCard'

export default function HawkerPage() {
  return (
    <>
        <nav className="h-[70px] w-full border border-b[#e0e0e0] flex items-center justify-between px-10">
            <img src={HawkTuahLogo} width="148px" alt="" />
            <div className="flex items-center">
                <li className="flex gap-x-8 transition ">
                    <ul className="hover:text-blue-500"><a href="">Hawkers</a></ul>
                    <ul className="hover:text-blue-500"><a href="">Feedbacks</a></ul>
                </li>
            </div>
            <div className="flex items-center gap-x-4">
                <h2>Public User Mode</h2>
                <b>|</b>
                <button className="bg-yellow-300 py-2 px-8 rounded-md font-semibold">Logout</button>
            </div>
        </nav>
        <section className="p-10">
            <h1 className="text-4xl font-bold">Hawkers</h1>
            
            <div className="w-full mt-8">
                <form className="flex items-center gap-2">
                    <div className="relative flex-1">
                        {/* <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /> */}
                        <input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-md border border-gray-200 bg-white py-2 pl-10 pr-4 text-base outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                        <button
                        type="submit"
                        className="rounded-md bg-[#3662E3] px-8 py-2 font-medium text-white transition-colors hover:bg-[#4F46E5]/90 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:ring-offset-2"
                        >
                            Search
                        </button>
                </form>
            </div>

            <div className="mt-8 flex flex-wrap gap-7">
                <HawkerCard />
                <HawkerCard />
                <HawkerCard />
                <HawkerCard />
                <HawkerCard />
                <HawkerCard />
                <HawkerCard />
                <HawkerCard />
            </div>
        </section>
    </>
  )
}
