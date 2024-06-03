$(document).ready(function() {
    // Fetch and populate employee data on page load
    fetchEmployeeData();

    // Function to fetch data from the server and populate the table
    function fetchEmployeeData() {
        $.ajax({
            url: 'http://localhost:3000/employees', // URL of your JSON server endpoint
            type: 'GET',
            success: function(response) {
                console.log('Data successfully fetched from the server:', response);
                populateEmployeeTable(response);
            },
            error: function(error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    // Function to populate the table with employee data
    function populateEmployeeTable(data) {
        const tableBody = $('#employeeTableBody');
        tableBody.empty(); // Clear existing rows

        data.forEach(employee => {
            const row = `
                <tr>
                    <td class="prof-img" style="width: 7%;"><img src="${employee.profile_pic}" alt="Profile" style="border-radius: 40%;"></td>
                    <td>${employee.name}</td>
                    <td>${employee.gender}</td>
                    <td>${employee.department.map(dept => `<span class="tag">${dept}</span>`).join(' ')}</td>
                    <td>₹ ${employee.salary}</td>
                    <td>${employee.date}</td>
                    <td>
                        <span><a href="" class="delete-row" data-id="${employee.id}"><img src="/assets/delet.png" alt=""></a></span>
                        <span><a href="/pages/edit_form.html?id=${employee.id}" class="edit-row"><img src="/assets/edit.png" alt=""></a></span>
                    </td>
                </tr>
            `;
            tableBody.append(row);
        });

        // Add event listeners for delete buttons
        $('.delete-row').on('click', function(e) {
            e.preventDefault();
            const id = $(this).data('id');
            deleteEmployee(id);
        });

        // // Add event listener for edit buttons
        // $('.edit-row').on('click', function(e) {
        //     e.preventDefault();
        //     const id = $(this).data('id');
        //     window.location.href = `/pages/edit_form.html?id=${id}`; // Redirect to edit_form.html with the employee ID as query parameter
        // });
    }

    $(document).on('click', '.search', function () {
        var searchText = $('#searchInput').val().toLowerCase();
        $.ajax({
            url: 'http://localhost:3000/employees',
            type: 'GET',
            success: function (data) {
                var filteredEmployees = data.filter(user => 
                    user.name.toLowerCase().includes(searchText) ||
                    user.gender.toLowerCase().includes(searchText) ||
                    user.date.toLowerCase().includes(searchText) ||
                    user.salary.toLowerCase().includes(searchText) ||
                    user.department.some(dept => dept.toLowerCase().includes(searchText))
                );
                populateEmployeeTable(filteredEmployees);
            }
        });
    });

    // Function to delete an employee
    function deleteEmployee(id) {
        $.ajax({
            url: `http://localhost:3000/employees/${id}`,
            type: 'DELETE',
            success: function(response) {
                console.log('Employee successfully deleted:', response);
                // fetchEmployeeData(); // Refresh the table
            },
            error: function(error) {
                console.error('Error deleting employee:', error);
            }
        });
    }
});

$('.add-user').on('click', function() {
    window.location.href = '/pages/payrollForm.html'; 
});