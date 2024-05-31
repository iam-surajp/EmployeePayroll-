
document.addEventListener('DOMContentLoaded', function () {
    const deleteLinks = document.querySelectorAll('.delete-row');
    
    deleteLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();  
            const row = this.closest('tr');  
            if (row) {
                row.remove();  
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = urlParams.get('id');

    if (employeeId) {

        const employees = [
            { id: 1, name: 'Govind Patidar', gender: 'Male', profilePic: '1', departments: ['Sales', 'Finance'], salary: '20000', startDate: { day: '1', month: '1', year: '1990' }, note: 'Good employee' },
            { id: 2, name: 'Shivani Patil', gender: 'Female', profilePic: '2', departments: ['Sales', 'Finance'], salary: '30000', startDate: { day: '2', month: '2', year: '1991' }, note: 'Excellent performer' },
    
        ];

        const employee = employees.find(emp => emp.id == employeeId);

        if (employee) {
            document.querySelector('input[name="name"]').value = employee.name;
            document.querySelector(`input[name="profile_pic"][value="${employee.profilePic}"]`).checked = true;
            document.querySelector(`input[name="gender"][value="${employee.gender}"]`).checked = true;
            employee.departments.forEach(dept => {
                document.querySelector(`input[name="dept"][value="${dept}"]`).checked = true;
            });
            document.querySelector('select[name="salary"]').value = employee.salary;
            document.querySelector('select[name="startdate_day"]').value = employee.startDate.day;
            document.querySelector('select[name="startdate_month"]').value = employee.startDate.month;
            document.querySelector('select[name="startdate_year"]').value = employee.startDate.year;
            document.querySelector('textarea[name="note"]').value = employee.note;
        }
    }
});


$(document).ready(function(){
    $('#myForm').on('submit',function(e){
        e.preventDefault() // prevent default form submission

        // collect form data
        var formData = {
            name:$('#name').val(),
            profile_pic: $('input[name="profile_pic"]:checked').val(),  //get value of checked radio button
            gender:$('input[name="gender"]:checked').val(),
            department:[],
            salary:$('select[name="salary"]').val(),
            startdate:{
                day:$('select[name="startdate"]').eq(0).val(),
                month:$('select[name="startdate"]').eq(1).val(),
                year:$('select[name="startdate"]').eq(2).val(),
            },
            note:$('textarea[name="textarea"]').val(),
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
            },
            error: function(error) {
                console.error('Error sending data:', error);
                alert('Error adding employee');
            }
        });
    });
});