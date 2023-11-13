document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector('#userTable tbody');
    const registrationForm = document.getElementById('registrationForm');

    // Load existing data from storage on page load
    const storedData = JSON.parse(localStorage.getItem('userData')) || [];
    storedData.forEach(data => addTableRow(data));

    // Function to add a row to the table and update storage
    function addTableRow(data) {
        const row = document.createElement('tr');
        Object.values(data).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        tableBody.appendChild(row);

        // Update storage with the new data
        storedData.push(data);
        localStorage.setItem('userData', JSON.stringify(storedData));
    }

    // Event listener for form submission
    registrationForm.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Example: Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const acceptTerms = document.getElementById('acceptTerms').checked;

        // Validate email address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Invalid email address. Please enter a valid email.');
            return;
        }

        // Validate age between 18 and 55
        const dobDate = new Date(dob);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - dobDate.getFullYear();

        if (age < 18 || age > 55) {
            alert('Age must be between 18 and 55 years old.');
            return;
        }

        // Add the form data to the table and update storage
        addTableRow({
            name: name,
            email: email,
            password: password,
            dob: dob,
            acceptTerms: acceptTerms ? 'Yes' : 'No'
        });

        // Optionally, you can clear the form fields after submission
        registrationForm.reset();
    });
});
