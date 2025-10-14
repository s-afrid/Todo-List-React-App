import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';



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
  
  const saveToLs = (params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
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
    saveToLs()
  }

  const handleDelete = (e,id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    settodos(newTodos)
    saveToLs()
  }

  const handleChange = (e)=>{
    settodo(e.target.value)
  } 

  const handleAdd = ()=>{

    settodos([...todos, {id: uuidv4(),todo, isCompleted: false}])
    settodo("")
    saveToLs()
    
  }

  const handleCheckBox = (e) => {
    let id = e.target.name;
  
    let index = todos.findIndex(item=>{
      return item.id === id
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    saveToLs()
  }
  

  return (
    <>
      <Navbar/>
      <div className="container mx-auto my-5 rounded-xl bg-[#edeae1] p-5 min-h-[70vh] w-1/2">
      <h1 className='font-bold text-center text-xl'>Task Nest - Manage all your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-3 items-center">
          <h2 className='text-lg font-bold'>Add a todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full bg-white'/>
        <button onClick={handleAdd} disabled={todo.length<=3} className='w-1/2 bg-[#cd2028] md:hover:bg-[#eb404e] active:bg-green-700 p-3 py-1 rounded-lg text-white transition-all duration-200 mx-6 text-sm font-bold disabled:bg-gray-500 disabled:hover:bg-gray-600'>Save</button>
        </div>
        
          <input onChange={toggleFinished} type="checkbox" checked={showFinished} id="show" className='my-4' />
          <label className='mx-2' htmlFor="show">Show Finished</label> 

          <h1 className='text-xl font-bold'>Your Todos</h1>

          <div className="todos">
            {todos.length === 0 && <div className='m-5'>No task to display</div>}
            {todos.map(item=>{
              return (
               (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex w-1/2 justify-between my-3"}>
                <div className='flex gap-5 items-center'>
                <input name={item.id} onChange={handleCheckBox} type="checkbox" checked={todo.isCompleted} id="" />
              <div className={item.isCompleted?"line-through":""}>    
                {item.todo}
                </div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-[#cd2028] md:hover:bg-[#eb404e] active:bg-green-700 p-3 py-1 rounded-lg text-white transition-all duration-200 mx-2 text-sm font-bold'>Edit</button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-[#cd2028] md:hover:bg-[#eb404e] active:bg-green-700 p-3 py-1 rounded-lg text-white transition-all duration-200 mx-2 text-sm font-bold'>Delete</button>
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
