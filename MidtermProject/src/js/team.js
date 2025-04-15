document.addEventListener("DOMContentLoaded", function () {
  fetch("../assets/team.json")
    .then((response) => response.json())
    .then((data) => {
      // Set course name and date
      document.getElementById("course").textContent = `${data.course}`;
      document.getElementById("date").textContent = `${data.date}`;

      // Get students container
      const studentsContainer = document.createElement("div");
      studentsContainer.classList.add("students-container");

      // Loop through students and create divs
      data.students.forEach((student) => {
        let studentDiv = document.createElement("div");
        studentDiv.classList.add("student-card");

        studentDiv.innerHTML = `
                <h3>${student.name}</h3>
                <h6>${student.major}</h6>
                <i class="bi team_icon ${student.icon}"></i>
                <p>Email: <a href="mailto:${student.email}">${student.email}</a></p>
            `;

        studentsContainer.appendChild(studentDiv);
      });

      // Add studentsContainer to the main content
      document.querySelector("main").appendChild(studentsContainer);
    })
    .catch((error) => console.error("Error loading JSON:", error));
});
