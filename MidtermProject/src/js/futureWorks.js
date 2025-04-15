fetch('../assets/futureWork.json') 
    .then(response => response.json())
    .then(jsonData => {
        const futureWorkList = document.getElementById("futureWorkList");

        jsonData.futureWork.forEach(item => {
            Object.values(item).forEach(possibility => {
                let li = document.createElement("li");
                li.textContent = possibility;
                futureWorkList.appendChild(li);
            });
        });
    })
    .catch(error => console.error("Error loading JSON:", error));


    fetch('../assets/futureWork.json')
    .then(response => response.json())
    .then(jsonData => {
        const otherFutureWorkList = document.getElementById("otherFutureWorkList");

        jsonData.otherFutureWork.forEach(item => {
            Object.values(item).forEach(possibility => {
                let li = document.createElement("li");
                li.textContent = possibility;
                otherFutureWorkList.appendChild(li);
            });
        });
    })
    .catch(error => console.error("Error loading JSON:", error));