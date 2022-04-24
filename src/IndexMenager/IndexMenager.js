import { Header } from "../Header/Header"
import { MainPage } from "../MainPage/MainPage"

export const IndexMenager = (props) =>{

    return(
        <div id="indexMenager">
            <Header/>
            <MainPage posts={props.posts} /*urls={props.urls}*/ setPage={props.setPage} user={props.user} singIn={props.singIn}/>
        </div>
    );
}