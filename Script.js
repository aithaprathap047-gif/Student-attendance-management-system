let students = JSON.parse(localStorage.getItem("students")) || [];

function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

function addStudent() {
    const name = document.getElementById("studentName").value.trim();
    const roll = document.getElementById("rollNumber").value.trim();

    if (name === "" || roll === "") {
        alert("Please enter student name and roll number!");
        return;
    }

    if (students.some(student => student.roll === roll)) {
        alert("Roll number already exists!");
        return;
    }

    students.push({
        name: name,
        roll: roll,
        attendance: ""
    });

    saveStudents();

    document.getElementById("studentName").value = "";
    document.getElementById("rollNumber").value = "";

    displayStudents();
    updateReport();
}

function displayStudents() {
    const list = document.getElementById("studentList");
    list.innerHTML = "";

    students.forEach(function(student, index) {
        const item = document.createElement("div");
        item.className = "dashboard";

        const name = document.createElement("p");
        name.textContent = student.name + " - " + student.roll;
        item.appendChild(name);

        const status = document.createElement("p");
        status.textContent = student.attendance
            ? "Attendance: " + student.attendance
            : "Not marked";
        item.appendChild(status);

        const present = document.createElement("button");
        present.textContent = "Present";
        present.onclick = function() {
            markAttendance(index, "Present");
        };
        item.appendChild(present);

        const absent = document.createElement("button");
        absent.textContent = "Absent";
        absent.onclick = function() {
            markAttendance(index, "Absent");
        };
        item.appendChild(absent);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function() {
            students.splice(index, 1);
            saveStudents();
            displayStudents();
            updateReport();
        };
        item.appendChild(deleteBtn);

        list.appendChild(item);
    });
}

function markAttendance(index, status) {
    students[index].attendance = status;
    saveStudents();
    displayStudents();
    updateReport();
}

function updateReport() {
    const total = students.length;

    const present = students.filter(
        student => student.attendance === "Present"
    ).length;

    const absent = students.filter(
        student => student.attendance === "Absent"
    ).length;

    const percentage = total === 0
        ? 0
        : Math.round((present / total) * 100);

    document.getElementById("totalStudents").textContent = total;
    document.getElementById("presentCount").textContent = present;
    document.getElementById("absentCount").textContent = absent;
    document.getElementById("percentage").textContent = percentage + "%";
}

displayStudents();
updateReport();
