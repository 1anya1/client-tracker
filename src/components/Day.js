import React from 'react'

class Day extends React.Component{
    state={
        data:[],
        note:'',
        date:'',
    }
    componentDidMount(){
        fetch('http://localhost:3000/day')
        .then(response=>response.json())
        .then(data=>
       this.setState({
           data: data
       })
     )

    }
    handleChange=(event)=>{
        this.setState({ [event.target.id]: event.target.value})
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        fetch('http://localhost:3000/day',{
            body: JSON.stringify({note: this.state.note, date: this.state.date}),
            method: 'POST',
            headers:
            {
                'Accept': 'application/json, text/plakn, */*',
                'Content-Type': 'application/json'
            }
        })
        .then((createdItems)=>{
            return createdItems.json()
        }) 
        .then((jsonedItem)=>{
            this.setState({
                date:'',
                note:'',
                data: [jsonedItem, ...this.state.data]
            })
        })
        .catch((error)=>console.log(error))
    }

    deleteItem=(id, index)=>{
        fetch('http://localhost:3000/day/'+id,{
            method:'DELETE'
        })
        .then((data)=>{
            this.setState({
                data:[...this.state.data.slice(0, index), ...this.state.data.slice(index+1)]
            })
        })
    }
    render(){


        return(
            <div>
                <form onSubmit={this.handleSubmit} id={this.state.data._id}>
                    <input type='text' value={this.state.note} onChange={this.handleChange} id='note' />
                    <input type='date' value={this.state.date} onChange={this.handleChange} id='date' />
                    <input type='submit' />

                </form>
            {this.state.data.map((el,index)=>{
                return (
                    <div key={el._id}>
                    <h1>{el.note}</h1>
                    <h2>{el.date}</h2>
                    <button onClick={()=>this.deleteItem(el._id, index)}>Delete</button>
                    </div>
                )
            })}
            </div>
        )
    }
}

export default Day 