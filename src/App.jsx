import { useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const handleEdit = ()=>{

  }

    const handleDelete = (e,id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    settodos(newTodos)
  }

  const handleChange = (e)=>{
    settodo(e.target.value)
  } 

  const handleAdd = ()=>{
    settodos([...todos, {id: uuidv4(),todo, isCompleted: false}])
    settodo("")
  }

  const handleCheckBox = (e) => {
    let id = e.target.name;
  
    let index = todos.findIndex(item=>{
      return item.id === id
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
  }
  

  return (
    <>
      <Navbar/>
      <div className="container mx-auto my-5 rounded-xl bg-[#edeae1] p-5 min-h-[70vh]">
        <div className="addTodo my-5">
          <h2 className='text-lg font-bold'>Add a todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-1/2'/>
        <button onClick={handleAdd} className='bg-[#cd2028] md:hover:bg-[#eb404e] active:bg-green-700 p-3 py-1 rounded-lg text-white transition-all duration-200 mx-6 text-sm font-bold'>Add</button>
        </div>
        
          <h1 className='text-xl font-bold'>Your Todos</h1>

          <div className="todos">
            {todos.length == 0 && <div className='m-5'>No task to display</div>}
            {todos.map(item=>{
              return (
               <div key={item.id} className="todo flex w-1/2 justify-between my-3">
                <div className='flex gap-5 items-center'>
                <input onChange={handleCheckBox} type="checkbox" value={todo.isCompleted} name={item.id} id="" />
              <div className={item.isCompleted?"line-through":""}>    
                {item.todo}
                </div>
              </div>
              <div className="buttons">
                <button onClick={handleEdit} className='bg-[#cd2028] md:hover:bg-[#eb404e] active:bg-green-700 p-3 py-1 rounded-lg text-white transition-all duration-200 mx-2 text-sm font-bold'>Edit</button>
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
