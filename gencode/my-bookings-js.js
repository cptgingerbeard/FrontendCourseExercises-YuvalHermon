document.addEventListener('DOMContentLoaded', function() {
    renderBookingsTable();
});

function renderBookingsTable() {
    const tableBody = document.getElementById('bookings-list');
    tableBody.innerHTML = ''; // Clear existing rows

    // Check if bookings array is empty
    if (bookings.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="6" class="empty-table">
                אין הזמנות קיימות
            </td>
        `;
        tableBody.appendChild(emptyRow);
        return;
    }

    bookings.forEach((booking, index) => {
        const flight = flights.find(f => f.flightNumber === booking.flightNumber);
        
        if (flight) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${booking.flightNumber}</td>
                <td>${getDestinationName(flight.departureDestinationCode)}</td>
                <td>${getDestinationName(flight.arrivalDestinationCode)}</td>
                <td>${new Date(flight.departureDateTime).toLocaleDateString()}</td>
                <td>${booking.passengers.length}</td>
            `;
            tableBody.appendChild(row);
        }
    });
}

function getDestinationName(code) {
    const destination = destinations.find(dest => dest.code === code);
    return destination ? destination.name : code;
}
