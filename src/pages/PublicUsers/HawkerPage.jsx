import React, { useEffect, useState } from 'react';
import HawkerCard from '../../components/PublicUsers/HawkerCard';
import NavigationBar from '../../components/PublicUsers/NavigationBar';
import useAuthStore from '../../store/useAuthStore';
import { supabase } from '../../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function HawkerPage() {
    const { id, userType } = useAuthStore(); 
    const navigate = useNavigate();
    const [hawkers, setHawkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(""); // 🔹 New state for search input

    useEffect(() => {
        if (id && id !== "0" && userType === 'publicuser') {
            // User is authorized; no action needed
            return;
        } else {
            // User is not authorized; show alert and redirect
            alert("You are not authorized to view this page! Only public users are allowed to view this page.");
            navigate('/');
        }
    }, [id, userType]);      

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const { data, error } = await supabase
                .from('Hawker')
                .select(`
                    *,
                    BusinessInfo(*),
                    LicenseApplication!inner(*)
                `)
                .eq('LicenseApplication.status', 'Approved');

            if (error) {
                console.error('Error fetching hawkers:', error);
            } else {
                setHawkers(data || []);
            }
            setLoading(false);
        }

        getData();
    }, []);

    console.log(hawkers)

    // 🔹 Filter hawkers based on the search term (business name)
    const filteredHawkers = hawkers.filter(hawker =>
        hawker.BusinessInfo[0]?.businessName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <NavigationBar />
            <section className="p-10">
                <h1 className="text-4xl font-bold">Hawkers</h1>

                <div className="w-full mt-8">
                    <form className="flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
                        <div className="relative flex-1">
                            <input
                                type="search"
                                placeholder="Search by hawker name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} // 🔹 Update search term
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

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading ? (
                        <p>Loading hawkers...</p>
                    ) : filteredHawkers.length > 0 ? (
                        filteredHawkers.map(hawker => (
                            <HawkerCard 
                                key={hawker.hawkerID} 
                                hawkerID={hawker.hawkerID}
                                name={hawker.BusinessInfo[0].businessName} 
                                address={hawker.LicenseApplication[0].locationPlan} 
                                hawkerImage={hawker.hawkerImage}
                            />
                        ))
                    ) : (
                        <p>No hawkers found matching "{searchTerm}".</p>
                    )}
                </div>
            </section>
        </>
    );
}
