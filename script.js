let tasks =  JSON.parse(localStorage.getItem("tasks")) || [];

const newTask = document.getElementById("newTask");
const closeT = document.getElementById("closeT");
const safeT = document.getElementById("safeT");
const Tdate = document.getElementById("Tdate");
const Tdesc = document.getElementById("Tdesc");
const forms = document.getElementById("forms");

newTask.addEventListener("click", function(){forms.classList.remove("hide"); renderTasks();});
closeT.addEventListener("click", function(){forms.classList.add("hide"); renderTasks();});
safeT.addEventListener("click", () =>{
    let newT = Tdesc.value;
    let newD = Tdate.value;
    let nT = {descripcion: newT, fecha: newD, complete: false};
    tasks.push(nT);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    Tdesc.value="";
    Tdate.value="";
    forms.classList.add("hide");
    renderTasks();
});

renderTasks();
function renderTasks() {
    const list = document.getElementById("list");

    list.innerHTML = `
        <span>Fecha</span>
        <span>Descripción</span>
        <span>Opciones</span>
    `;

    tasks.forEach((tasks, index) => {

        const fecha = document.createElement("span");
        fecha.textContent = tasks.fecha;

        const desc = document.createElement("span");
        desc.textContent = tasks.descripcion;

        if (tasks.complete) {
            desc.style.textDecoration = "line-through";
        }
        
        const opciones = document.createElement("span");

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Delete task";
        btnDelete.addEventListener("click", () => erazeT(index));
        const btnCheck = document.createElement("button");
        btnCheck.textContent = "Complete task";
        btnCheck.addEventListener("click", () => completeT(index));

        opciones.appendChild(btnDelete);
        opciones.appendChild(btnCheck);

        list.appendChild(fecha);
        list.appendChild(desc);
        list.appendChild(opciones);
    });
}
function erazeT(index){
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}
function completeT(index) {
    tasks[index].complete = !tasks[index].complete;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

