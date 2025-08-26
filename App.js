let addBtn = document.querySelector("#add");
let ol = document.querySelector("#taskList");
let inp = document.querySelector("#taskInput");
let downloadBtn = document.querySelector("#download");
let welcome = document.querySelector("#welcome");

// Ask user name when page loads
window.onload = function () {
    let userName = prompt("Please enter your name:");
    if (userName && userName.trim() !== "") {
        welcome.innerText = `Welcome, ${userName}!`;
    }
};

// Add Task
addBtn.addEventListener("click", function () {
    if (inp.value.trim() === "") return;

    let item = document.createElement("li");
    item.innerText = inp.value;

    let delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.classList.add("delete");

    item.appendChild(delBtn);
    ol.appendChild(item);
    inp.value = "";
});

// Toggle delete button on click
ol.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("show-delete");
    }
    if (event.target.classList.contains("delete")) {
        event.target.parentElement.remove();
    }
});

// Download tasks as PDF
downloadBtn.addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let tasks = document.querySelectorAll("#taskList li");
    let y = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Prince Mishra’s Todo List", 60, 10);

    doc.setFont("times", "normal");
    doc.setFontSize(14);

    tasks.forEach((task, index) => {
        let taskText = task.childNodes[0].textContent.trim();
        doc.text(`${index + 1}. ${taskText}`, 20, y);
        y += 10;
    });

    doc.save("Todo_List.pdf");
});
