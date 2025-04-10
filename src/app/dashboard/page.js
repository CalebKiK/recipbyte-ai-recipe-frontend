import Navbar from "@/components/Navbar";
import UserDashboard from "@/components/UserDashboard";

export default function DashboardPage() {
    return(
        <div className="dashboard-page">
            <Navbar />
            <UserDashboard />
        </div>
    )
}