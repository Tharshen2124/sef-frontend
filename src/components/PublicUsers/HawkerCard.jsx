export default function HawkerCard({ hawkerID, name, address, hawkerImage }) {
  return (
      <div className="border border-[#e0e0e0] max-w-96 min-w-80 rounded-[10px] flex flex-col p-[20px]">
          <img src={hawkerImage} style={{ height: '200px' }} alt={name} className="rounded-[5px]" />
          <h3 className="text-[18px] font-semibold mt-2 text-left">{name}</h3>
          <p className="text-[#555] text-[14px] mb-8 mt-1">{address}</p>
          <a href={`/publicuser/feedback/submit-feedback/${hawkerID}`} className="text-center hover:no-underline w-full text-[14px] active:bg-blue-800 hover:bg-blue-700 bg-blue-600 py-[12px] text-white rounded-[4px] font-semibold mb-2">Submit Feedback</a>
          <a href={`/publicuser/hawkers/${hawkerID}`} className="text-center w-full hover:no-underline active:bg-[#b4bdcb] hover:bg-[#c8d1e2] text-[14px] bg-[#DEE9FC] py-[12px] rounded-[4px] font-semibold">More Info</a>
      </div>
  );
}
