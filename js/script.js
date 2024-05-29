
document.addEventListener('DOMContentLoaded', function () {
    const deleteLinks = document.querySelectorAll('.delete-row');
    
    deleteLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();  // Prevent the default action of the anchor tag
            const row = this.closest('tr');  // Find the closest table row
            if (row) {
                row.remove();  // Remove the row from the table
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