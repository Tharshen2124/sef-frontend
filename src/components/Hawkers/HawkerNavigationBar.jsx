import HawkTuahLogo from "../../assets/hawkTuahLogo.svg"

export default function HawkerNavigationBar() {
    return (
        <nav className="h-[70px] w-full border border-b[#e0e0e0] flex items-center justify-between px-10">
            <img src={HawkTuahLogo} width="148px" alt="" />
            <div className="flex items-center">
                <li className="flex gap-x-8 transition ">
                    <ul className="hover:text-blue-500"><a href="">Dashboard</a></ul>
                    <ul className="hover:text-blue-500"><a href="">Profile</a></ul>
                    <ul className="hover:text-blue-500"><a href="">Feedback</a></ul>
                    <ul className="hover:text-blue-500"><a href="/hawker/view-penalty">Penalties</a></ul>
                </li>
            </div>
            <div className="flex items-center gap-x-4">
                <h2>Hawker Mode</h2>
                <b>|</b>
                <button className="bg-yellow-300 py-2 px-8 rounded-md font-semibold">Logout</button>
            </div>
        </nav>
    )
}