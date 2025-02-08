import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar from "../../components/Hawkers/HawkerNavigationBar";
import { supabase } from '../../utils/supabaseClient';
import useAuthStore from '../../store/useAuthStore';


export default function HawkerViewPenaltyPage() {
    const [penalties, setPenalties] = useState([]);
    const [loading, setLoading] = useState(true);
    const { hawkerID } = useParams();
    const { id } = useAuthStore();

    useEffect(() => {
        async function fetchPenalties() {
            try {
                const { data, error } = await supabase
                    .from('Penalty')
                    .select('*')
                    .eq('hawkerID', hawkerID)
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('Error:', error);
                    return;
                }

                setPenalties(data || []);
            } catch (err) {
                console.error('Error fetching penalties:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchPenalties();
    }, [hawkerID]);

    if (loading) {
        return (
            <>
                <NavigationBar />
                <p className="text-center mt-10">Loading...</p>
            </>
        );
    }


  return (
    <>
    <NavigationBar />
    <section className="p-10">
            <h1 className="text-[32px] font-bold">Penalties</h1>

            {penalties.map((penalty, index) => (
                    <div key={index} className="mt-6 border border-[#e0e0e0] rounded-lg grid grid-cols-2 py-8 px-16">
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Penalty Amount:</label>
                        <p className="text-[#555]">RM{penalty.penaltyAmount}</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Violation Type:</label>
                        <p className="text-[#555]">{penalty.violationType}</p>
                    </div>
                </div>
                <div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Created at:</label>
                        <p className="text-[#555]">{new Date(penalty.created_at).toLocaleString()}</p>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="font-semibold">Penalty Document:</label>
                        <p><a href={penalty.document} className="text-blue-600 underline font-semibold">Document Link</a></p>
                    </div>
                </div>
            </div>
        ))}

    {penalties.length === 0 && (
        <p className="text-center mt-6 text-gray-500">No penalties found.</p>
    )}
    </section>
    </>
  );
}
