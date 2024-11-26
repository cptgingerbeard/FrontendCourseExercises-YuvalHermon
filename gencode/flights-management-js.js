document.addEventListener('DOMContentLoaded', function() {
    populateDestinationDropdowns();
    renderFlightsTable();
});

function populateDestinationDropdowns() {
    const departureSelect = document.getElementById('departure-destination');
    const arrivalSelect = document.getElementById('arrival-destination');

    destinations.forEach(dest => {
        const departureOption = document.createElement('option');
        departureOption.value = dest.code;
        departureOption.textContent = dest.name;
        departureSelect.appendChild(departureOption);

        const arrivalOption = document.createElement('option');
        arrivalOption.value = dest.code;
        arrivalOption.textContent = dest.name;
        arrivalSelect.appendChild(arrivalOption);
    });
}

function renderFlightsTable() {
    const tableBody = document.getElementById('flights-list');
    tableBody.innerHTML = ''; // Clear existing rows

    flights.forEach(flight => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${flight.flightNumber}</td>
            <td>${getDestinationName(flight.departureDestinationCode)}</td>
            <td>${getDestinationName(flight.arrivalDestinationCode)}</td>
            <td>${new Date(flight.departureDateTime).toLocaleDateString()}</td>
            <td>${new Date(flight.departureDateTime).toLocaleTimeString()}</td>
            <td>${flight.availableSeats}</td>
        `;
        tableBody.appendChild(row);
    });
}

function addFlight() {
    const flightNumberInput = document.getElementById('flight-number');
    const departureDestinationInput = document.getElementById('departure-destination');
    const arrivalDestinationInput = document.getElementById('arrival-destination');
    const departureDateTimeInput = document.getElementById('departure-datetime');
    const arrivalDateTimeInput = document.getElementById('arrival-datetime');
    const seatsCountInput = document.getElementById('seats-count');

    // Validation
    if (departureDestinationInput.value === arrivalDestinationInput.value) {
        alert('יעד המראה ויעד נחיתה חייבים להיות שונים');
        return;
    }

    const departureDateTime = new Date(departureDateTimeInput.value);
    const arrivalDateTime = new Date(arrivalDateTimeInput.value);

    if (arrivalDateTime <= departureDateTime) {
        alert('תאריך הנחיתה צריך להיות לאחר תאריך ההמראה');
        return;
    }

    const newFlight = {
        flightNumber: flightNumberInput.value,
        departureDestinationCode: departureDestinationInput.value,
        arrivalDestinationCode: arrivalDestinationInput.value,
        departureDateTime: departureDateTime.toISOString(),
        arrivalDateTime: arrivalDateTime.toISOString(),
        availableSeats: parseInt(seatsCountInput.value)
    };

    flights.push(newFlight);
    
    // Clear form
    flightNumberInput.value = '';
    departureDestinationInput.selectedIndex = 0;
    arrivalDestinationInput.selectedIndex = 0;
    departureDateTimeInput.value = '';
    arrivalDateTimeInput.value = '';
    seatsCountInput.value = '';

    // Render updated table and show success message
    renderFlightsTable();
    alert(`הטיסה ${newFlight.flightNumber} נוספה בהצלחה!`);
}

function getDestinationName(code) {
    const destination = destinations.find(dest => dest.code === code);
    return destination ? destination.name : code;
}
