import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { appFirebase } from '../firebase';
import { getFirestore , collection , getDocs, query } from 'firebase/firestore/lite';

export default function Home() {
  const [ posts, setPosts ] = useState([]);
  // console.log("Hello");
  useEffect(()=>{
    const db = getFirestore(appFirebase);
    const q = query(collection(db, "posts"))

    const querySnapshot =  getDocs(q);
    querySnapshot.then((snapshot)=>{
      const posts = snapshot.docs.map((doc)=>{
        return {
          id : doc.id,
          ...doc.data()
        }
      })
      setPosts(posts);

    }).catch(err => console.log(err.message));

  },[]);

  return (
    <div className='home'>
      <h1>Tech Blog</h1>
      <div id='blog-by'>Akash</div>
      {
        posts.map((post,index)=>{
          return <div className='post' key ={`post-${index}`}>
            <Link to={`/post/${post.id}`}>
              <h3>{post.title}</h3> 
            </Link>
            <p>{post.subTitle}</p>
          </div>
        })
      }
    </div>
  )
}
