export const Article = (props)=>{

    console.log();
    
    return(
        <div className="article">
            <div className="art_user">
            {props.post.user}
            </div>
            <div className="art_content">
                <div>
                    <img src={props.post.image} alt="image"></img>
                </div>
                <span className="title">{props.post.title}</span>
                <div className="article_content">{props.post.content}</div>
            </div>
        </div>
    );
}