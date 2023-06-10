import React, { useState } from "react";
import classes from "./create.module.css";
import Navbar from "../../components/navbar/Navbar";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { request } from "../../utils/fetchApi";

function Create() {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [img, setImg] = useState('')
    const [category, setCategory] = useState('')
    const navigate = useNavigate()
    const {token} = useSelector((state)=>state.auth)
  const categories = [
    "nature",
    "music",
    "travel",
    "design",
    "programming",
    "fun",
    "fashion",
  ];

  const onchangeFile = (e) =>{
    setImg(e.target.files[0])
  }

  const handleCloseImg = () =>{
    setImg(null)
  }

  const handleCreateBlog = async(e) => {
    e.preventDefault()

    try {
        const formDate = new FormData()

        let filename = null
        if(img){
            filename = crypto.randomUUID() + img.name
            formDate.append("filename", filename)
            formDate.append("image", img)

            await fetch(`http://localhost:5000/upload`, {
                method:'POST',
                body: formDate
            })
        } else {
            return
        }

        const options = {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }

        const body = {
            title,
            desc, 
            category, 
            photo: filename
        } 
        const data = await request('/blog', "POST", options, body)
        console.log(data)
        // navigate(`/blogDetails/${data._id}`)
        navigate('/')
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <h2 className={classes.title}>Create Blog</h2>
          <form onSubmit={handleCreateBlog} encType="multipart/form-data">
            <div className={classes.inputWrapper}>
              <label>Title: </label>
              <input
                type="text"
                placeholder="Title..."
                className={classes.input}
                onChange={(e)=>setTitle(e.target.value)}
              />
            </div>
            <div className={classes.inputWrapper}>
              <label>Description: </label>
              <input
                type="text"
                placeholder="Description..."
                className={classes.input}
                onChange={(e)=>setDesc(e.target.value)}
              />
            </div>
            <div className={classes.inputWrapperSelect}>
              <label>Category: </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={crypto.randomUUID()} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className={classes.inputWrapperImg}>
              <label htmlFor="image" className={classes.labelFileInput}>
                Image: <span>Upload here</span>
              </label>
              <input
                id="image"
                type="file"
                className={classes.input}
                onChange={onchangeFile}
                style={{ display: "none" }}
              />
              {img && <p className={classes.imageName}>{img.name}<AiOutlineCloseCircle className={classes.closeIcon} onClick={()=>handleCloseImg()}/></p>}
            </div>
            <div className={classes.buttonWrapper}>
                <button className={classes.submitBtn} type="submit">
                    Submit form
                </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;
