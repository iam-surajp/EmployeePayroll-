
$(document).ready(function() {

    //form submission
    $('#myForm').on('submit', function(e) {
        e.preventDefault(); 

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


        // Validate form data
        var isValid = true;
        if (!formData.name) {
            $('#nameError').text('Name is required');
            isValid = false;
        } else {
            $('#nameError').text('');
        }
        if (!formData.profile_pic) {
            $('#profilePicError').text('Profile photo is required');
            isValid = false;
        } else {
            $('#profilePicError').text('');
        }
        if (!formData.gender) {
            $('#genderError').text('Gender is required');
            isValid = false;
        } else {
            $('#genderError').text('');
        }
        if (formData.department.length === 0) {
            $('#departmentError').text('At least one department must be selected');
            isValid = false;
        } else {
            $('#departmentError').text('');
        }
        if (!formData.salary) {
            $('#salaryError').text('Salary is required');
            isValid = false;
        } else {
            $('#salaryError').text('');
        }
        if (!$('#day').val() || !$('#month').val() || !$('#year').val()) {
            $('#dateError').text('Complete start date is required');
            isValid = false;
        } else {
            $('#dateError').text('');
        }

        if (!isValid) {
            return; 
        }

        // Send data to the JSON server
        $.ajax({
            url: 'http://localhost:3000/employees', // URL of JSON server endpoint
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                console.log('Data successfully sent to the server:', response);
                window.location.href = './dashboard.html';
                alert('Employee added successfully');
            },
            error: function(error) {
                console.error('Error sending data:', error);
                alert('Error adding employee');
            }
        });
    });
    
});

$('#resetButton').on('click', function() {
    $('#myForm')[0].reset(); 
    $('.error').text(''); 
});

$('#cancelButton').on('click', function() {
    window.location.href = '/pages/dashboard.html'; 
});