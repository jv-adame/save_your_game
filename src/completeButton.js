import React from "react";

class CompleteButton extends React.Component{
    render(){
    
       let toggleDisable = this.props.anyCompleted;
     //  let toggleDisable = this.props.setAnyCompleted();
  //      let toggleDisable = this.state.anyCompleted;
        return(
            <button className=" pull-right btn btn-default" 
            onClick={()=> this.props.clearCompleted()}
        //    onClick={()=> {this.props.clearCompleted(); this.props.setAnyCompleted()}}
            disabled={!toggleDisable}
     //  disabled={()=> this.props.setAnyCompleted()}
            >Clear Complete</button>
        )
    }
}

export default CompleteButton;