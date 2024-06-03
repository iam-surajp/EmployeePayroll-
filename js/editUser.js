$(document).ready(function() {

    var urlParams = new URLSearchParams(window.location.search);
    var userId = urlParams.get('id');
    console.log(userId);

    if (userId) {
        fetchUser(userId);
        console.log(userId);
    }

    // Handle form submission
    $('#myForm').on('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        // Collect form data
        var formData = {
            name: $('#name').val(),
            profile_pic: $("input[name='profile_pic']:checked").val(), // Get value of checked radio button
            gender: $('input[name="gender"]:checked').val(),
            department: [],
            salary: $('#salary').val(),
            date:  $('#day').val() + " " + $('#month').val() + " " +$('#year').val(),
            notes: $('#notes').val(),
        };

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
            return; // If form is not valid, do not submit
        }

        submitForm(formData, userId);

    });

    function fetchUser(userId) {
        $.ajax({
            url: `http://localhost:3000/employees/${userId}`,
            type: 'GET',
            success: function (user) {
                $('#name').val(user.name);
                $(`input[name='profile_pic'][value="${user.profile_pic}"]`).prop('checked', true);
                $(`input[name='gender'][value="${user.gender}"]`).prop('checked', true);
                user.department.forEach(function (department) {
                    $(`input[name='department'][value="${department}"]`).prop('checked', true);
                });
                $('#salary').val(user.salary);
                
                var date = new Date(user.date);
                // console.log("Start Date: ",user.startdate)
                $('#day').val(date.getDate());
                $('#month').val(date.toLocaleString('default', { month: 'long' }));
                $('#year').val(date.getFullYear());
                $('#notes').val(user.notes);
            },
            error: function (error) {
                console.log('Error:', error);
                alert('Error occurred while fetching user data!');
            }
        });
    }

    function submitForm(formData, userId) {
        console.log("============",formData);
        var type = userId ? 'PUT' : 'POST';
        var url = userId ? `http://localhost:3000/employees/${userId}` : 'http://localhost:3000/employees';

        $.ajax({
            url: url,
            type: type,
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                window.location.href = './dashboard.html';
                alert('Employee updated successfully!');
            },
            error: function (error) {
                console.log('Error:', error);
                alert('Error occurred while updating the form!');
            }
        });
    }
});


$('#resetButton').on('click', function() {
    $('#myForm')[0].reset(); 
    $('.error').text(''); 
});

$('#cancelButton').on('click', function() {
    window.location.href = '/pages/dashboard.html'; 
});