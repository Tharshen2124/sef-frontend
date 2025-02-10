import React, { useEffect, useState } from 'react';
import NavigationBar from '../../components/PublicUsers/NavigationBar';
import { supabase } from '../../utils/supabaseClient';
import useAuthStore from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function FeedbackPage() {
    const { id, userType } = useAuthStore(); 
    const [feedbackItems, setFeedbackItems] = useState(null); // Stores feedback data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate()
    
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
            try {
                setLoading(true); // Start loading
                const { data, error } = await supabase
                    .from('Feedback')
                    .select(`
                        *, 
                        Hawker (
                            *,
                            User (*)
                        )
                    `)
                    .eq('publicUserID', id);

                if (error) {
                    throw new Error(error.message); // Throw error for easier handling
                }

                if (data && data.length > 0) {
                    setFeedbackItems(data); // Set feedback data
                } else {
                    setFeedbackItems([]); // Set to empty array if no feedback found
                }
            } catch (err) {
                setError(err.message); // Capture error
            } finally {
                setLoading(false); // Stop loading
            }
        }

        getData();
    }, []);

    return (
        <>
            <NavigationBar />
            <div className="w-full p-10 mx-auto">
                <h1 className="text-3xl font-bold mb-6">Feedback</h1>

                {/* Show loading state */}
                {loading && <p className="text-center text-gray-500">Loading feedback...</p>}

                {/* Show error message */}
                {error && (
                    <p className="text-center text-red-600">
                        Error fetching feedback: {error}
                    </p>
                )}

                {/* Show no data message */}
                {!loading && !error && feedbackItems?.length === 0 && (
                    <p className="text-center text-gray-500">No feedback found.</p>
                )}

                {/* Render feedback table */}
                {!loading && !error && feedbackItems?.length > 0 && (
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-[#999]">
                                <th className="py-2 w-[250px]">Title</th>
                                <th className="py-2 w-[600px] sm:pl-16 md:pl-24 lg:pl-32 xl:pl-48">
                                    Description
                                </th>
                                <th className="py-2 sm:pl-16 md:pl-24 lg:pl-32 xl:pl-48">
                                    Hawker Name
                                </th>
                                <th className="py-2 w-[100px]"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbackItems.map((item, index) => (
                                <tr key={index} className="border-b border-gray-200">
                                    <td className="py-4">{item.feedbackTitle}</td>
                                    <td className="py-6 sm:pl-16 md:pl-24 lg:pl-32 xl:pl-48">
                                        {item.feedbackDescription}
                                    </td>
                                    <td className="py-4 sm:pl-16 md:pl-24 xl:pl-48">
                                        {item.Hawker?.User?.fullName || 'Unknown Hawker'}
                                    </td>
                                    <td className="py-4">
                                        <a
                                            href={`/publicuser/feedback/${item.feedbackID}`}
                                            className="text-blue-600 hover:text-blue-800 underline"
                                        >
                                            More Details
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}
