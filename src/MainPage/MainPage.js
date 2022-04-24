import { useEffect, useState } from "react"
import { Article } from "../Article/Article"
import { SideBar } from "../SideBar/SideBar"

export const MainPage = (props)=>{

    return( 
        <div id="mainPage">
            <div id="articleArray">
                {props.posts.map((post, i)=>{
                    /*console.log("MainPage:");
                    console.log(props.urls[i]);*/
                    return <Article post={post} /*url={props.urls[i]}*//>
                })}
                <button onClick={()=>props.setPage(1)}>Dodaj wpis</button>
            </div>
            <SideBar user={props.user} singIn={props.singIn}/>
        </div>
    )
}