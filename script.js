let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask(){

    let subject=document.getElementById("subject").value;
    let task=document.getElementById("task").value;
    let date=document.getElementById("date").value;
    let priority=document.getElementById("priority").value;

    if(task==""){
        alert("Enter task");
        return;
    }

    tasks.push({
        subject,
        task,
        date,
        priority,
        completed:false
    });

    saveTasks();

    document.getElementById("subject").value="";
    document.getElementById("task").value="";
    document.getElementById("date").value="";

    displayTasks();
}

function displayTasks(){

    let list=document.getElementById("taskList");
    list.innerHTML="";

    let search=document.getElementById("search").value.toLowerCase();
    let filter=document.getElementById("filter").value;

    let completedCount=0;

    tasks.forEach((item,index)=>{

        if(item.completed)
            completedCount++;

        if(search!="" &&
        !item.task.toLowerCase().includes(search) &&
        !item.subject.toLowerCase().includes(search))
            return;

        if(filter=="completed" && !item.completed)
            return;

        if(filter=="pending" && item.completed)
            return;

        let li=document.createElement("li");

        li.innerHTML=`
        <b>${item.subject}</b><br>
        ${item.completed ? "<s>"+item.task+"</s>" : item.task}<br>
        Due: ${item.date}<br>
        Priority: ${item.priority}<br><br>

        <button onclick="toggleTask(${index})">
        ${item.completed?"Undo":"Complete"}
        </button>

        <button onclick="deleteTask(${index})">
        Delete
        </button>

        <hr>
        `;

        list.appendChild(li);

    });

    document.getElementById("progress").innerHTML=
    `Completed: ${completedCount}/${tasks.length}`;
}

function toggleTask(index){
    tasks[index].completed=!tasks[index].completed;
    saveTasks();
    displayTasks();
}

function deleteTask(index){
    tasks.splice(index,1);
    saveTasks();
    displayTasks();
}

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}