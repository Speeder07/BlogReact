import { Article } from "../Article/Article"
import { SideBar } from "../SideBar/SideBar"

export const MainPage = (props)=>{
    return( 
        <div id="mainPage">
            MainPage
            <div id="articleArray">
                <Article/>
                <Article/>
                <Article/>
            </div>
            <SideBar/>
        </div>
    )
}