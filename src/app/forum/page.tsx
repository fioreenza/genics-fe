import ForumHome from "../container/forum/forum-home";

import MainLayout from "./layout";
import ForumList from "../container/forum/forum-list";

export default function Forum(){
    return (
        <MainLayout>
            <ForumHome/>
            <ForumList/>
        </MainLayout>
    )
}