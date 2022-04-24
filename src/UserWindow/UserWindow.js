
export const UserWindow = (props) =>{

    let display;
    if (props.user==null) {
        display = <button className="login_button" onClick={props.singIn}>Zaloguj się!</button>;
    }
    else{
        display = <span>{props.user.displayName}</span>
    }
    return(
        <div id="userWindow">
            {display}
        </div>
    );
}