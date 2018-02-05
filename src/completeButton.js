import React from "react";

class CompleteButton extends React.Component{
    render(){
    
       let toggleDisable = this.props.anyCompleted;

        return(
            <button className=" pull-right btn btn-default" 
            onClick={()=> this.props.clearCompleted()}
            disabled={!toggleDisable}
            >Clear Complete</button>
        )
    }
}

export default CompleteButton;