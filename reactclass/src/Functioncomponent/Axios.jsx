
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid'

export default function Axios(){
let uuid=uuidv4()

const [input,setinput]=useState("")   


const handleinput=(e)=>{
    setinput(e.target.value)
}


const handleadd=async()=>{
    let add={id:uuid,task:input}
    await axios.post("http://localhost:3000/todoList",add)
   fecthdata()
   setinput("")
}




const [todolist,settodolist]= useState([])
const fecthdata = async()=>{
    let res = await axios.get("http://localhost:3000/todoList")
    settodolist(res.data)
}

useEffect(()=>{
fecthdata()
},[])


const handledel=async(did)=>{
    await axios.delete(`http://localhost:3000/todoList/${did}`)
fecthdata()
}

const handleupd=async(i)=>{

    let update =prompt("please enter task",todolist[i].task)
    let up={id:todolist[i].id,task:update}
    await axios.put(`http://localhost:3000/todoList/${todolist[i].id}`,up)
    fecthdata()
}



    return (
        <div>
            <input placeholder='enter todo' value={input} onChange={handleinput} />
            <button onClick={handleadd}>add</button>





        {todolist.map((todo,index)=>(
          <div key={index}>




          <h1>{todo.task}</h1>
          <button onClick={()=>handledel(todo.id)}>x</button>
          <button onClick={()=>handleupd(index)}>update</button>





          </div>  
        ))}
            
        </div>
    );
}
