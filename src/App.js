import './App.css';
import Header from "./MyComponents/Header";
import {Todos} from "./MyComponents/Todos";
import {Footer} from "./MyComponents/Footer";
import React, {useState,} from 'react';
import { AddTodo } from "./MyComponents/AddTodo";
import { About } from "./MyComponents/About";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  let initTodo;
  if(localStorage.getItem("todos")==null){
    initTodo = [];
  } 
  else{
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo)=>{
    console.log("Iam on delete of todo", todo);
    

    setTodos(todos.filter((e)=>{
      return e!==todo;
    }));
    localStorage.getItem("todos");
  }

  const addTodo = (title, desc)=>{
    console.log("I am adding this todo", title, desc)
    let sno;
    if(todos.length==0){
      sno = 0;
    }
    else{
      sno = todos[todos.length-1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc
    }
    setTodos([...todos, myTodo])
    console.log(myTodo)

    if(localStorage.getItem("todos")){
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }

  const [todos, setTodos] = useState([initTodo]);

  return (
    <>
    <Router>
      <Header title ="My ToDos List" searchBar = {true}/>
      <Switch>
          <Route exact path="/" render={()=>{
          return(
          <>
          <AddTodo addTodo={addTodo}/>
          <Todos todos={todos} onDelete={onDelete} />
          </>)
          }}>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      

      <Footer/>
      </Router>
    </>
  );
}

export default App;
