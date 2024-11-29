import ForumHome from "../container/forum/forum-home";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ForumList from "../container/forum/forum-list";

export default function Forum(){
    return (
        <>
        <Navbar/>
            <ForumHome/>
            <ForumList/>
        <Footer/>
        </>
    )
}