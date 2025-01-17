export default function HawkerCard() {
  return (
    <>
        <div className="border border-[#e0e0e0] max-w-96 min-w-80 h-[440px] rounded-[10px] flex flex-col p-[20px]">
            <img src="/image.png" height="145px" alt="" className="rounded-[5px]" />
            <h3 className="text-[18px] font-semibold mt-2">Hainese Chicken Rice</h3>
            <p className="text-[#555] text-[14px] mb-8 mt-1">No.1 Jalan SP 10/5, Bandar Saujana Putra, 42610 Jenjarom, Selangor</p>
            <button className="w-full text-[14px] bg-[#3662E3] py-[12px] text-white rounded-[4px] font-semibold mb-2">Submit Feedback</button>
            <button className="w-full text-[14px] bg-[#DEE9FC] py-[12px] rounded-[4px] font-semibold">More Info</button>
        </div>
    </>
  )
}
