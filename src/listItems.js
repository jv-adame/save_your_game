import React from "react";
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class ListItems extends React.Component{

    render(){

        //Initialize Active and Completed To-Do counters
        let trueCount = 0;
        let falseCount = 0;
      
        let listJSX = this.props.list.map((givenList, index) =>{

            //Change the class to done when nor not done when checkbox is toggled
            let classAssign = (givenList.complete) ? "done" : "";
       
            //If an array unit is complete or incomplete they will add to their respective counts
            let counterAssign = (givenList.complete) ? trueCount++ : falseCount++;

            let toggleDisplayed;
            //Grab the filter state as determined by pulldownMenu.js
            let filter = this.props.pullFilter();

                  switch (filter){
                    case "all":
                          toggleDisplayed = "block";
                          break;
                    case "active":
                          toggleDisplayed = (givenList.complete) ? "none" : "block";
                          break;
                    case "complete":
                          toggleDisplayed = (givenList.complete) ? "block" : "none";
                        break;
                     default:
                       /* lol */ 
                     }
            return(
                <li className="list-group-item" style={{display:toggleDisplayed}} >
                    <input type="checkbox" checked={givenList.complete} onClick={()=> this.props.checkClicked(givenList._id)}/>
                    <label className={classAssign}>{givenList.text}</label>
                </li>
            )
        });

        //Because grammar is important
        let truePlural = (trueCount !== 1) ? "'s" : "";
        let falsePlural = (falseCount !== 1) ? "'s" : "";

        return(
            <div className="list-container">
                <div className="flexContain todoContain">
                    <div>
                        <p>You have {falseCount} To Do{falsePlural} active</p>
                    </div>
                    <div>
                        <p>You have {trueCount} To Do{truePlural} completed</p>
                    </div>
                </div>
                <ul className="list-group">
                    {listJSX}
                </ul>                
            </div>
        )

    }
}

export default ListItems;