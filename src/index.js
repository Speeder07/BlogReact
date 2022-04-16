import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { IndexMenager } from "./IndexMenager/IndexMenager"
import { RegisterMenager } from './RegisterMenager/RegisterMenager';
import { WriterMenager } from './WriterMenager/WriterMenager';


import {db} from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const CurrentPage = ()=>{
  const [users, setUsers]= useState([]);
  const [posts, setPosts]= useState([]);
  const usersReference = collection(db, "users");
  const postsReference = collection(db, "posts");
  useEffect(()=>{
    const getUsers = async ()=>{
      const data = await getDocs(usersReference);
      setUsers(data.docs.map((doc)=>({...doc.data(), id: doc.id})));
    }

    const getPosts = async ()=>{
      const data = await getDocs(postsReference);
      setPosts(data.docs.map((doc)=>({...doc.data(), id: doc.id})));
    }

    getUsers();
    getPosts();
  },[])

  return(
    <IndexMenager/>
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
