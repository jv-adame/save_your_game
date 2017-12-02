import React from "react";

class InputForm extends React.Component{
    noRefreshEVER=(event)=>{
        event.preventDefault();     
        this.refs.textInput.value = "";
        this.refs.textInput.placeholder = "Add a To-Do";
    }
    toggleButton=(event)=>{
        let toggleDisable = (this.refs.textInput.value !== "") ? false : true;
        this.refs.submitButton.disabled = toggleDisable;
    }
    componentDidMount(){
        let toggleDisable = (this.refs.textInput.value !== "") ? false : true;
        this.refs.submitButton.disabled = toggleDisable;
    }

    render(){
        return(
            <form className="toDo" onSubmit={this.noRefreshEVER}>
                <div className="flexContain">
                    <input type="text" ref="textInput" className="inputBar"  placeholder="Add a To-Do"  onChange={this.toggleButton}/>
                    <button ref="submitButton" className="btn btn-primary" type="submit" onClick={()=> this.props.submitToDo(this.refs.textInput.value)}>Add</button>
                </div>
            </form>
        )
    }
}

export default InputForm;