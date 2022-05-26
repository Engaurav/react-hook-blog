import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { appFirebase } from '../firebase';
import { getFirestore , getDoc, doc } from 'firebase/firestore/lite';


export default function PostDetail() {

  const { postId } = useParams();
  const [post, setpost] = useState([]);

  useEffect(()=>{
    const db = getFirestore(appFirebase);
    
    // const q = query(collection(db, "posts"))

    const docRef = doc(db, "posts", postId);
    const docSnap =  getDoc(docRef);
    // console.log(docSnap)
    docSnap.then((data)=>{
      setpost(data.data())
    })
},[postId,post]);

  return (
    <div className='post-detail'>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}
