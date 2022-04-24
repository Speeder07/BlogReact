import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { IndexMenager } from "./IndexMenager/IndexMenager"
import { RegisterMenager } from './RegisterMenager/RegisterMenager';
import { WriterMenager } from './WriterMenager/WriterMenager';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

import {auth, colRef, listRef, provider} from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL , listAll} from 'firebase/storage';
import { signInWithPopup } from 'firebase/auth';


const CurrentPage = ()=>{
  const [user, setUser]= useState(null);
  //const [urls, setUrls] = useState([]);
  const [posts, setPosts]= useState([]);
  const [page, setPage] =useState(0);

  useEffect(()=>{
    setDataBaseValues();
    //setImages();
  },[])

  function SetPage(pageId) {
    setPage(pageId);
  }

  function singIn() {
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      setUser(user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }

  function setDataBaseValues() {
    getDocs(colRef)
      .then((snapshot)=>{
          let docs = []
          snapshot.docs.forEach((doc)=>{
              docs.push({...doc.data(), id: doc.id});
          })
          setPosts(docs);
      })
      .catch(err=>{
          console.log(err);
      })
  }

  /*function ImagesAfter(urlArray) {
    console.log("Array:");
      console.log(urlArray);
      setUrls(urlArray);
  }

  function setImages() {
    let urlArray = [];
    var index = 1;
    listAll(listRef).then((res)=>{
      
      res.prefixes.forEach((folderRef)=>{
        console.log(folderRef);
      });
      res.items.forEach((itemRef)=>{
        
        getDownloadURL(itemRef)
        .then((url) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = (event) => {
            const blob = xhr.response;
          };
          xhr.open('GET', url);
          xhr.send();
          urlArray.push(url);
          console.log("SetImage: "+url);
          let temp = res.items;
          console.log(temp.length);
          console.log(index);
          
          if (temp.length == index) {
            console.log("Execute");
            ImagesAfter(urlArray);

          }
          index+=1;
        })
        .catch((error) => {
          console.log(error)
        });
        
      })
      
      
      
    }).catch((error)=>{
      console.log(error);
    });
      
  }*/

  let display;
  switch (page) {
    case 0:
      display =<IndexMenager posts={posts} /*urls={urls}*/ setPage={SetPage} user={user} singIn={singIn}/>
      break;
    case 1:
      display = <WriterMenager setPage={SetPage} user={user}/>
      break;
    default:
      break;
  }

  return(
    <div>
      {display}
    </div>
    
  )

}


ReactDOM.render(
  <CurrentPage/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
