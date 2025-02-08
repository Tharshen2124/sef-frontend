export default function HawkerCard({ hawkerID, name, address }) {
  return (
      <div className="border border-[#e0e0e0] max-w-96 min-w-80 h-[440px] rounded-[10px] flex flex-col p-[20px]">
          <img src="/image.png" height="145px" alt={name} className="rounded-[5px]" />
          <h3 className="text-[18px] font-semibold mt-2 text-left">{name}</h3>
          <p className="text-[#555] text-[14px] mb-8 mt-1">{address}</p>
          <a href={`/publicuser/feedback/submit-feedback/${hawkerID}`} className="text-center hover:no-underline w-full text-[14px] hover:bg-[#3662E3] bg-[#3662E3] py-[12px] text-white rounded-[4px] font-semibold mb-2">Submit Feedback</a>
          <a href={`/publicuser/hawkers/${hawkerID}`} className="text-center w-full hover:no-underline hover:bg-[#c8d1e2] text-[14px] bg-[#DEE9FC] py-[12px] rounded-[4px] font-semibold">More Info</a>
      </div>
  );
}
