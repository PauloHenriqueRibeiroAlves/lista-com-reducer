"use client"

import { useReducer, useState } from "react";
import { Item } from "./types/Item";
import { listReducer } from "./Reducers/listReducer";

const Page = () => {
  const [list, dispatch] = useReducer(listReducer, []);
  const [addFielter, setAddFielter] = useState('');
  const hundleAddButton = () => {
    if(addFielter.trim() === '' ) return false;
    dispatch({
      type: 'add',
      payload: {
        text: addFielter.trim()
      }
  
    });

    setAddFielter('');
  }
  const handleDoneCheckbox = (id: number) => {
    dispatch({
      type: 'toggleDone',
      payload: { id }
    });
  }
  const handleEdit = (id: number) => {
    const item = list.find(it => it.id === id)
    if(!item) return false; 
    
    const newText = window.prompt('Editar Tarefa', item.text);

    if(!newText || newText.trim() === '') return false;
    dispatch({
      type: 'editText',
      payload: { id, newText }
    })
  }
  const handleRemove = (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir a tarefa')) return false;
    dispatch({
      type: 'remove',
      payload: { id }
    })
  }

  return (
    <div className="container mx-auto">
    <h1 className="text-center text-4xl my-4">Lista de tarefas</h1>
    <div className="max-w-2xl mx-auto flex rounded-md bg-gray-900 border border-gray-400 p-4 my-4">
      <input 
      type="text" 
      className="flex-1 rounded-md border border-white p-3 bg-trasparent text-black outline-none" 
      placeholder="Digite algum item"
      value={addFielter}
      onChange={e => setAddFielter(e.target.value)}
      />
      <button onClick={hundleAddButton} className="p-4 text-white">Adicionar</button>
    </div>
    <ul className="max-w-2xl mx-auto">
      {list.map(item =>(
        <li key={item.id} className="flex p-3 my-3 items-center border-b border-gray-700">
          <input type="checkbox" className="w-6 h-6 mr-4"
          checked={item.done}
          onClick={() => handleDoneCheckbox(item.id)}/>

          <p className="flex-1 text-lg">{item.text}</p>

          <button onClick={() => handleEdit(item.id)} className="mx-4 text-black hover:text-gray-500">Editar</button>
          <button onClick={() => handleRemove(item.id)} className="mx-4 text-black hover:text-gray-500">Excluir</button>
        </li>
      ))}
    </ul>
    </div>
  )
}
export default Page;