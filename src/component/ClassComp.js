import {Component} from "react";


class ClassComp extends Component{

    constructor (props){
        super(props)
        this.state = {
            count : 1
        }
    }

    componentDidMount(){
        console.log("Component is rendered")
    }

    componentDidUpdate(){
        console.log("Component is re-rendered")
    }

    render(){
        return (
            <>
                <div>
                    <h1>Button Clicket : {this.state.count}</h1>
                    <div>
                        <button onClick={()=>{
                            this.setState({
                                count : this.state.count + 1
                            })
                        }}>
                            Click
                        </button>
                    </div>
                </div>
            </>
        )
    }

}

export default ClassComp;