import './App.css';
import {useState} from "react";
import axios from "axios";
import Task from "./Task";


function App() {
    const [list, setList] = useState([])
    const [newTask, setNewTask] = useState('')


    const getList = () => {
        axios.get('https://nazarov-kanban-server.herokuapp.com/card')
            .then(res => {
                console.log(res)
                setList(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    const createCard = async () => {
      await  axios.post('https://nazarov-kanban-server.herokuapp.com/card', {
            name: newTask,
            description: 'I love draw'
        })
            .then(res => console.log(res))
            .catch(error => console.log(error))
        getList()
        setNewTask('')
    }
    const deleteCard =  async (id) => {
      await axios.delete(`https://nazarov-kanban-server.herokuapp.com/card/${id}`)
          .then(res => console.log(res))
          .catch(error => console.log(error))
        getList()
    }


    return (
        <div className="App">
            <button onClick={getList}>getTask</button>
            <input type="text" value={newTask} onChange={event => setNewTask(event.target.value)}/>
            <button onClick={createCard}>create new card</button>
            {list.map(task =>
                <div>
                    <Task task={task} deleteCard={deleteCard}/>
                </div>
            )}

        </div>
    );
}

export default App;
