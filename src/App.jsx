import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";



function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  
  
  const saveToLs = (newtodos) => {
    localStorage.setItem("todos",JSON.stringify(newtodos))
  }
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  
  const handleEdit = (e, id)=>{
    let t = todos.filter(i=>i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    settodos(newTodos) 
    saveToLs(newTodos)
  }

  const handleDelete = (e,id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    settodos(newTodos)
    saveToLs(newTodos)
  }

  const handleChange = (e)=>{
    settodo(e.target.value)
  } 

  const handleAdd = ()=>{
    let newtodos = [...todos, {id: uuidv4(),todo, isCompleted: false}]
    settodos(newtodos)
    settodo("")
    saveToLs(newtodos)
    
  }

  const handleCheckBox = (e) => {
    let id = e.target.name;
  
    let index = todos.findIndex(item=>{
      return item.id === id
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    saveToLs(newTodos)
  }
  

  return (
    <>
      <Navbar/>
      <div className="md:container mx-auto my-5 rounded-xl bg-[#edeae1] p-5 min-h-[80vh] w-[90vw] lg:w-1/2">
      <h1 className='font-bold text-center text-3xl'>Task Nest</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add a todo</h2>

          <div className="flex">

          <input onChange={handleChange} value={todo} type="text" className='w-full bg-white py-1 px-5 rounded-full'/>
        <button onClick={handleAdd} disabled={todo.length<=3} className='w-1/2 bg-[#cd2028] md:hover:bg-[#eb404e] active:bg-green-700 p-3 py-1 rounded-lg text-white transition-all duration-200 mx-6 text-sm font-bold disabled:bg-gray-500 disabled:hover:bg-gray-600'>Save</button>
          </div>
        </div>
        
          <input onChange={toggleFinished} type="checkbox" checked={showFinished} id="show" className='my-4' />
          <label className='mx-2' htmlFor="show">Show Finished</label>

          <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>

          <h1 className='text-2xl font-bold'>Your Todos</h1>

          <div className="todos">
            {todos.length === 0 && <div className='m-5'>No task to display</div>}
            {todos.map(item=>{
              return (
               (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex flex-col sm:flex-row justify-between items-start sm:items-center my-3 w-full bg-white rounded-lg p-3 shadow-sm break-words"}>
                <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={`text-wrap break-words w-1/2 ${item.isCompleted ? "line-through" : ""}`}>    
                {item.todo}
                </div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-[#cd2028] md:hover:bg-[#eb404e] active:bg-green-700 p-3 py-1 rounded-lg text-white transition-all duration-200 mx-2 text-sm font-bold my-2 md:my-0'><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-[#cd2028] md:hover:bg-[#eb404e] active:bg-green-700 p-3 py-1 rounded-lg text-white transition-all duration-200 mx-2 text-sm font-bold my-2 md:my-0'><AiFillDelete /></button>
              </div>
          </div>
              )
            })}
           
      </div>
      </div>
    </>
  )
}

export default App
