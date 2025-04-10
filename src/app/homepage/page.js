import DidYouKnow from "@/components/DidYouKnow";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

export default function HomePage() {
    return(
        <div className="home-page">
            <Navbar />
            <HeroSection />
            <DidYouKnow />
        </div>
    )
}