import React from 'react';
import {View, Button, Text, TextInput, Stylesheet} from 'react-native'
import {Constants} from 'expo'
import Header from 'header'


const style = Stylesheet.create ({
    TodoContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    }
})
return (
    <View style={style.container}>
        <Header />
    </View>
)

const taskList = props => (
    <View style={Stylesheet.todoContainer}>
        <Button onPress={props.onDelete} title="delete"/>
        <Text>{props.todo.text}</Text>

    </View>
)

let taskList = []
class Task {
    constructor(name, dueDate, isDone) {
        this.taskId = Date.now();
        this.name = name;
        this.dueDate = dueDate;
        this.isDone = isDone;

    }
    toString() {
        let htmlText = '<li class="task" ><div>'
        if(!this.isDone){
            htmlText += this.name
            htmlText += `<p hidden >${this.taskId} </p>`

            htmlText += ", " + this.dueDate.toDateString() ; 
            htmlText += `<input type="checkbox" onclick = "completeTask(${this.taskId})"  name="isDone" id="isDone">`
            htmlText += '<button onclick="deleteTask(';
            htmlText += this.taskId;
            htmlText += ')">Delete</button>';
        }
        else{
            htmlText += this.name.strike()
        }
        htmlText += '</div></li>';
        return htmlText;
    }




}

function completeTask(taskId){
    taskList.forEach( (task)=> {
        if(task.taskId == taskId){
            task.isDone = true;
        }
    });
    render()
}



function render() {
    <view style={{paddingTop: 50}}></view>
    const listUI = document.getElementById("todolist")
    listUI.innerHTML = "";  
    if (taskList.length === 0) listUI.innerHTML = "No tasks todo :-)"
    taskList.forEach((task) => {
            listUI.innerHTML += task.toString();
    })
}

function deleteTask(taskId) {
    taskList = taskList.filter(
        (t) => {
            if(t.taskId != taskId) 
            return t;
        }
    );
    delDB(taskId)
    render()
}

function createTask() {
    const taskName = document.getElementById("taskName").value;
    const dueDate = document.querySelector("#taskDueDate").value
    if(dueDate.length == 0){
        alert('enter date')
        return false;   
    }
    addTask(new Task(taskName, new Date(dueDate), false));
}

function addTask(t) {
    taskList.push(t)
    addtoDB(t)
    render();
    const changeHandler = (val) => {
        setText(val);
    }
    return (
        <view>
            <TextInput style={style.input} palceholder='new todo..' onChangeText={changeHandler}></TextInput>
            <Button onpress={()=> console.log(text)} text='add todo' color='coral'/>
        </view>
    )
}
const style = StyleSheet.create({
    input: {
        marginBotton: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottonWidth: 1,
        borderBottonColor: 'white',

    }
})



function delDB(taskId){
    let request = new  XMLHttpRequest();
    let data = new FormData();
    data.append("id",taskId)
    request.open('POST','http://127.0.0.1:5000/delete');
    request.send(data)
}

function addtoDB(t){
    let request = new  XMLHttpRequest();
    let data = new FormData();
    data.append("id",t.taskId)
    data.append("name",t.name)
    data.append("dueDate",t.dueDate.toString())
    data.append("isDone",t.isDone)
    request.open('POST','http://127.0.0.1:5000/add');
    request.send(data)
  
}

function init() {
    console.log("init called");
    let request = new  XMLHttpRequest();
    request.open('POST','http://127.0.0.1:5000/list');
    request.onload = ()=>{
        json = JSON.parse(request.responseText);
        json.forEach((t)=>{
            let task = new Task(t.name, new Date(t.dueDate), 'true' == t.isDone);
            task.taskId = parseInt(t.id)
            taskList.push(task)
            render()
              
        });
        }
    request.send()
  

}

init();