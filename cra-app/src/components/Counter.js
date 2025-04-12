import {Component, Componet} from 'react'

class Counter extends Component{
    constructor(){
        super();
        this.state = ({
            count : 0,
            name : "Vivek Prajpati"            
        })
    }

    handlclick(){
        this.setState({
            count : this.state.count + 1
        })
    }
    diclick(){
        if(this.state.count > 0){
        this.setState({
                count : this.state.count - 1
            })
        }
    }

    render(){
        return(
            <div>
                <h1>Vivek Prajapati</h1>
                <p>Count : {this.state.count}</p>
                <button onClick={()=>this.handlclick()}>Count++</button>
                <button onClick={()=>this.diclick()}>Count--</button>
            </div>
        )
    }
}

export default Counter;