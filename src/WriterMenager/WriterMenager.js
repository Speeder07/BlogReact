import { addDoc } from "firebase/firestore";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { colRef, storage } from "../firebase-config";
import {getStorage, ref} from 'firebase/storage';

export const WriterMenager = (params) =>{
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const types = ['image/png', 'image/jpeg'];
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [progress, setProgress] = useState(0);

    const titleHandler = (e) =>{
        setTitle(e.target.value);
    }

    const contentHandler = (e)=>{
        setContent(e.target.value);
    }

    const fileUploadHandler = (e)=>{
        let selected = e.target.files[0];

        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError('Select image file! (png/jpeg)')
        }
    }

    const addPost=(e)=>{
        if (file==null||title==''||content=='') {
            alert("Wszystkie pola muszą być wypełnione");
            return;
        }

        if (params.user == null) {
            alert("Musisz się zalogować!")
        }

        
        /*const response = fetch(file.uri);
        const blob =response.blob();*/
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed", (snapshot)=>{
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(prog);
        }, (error)=>{
            console.log(error);
        },()=>{
            getDownloadURL(uploadTask.snapshot.ref)
            .then((url)=>{
                addDoc(colRef, {
                    title: title,
                    content: content,
                    user: params.user.displayName,
                    image: url,
                });
            });
        })

        
        /*const imageRef = storageRef.child(file.name);
        imageRef.put(file)
        .then(()=>{
            console.log("udało sie");
        })*/
    }

    return(
        <div id="writerMenager">
            <div id="writeField">
                <input type="file" onChange={fileUploadHandler} id="file" accept="image/x-png,image/jpeg"/>
                <div>
                    <label htmlFor="file">Obraz:  </label>
                    {error&&<spann className="error">{error}</spann>}
                    {file&&<span className="file_name">{file.name}</span>}
                </div>
                <div className="title_input">
                    Nagłówek: <input type="text" value={title} onChange={titleHandler} maxLength="30"/>
                </div>
                <div className="content_input">
                    Treść:
                    <div><textarea value={content} onChange={contentHandler}/></div>
                </div>
                <button className="write_submit" onClick={addPost}>Udostępnij post {progress}%</button>
            </div>
        </div>
    );
}