$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var userId = urlParams.get('id');
    if (userId) {
        fetchUser(userId);
    }

    $('#employeeForm').submit(function (event) {
        event.preventDefault();
        var form_data = {
            name: $('#name').val(),
            profile: $("input[name='profile']:checked").val(),
            gender: $("input[name='gender']:checked").val(),
            department: [],
            salary: $('#salary').val(),
            date: $('#day').val() + " " + $('#month').val() + " " + $('#year').val(),
            notes: $('#notes').val()
        };

        var namePattern = /^[a-zA-Z\s]+$/;
        if (!namePattern.test(form_data.name)) {
            alert('Please enter a valid name');
            return;
        }

        var salaryPattern = /^\d+(\.\d{1,2})?$/;
        if (!salaryPattern.test(form_data.salary)) {
            alert('Please enter a valid salary');
            return;
        }

        $.each($("input[name='department']:checked"), function () {
            form_data.department.push($(this).val());
        });

        $.ajax({
            url: 'http://localhost:3000/user',
            type: 'GET',
            success: function (data) {
                var duplicate = false;
                data.forEach(function (user) {
                    if (user.name === form_data.name && user.gender === form_data.gender) {
                        duplicate = true;
                        return false; 
                    }
                });
                
                    submitForm(form_data, userId);
                
            },
            error: function (error) {
                console.log('Error:', error);
                alert('Error occurred while submitting the form!');
            }
        });
    });

    function fetchUser(userId) {
        $.ajax({
            url: http://localhost:3000/user/${userId},
            type: 'GET',
            success: function (user) {
                $('#name').val(user.name);
                $(input[name='profile'][value="${user.profile}"]).prop('checked', true);
                $(input[name='gender'][value="${user.gender}"]).prop('checked', true);
                user.department.forEach(function (dept) {
                    $(input[name='department'][value="${dept}"]).prop('checked', true);
                });
                $('#salary').val(user.salary);
                var date = new Date(user.date);
                $('#day').val(date.getDate());
                $('#month').val(date.toLocaleString('default', {
                    month: 'long'
                }));
                $('#year').val(date.getFullYear());
                $('#notes').val(user.notes);
            },
            error: function (error) {
                console.log('Error:', error);
                alert('Error occurred while fetching user data!');
            }
        });
    }

    function submitForm(form_data, userId) {
        var requestType = userId ? 'PUT' : 'POST';
        var requestUrl = userId ? http://localhost:3000/user/${userId} : 'http://localhost:3000/user';

        $.ajax({
            url: requestUrl,
            type: requestType,
            contentType: 'application/json',
            data: JSON.stringify(form_data),
            success: function () {
                alert(userId ? 'User updated successfully!' : 'User added successfully!');
                window.location.href = "./employeeDetails.html";
            },
            error: function (error) {
                console.log('Error:', error);
                alert(userId ? 'Error occurred while updating user!' : 'Error occurred while adding user!');
            }
        });
    }
});

function cancelEdit() {
    window.location.href = "./employeeDetails.html";
}

function resetForm() {
    document.getElementById('employeeForm').reset();
}