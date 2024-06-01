
$(document).ready(function() {

    // Handle form submission
    $('#myForm').on('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        // Collect form data
        var formData = {
            name: $('#name').val(),
            profile_pic: $('input[name="profile_pic"]:checked').val(), // Get value of checked radio button
            gender: $('input[name="gender"]:checked').val(),
            department: [],
            salary: $('select[name="salary"]').val(),
            date: $('#day').val() + " " + $('#month').val() + " " +$('#year').val(),
            notes: $('#notes').val(),
        };
        console.log(formData.date)

        // Get all checked departments
        $('input[name="department"]:checked').each(function() {
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
    
});