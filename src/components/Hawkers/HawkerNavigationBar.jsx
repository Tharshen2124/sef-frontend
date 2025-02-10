import { useNavigate } from "react-router-dom"
import HawkTuahLogo from "../../assets/hawkTuahLogo.svg"
import useAuthStore from "../../store/useAuthStore"

export default function HawkerNavigationBar() {
    const { clearId, clearUserType } = useAuthStore()
    const navigate = useNavigate()

    const handleLogout = () => {
        const result = confirm("Are you sure you want to logout?")

        if (result) {
            clearId()
            clearUserType()
            navigate('/')
        }
    }

    return (
        <nav className="h-[70px] w-full border border-b[#e0e0e0] flex items-center justify-between px-10">
            <img src={HawkTuahLogo} width="148px" alt="" />
            <div className="flex items-center">
                <li className="flex gap-x-8 transition ">
                    <ul className="hover:text-blue-500"><a href="/hawker/dashboard">Dashboard</a></ul>
                    <ul className="hover:text-blue-500"><a href="/hawker/profile">Profile</a></ul>
                    <ul className="hover:text-blue-500"><a href="/hawker/feedback">Feedback</a></ul>
                    <ul className="hover:text-blue-500"><a href="/hawker/view-penalty">Penalties</a></ul>
                </li>
            </div>
            <div className="flex items-center gap-x-4">
                <h2>Hawker Mode</h2>
                <b>|</b>
                <button onClick={handleLogout} className="bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-500 py-2 px-8 rounded-md font-semibold">Logout</button>
            </div>
        </nav>
    )
}