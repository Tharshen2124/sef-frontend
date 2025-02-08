
export default function PenaltyCard({ penaltyAmount, violationType, createdAt, penaltyDocument }) {
    return (
        <div className="mt-2 border border-[#e0e0e0] rounded-lg grid grid-cols-2 py-8 px-16">
        <div>
            <div className="mt-4">
                <label htmlFor="" className="font-semibold">Penalty Amount:</label>
                <p className="text-[#555]">RM { penaltyAmount }</p>
            </div>
            <div className="mt-4">
                <label htmlFor="" className="font-semibold">Violation Type:</label>
                <p className="text-[#555]">{ violationType }</p>
            </div>
        </div>
        <div>
            <div className="mt-4">
                <label htmlFor="" className="font-semibold">Created at:</label>
                <p className="text-[#555]">{ new Date(createdAt).toLocaleString() }</p>
            </div>
            <div className="mt-4">
                <label htmlFor="" className="font-semibold">Penalty Document:</label>
                <p>
                    <a href={penaltyDocument} className="text-blue-600 underline font-semibold">Photo Link</a>
                </p>                    
            </div>        
        </div>
    </div>
    )
}