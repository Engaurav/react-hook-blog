import React from 'react';
import { appFirebase } from '../firebase';
import { getFirestore, collection ,query , addDoc} from 'firebase/firestore/lite';
import { useFormInput } from '../hooks'; 

const db = getFirestore(appFirebase);
const q = query(collection(db, "cities"));


export default function CreatePost() {
  const title = useFormInput('');
  const content = useFormInput('');
  const subTitle = useFormInput('');


  function handleSubmit (e) {
    e.preventDefault();

    addDoc(q,{
      title: title.value,
      subTitle : subTitle.value,
      content : content.value,
      createAt : new Date()
    })

    console.log('title',title)
    console.log('Sub title',subTitle)
    console.log('content',content)
  }
  return (
    <div className="create-post">
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label> Title
          </label>
          <input {...title} />
        </div>

        <div className="form-field">
          <label> Sub Title
          </label>
          <input {...subTitle}  />
        </div>

        <div className="form-field">
          <label> Content
          </label>
          <textarea {...content}></textarea>
        </div>
        <button className="create-post-btn">Create Post</button>
      
      </form>
    </div>
  )
}
