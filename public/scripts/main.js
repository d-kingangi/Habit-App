document.addEventListener('DOMContentLoaded', function () {
    const habitForm = document.getElementById('habitForm');
    const habitsList = document.getElementById('habitsList');

    // Event listener for form submission
    habitForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get habit details from the form
        const habitName = document.getElementById('habitName').value;
        const stoppedDate = document.getElementById('stoppedDate').value;

        // Create a new habit object
        const newHabit = {
            name: habitName,
            stoppedDate: stoppedDate
        };

        // Send a POST request to add the habit
        fetch('http://localhost:4000/habits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newHabit)
        })
        .then(response => response.json())
        .then(data => {
            // Update the UI with the new habit
            displayHabit(data);
        })
        .catch(error => console.error('Error adding habit:', error));

        // Clear the form
        habitForm.reset();
    });

    // Fetch and display all habits on page load
    fetch('http://localhost:4000/habits')
        .then(response => response.json())
        .then(habits => {
            habits.forEach(habit => {
                displayHabit(habit);
            });
        })
        .catch(error => console.error('Error fetching habits:', error));

    // Function to display a habit
    function displayHabit(habit) {
        const habitElement = document.createElement('div');
        habitElement.classList.add('habit');

        // Calculate the days since stopped
        const stoppedDate = new Date(habit.stoppedDate);
        const currentDate = new Date();
        const daysPassed = Math.floor((currentDate - stoppedDate) / (1000 * 60 * 60 * 24));

        // Create HTML content
        habitElement.innerHTML = `
            <p><strong>Name:</strong> ${habit.name}</p>
            <p><strong>Stopped Date:</strong> ${habit.stoppedDate}</p>
            <p><strong>Days Since Stopped:</strong> ${daysPassed} days</p>
        `;
        habitsList.appendChild(habitElement);
    }

    // Function to update a habit dynamically
    function updateHabit(habitId, updatedData) {
        const habitElement = document.querySelector(`.habit[data-id="${habitId}"]`);

        if (habitElement) {
            // Calculate days since the updated stopped date
            const updatedStoppedDate = new Date(updatedData.stoppedDate);
            const currentDate = new Date();
            const daysPassed = Math.floor((currentDate - updatedStoppedDate) / (1000 * 60 * 60 * 24));

            // Update HTML content
            habitElement.innerHTML = `
                <p><strong>Name:</strong> ${updatedData.name}</p>
                <p><strong>Stopped Date:</strong> ${updatedData.stoppedDate}</p>
                <p><strong>Days Since Stopped:</strong> ${daysPassed} days</p>
            `;
        }
    }
});
