import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import InputForm from "./inputForm";
import ListItems from "./listItems";
import PullDownMenu from "./pulldownMenu";
import CompleteButton from "./completeButton";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import body_parser from "body-parser";


const baseURL = "http://localhost:8080";

class App extends Component {
  constructor(){
    super();

    let emptyArray = [];

    this.state = {
      list: emptyArray,
      anyCompleted: false,
      filter: "all"
    };

    //Bindings
    this.checkClicked = this.checkClicked.bind(this);
    this.submitToDo = this.submitToDo.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.pullFilter = this.pullFilter.bind(this);
    //  this.onDragEnd = this.onDragEnd.bind(this);
  }

  //Initialize on startup - Populate Todo List
  //GET
  componentDidMount(){
    
    axios.get(baseURL)
    .then((result)=>{
        let initializeComplete = false;
        for (let i = 0; i < result.data.length; i++){
          if(result.data[i].complete === true)
            initializeComplete = true;
        }
        //this can be a problem
        this.setState({
          list: result.data,
          anyCompleted: initializeComplete
        });
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  reinitialize(){
    axios.get(baseURL)
    .then((result)=>{
      //Toggles availability of "Clear Complete" Button
      let copy = Array.from(result.data);
      let newCompleted = false;
      for (let i = 0; i < copy.length; i++){
        if (copy[i].complete === true){
          newCompleted = true;
        }
      }

      //Refresh display of Todos
      this.setState({
        anyCompleted: newCompleted,
        list: result.data
      });
    })
  }

  //Updates the Checked status of the todos
  //PUT {WIP}
  checkClicked(id){
    let copy = Array.from(this.state.list);
    
    let s = copy.find( function(todo){
      
      return todo._id === id;
    })

    let toggleChecked = (s.complete) ? false : true;

    let pass = {
      _id: s._id,
      complete: toggleChecked
    }

    axios.put(baseURL, pass)
    .then((result)=>{
      this.reinitialize();
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  /*Takes user input and passes it as a new object and pushes it into the existing array */
  //DONE
  submitToDo(submitted){
    
    axios.post(baseURL, {
      complete: false,
      text: submitted,
    })
     .then((result)=>{
      this.reinitialize();
    })
    .catch((error)=>{
      console.log(error);
    });

    
  }

  //Alter list items displayed based on pulldown menu value selected
  toggleDisplay(index){


    let copy = Array.from(this.state.list);
    let toggleDisplayed;
    let word = this.state.filter;

      switch (word){
        case "all":
            return "block";
            break;
        case "active":
              toggleDisplayed = (copy[index].complete) ? "none" : "block";
              return toggleDisplayed;
              break;
        case "complete":
              toggleDisplayed = (copy[index].complete) ? "block" : "none";
              return toggleDisplayed;
            break;
         default:
         }

         this.setState({
          list: copy
        });

  }

  toggleMenu(string){

    this.setState({
      filter: string
    });
  }

  pullFilter(){
    let thisFilter = this.state.filter;
    return thisFilter;
  }

  /*DELETE*/
  clearCompleted(){
    let copy = Array.from(this.state.list);
    //take out any To Do's designated as complete
    for (let i = 0;  i < copy.length; i++)
    {
      if(copy[i].complete){

        axios.delete(baseURL, {
          data: {
            id: copy[i]._id
          }
        })
        .then((result)=>{
          this.reinitialize();
        })
        .catch((error)=>{
          console.log(error);
        });
      }    
    }

  this.setState({
    anyCompleted: false
  });
  
  } //clearCompleted End

  render() {

    return (
      <div className="wrapper">
          <div className="App">
    
            <InputForm submitToDo={this.submitToDo} />
            
            <ListItems list={this.state.list} checkClicked={this.checkClicked} value={this.value} pullFilter={this.pullFilter} onDragEnd={this.onDragEnd}
            toggleDisplay={this.toggleDisplay}/>

            <div>
              <PullDownMenu toggleMenu={this.toggleMenu} value={this.value}/>
              <CompleteButton clearCompleted={this.clearCompleted} anyCompleted={this.state.anyCompleted}/>
            </div>
          </div>
        </div>
    );
  }
}

export default App;