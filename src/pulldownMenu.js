import React from "react"

class PullDownMenu extends React.Component{
    render(){

        return(
            <select className="pullDown" ref="pullDownMenu" onChange={()=>this.props.toggleMenu(this.refs.pullDownMenu.value)}>
                <option value="all">all</option>
                <option value="active">active</option>
                <option value="complete">complete</option>
            </select>
        )
    }
}

export default PullDownMenu;