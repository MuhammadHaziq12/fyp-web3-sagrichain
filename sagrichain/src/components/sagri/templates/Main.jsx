//Main.jsx 

import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import About from "@/components/about/About";
import Banner from "@/components/banner/Banner";

const Main = () => {
 return(
    <div>
    <Header />
    <main>
      <Banner/>
    </main>
    <div>
        <About></About>
    </div>
    <Footer/>
  </div>
    
 );
 }

export default Main;
