import React, { useEffect, useState } from 'react'
import HawkerCard from '../../components/PublicUsers/HawkerCard'
import NavigationBar from '../../components/PublicUsers/NavigationBar'
import useAuthStore from '../../store/useAuthStore';

export default function HawkerPage() {
    const { id, userType } = useAuthStore(); 
    const [shouldRedirect, setShouldRedirect] = useState(false);
  
    useEffect(() => {
        if (userType !== 'publicuser') {
            setShouldRedirect(true);
        }
    }, [id, userType]);  
  
    if (shouldRedirect) {
        return <Navigate to="/" replace />;
    } 
  
  return (
    <>
        <NavigationBar/>
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
