import { UserWindow } from "../UserWindow/UserWindow"

export const SideBar = (props)=>{
    return(
        <div id="sideBar">
            <UserWindow user={props.user} singIn={props.singIn}/>
        </div>
    );
}