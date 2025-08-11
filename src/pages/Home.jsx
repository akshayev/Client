
import Gallery from "../componets/Gallery"
import Join from "../componets/Join"
import Testimonials from "../componets/Testimonials"
import Hero from "../componets/Hero"
import Event from "../componets/Event"
import Team from "../componets/Team"
import AboutSection from "../componets/About"
import SocialFeed from "../componets/SocialFeed"

function Home() {
  return (
    <div className="font-sans antialiased text-gray-900 ">
      <div className="bg-black text-white">
        <div className="bg-stone-900 text-white font-sans">
          <Hero />
          <div id="work" className="min-h-screen text-center">
            <AboutSection />
            <Gallery />
            <Event />
            <Team />
            <Testimonials />
            <SocialFeed />
            <Join />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home