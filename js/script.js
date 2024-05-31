$(document).ready(function() {
    // Fetch and populate employee data on page load
    fetchEmployeeData();

    // Handle form submission for adding a new employee
    $('#myForm').on('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        // Collect form data
        var formData = {
            name: $('#name').val(),
            profile_pic: $('input[name="profile_pic"]:checked').val(), // Get value of checked radio button
            gender: $('input[name="gender"]:checked').val(),
            department: [],
            salary: $('select[name="salary"]').val(),
            startdate: {
                day: $('select[name="startdate"]').eq(0).val(),
                month: $('select[name="startdate"]').eq(1).val(),
                year: $('select[name="startdate"]').eq(2).val(),
            },
            note: $('textarea[name="note"]').val(),
        };

        // Get all checked departments
        $('input[name="dept"]:checked').each(function() {
            formData.department.push($(this).val());
        });

        // Send data to the JSON server
        $.ajax({
            url: 'http://localhost:3000/employees', // URL of JSON server endpoint
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                console.log('Data successfully sent to the server:', response);
                alert('Employee added successfully');
                fetchEmployeeData(); // Refresh the employee table
                $('#myForm')[0].reset(); // Reset the form
            },
            error: function(error) {
                console.error('Error sending data:', error);
                alert('Error adding employee');
            }
        });
    });

    // Handle reset button click
    $('#resetButton').on('click', function(e) {
        e.preventDefault(); // Prevent default form submission
        $('#myForm')[0].reset(); // Reset the form
    });

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
                    <td>${employee.startdate.day} ${employee.startdate.month} ${employee.startdate.year}</td>
                    <td>
                        <span><a href="" class="delete-row" data-id="${employee.id}"><img src="/assets/delet.png" alt=""></a></span>
                        <span><a href="/pages/payrollForm.html?id=${employee.id}" class="edit-row" data-id="${employee.id}"><img src="/assets/edit.png" alt=""></a></span>
                    </td>
                </tr>
            `;
            tableBody.append(row);
        });

        // Add event listeners for delete and edit buttons
        $('.delete-row').on('click', function(e) {
            e.preventDefault();
            const id = $(this).data('id');
            deleteEmployee(id);
        });

        $('.edit-row').on('click', function(e) {
            e.preventDefault();
            const id = $(this).data('id');
            fetchEmployeeDetails(id);
        });
    }

    // Function to delete an employee
    function deleteEmployee(id) {
        $.ajax({
            url: `http://localhost:3000/employees/${id}`,
            type: 'DELETE',
            success: function(response) {
                console.log('Employee successfully deleted:', response);
                fetchEmployeeData(); // Refresh the table
            },
            error: function(error) {
                console.error('Error deleting employee:', error);
            }
        });
    }

    // Function to fetch and populate the form with employee details for editing
    function fetchEmployeeDetails(id) {
        $.ajax({
            url: `http://localhost:3000/employees/${id}`,
            type: 'GET',
            success: function(employee) {
                console.log('Employee details fetched for editing:', employee);
                $('#name').val(employee.name);
                $(`input[name="profile_pic"][value="${employee.profile_pic}"]`).prop('checked', true);
                $(`input[name="gender"][value="${employee.gender}"]`).prop('checked', true);
                $('input[name="dept"]').each(function() {
                    $(this).prop('checked', employee.department.includes($(this).val()));
                });
                $('select[name="salary"]').val(employee.salary);
                $('select[name="startdate"]').eq(0).val(employee.startdate.day);
                $('select[name="startdate"]').eq(1).val(employee.startdate.month);
                $('select[name="startdate"]').eq(2).val(employee.startdate.year);
                $('textarea[name="note"]').val(employee.note);
                $('#editForm').data('id', employee.id); // Set the employee ID on the form
                $('#editForm').show(); // Show the edit form
                $('#myForm').hide(); // Hide the add form
            },
            error: function(error) {
                console.error('Error fetching employee details:', error);
            }
        });
    }

    // Handle edit form submission
    $('#editForm').on('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        var id = $(this).data('id');

        // Collect form data
        var formData = {
            name: $('#name').val(),
            profile_pic: $('input[name="profile_pic"]:checked').val(), // Get value of checked radio button
            gender: $('input[name="gender"]:checked').val(),
            department: [],
            salary: $('select[name="salary"]').val(),
            startdate: {
                day: $('select[name="startdate"]').eq(0).val(),
                month: $('select[name="startdate"]').eq(1).val(),
                year: $('select[name="startdate"]').eq(2).val(),
            },
            note: $('textarea[name="note"]').val(),
        };

        // Get all checked departments
        $('input[name="dept"]:checked').each(function() {
            formData.department.push($(this).val());
        });

        // Send data to the JSON server for updating the employee
        $.ajax({
            url: `http://localhost:3000/employees/${id}`, // URL of JSON server endpoint for updating
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                console.log('Data successfully updated:', response);
                alert('Employee updated successfully');
                fetchEmployeeData(); // Refresh the employee table
                $('#editForm')[0].reset(); // Reset the edit form
                $('#editForm').hide(); // Hide the edit form
                $('#myForm').show(); // Show the add form
            },
            error: function(error) {
                console.error('Error updating data:', error);
                alert('Error updating employee');
            }
        });
    });

    // Initially hide the edit form
    $('#editForm').hide();
});

