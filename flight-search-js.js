document.addEventListener('DOMContentLoaded', function() {
    populateDestinationDropdowns();
    displayAllFlights();
});

function populateDestinationDropdowns() {
    const originSelect = document.getElementById('origin-destination');
    const destinationSelect = document.getElementById('destination');

    destinations.forEach(dest => {
        const originOption = document.createElement('option');
        originOption.value = dest.code;
        originOption.textContent = dest.name;
        originSelect.appendChild(originOption);

        const destOption = document.createElement('option');
        destOption.value = dest.code;
        destOption.textContent = dest.name;
        destinationSelect.appendChild(destOption);
    });
}

function searchFlights() {
    const originCode = document.getElementById('origin-destination').value;
    const destinationCode = document.getElementById('destination').value;
    const flightDate = document.getElementById('flight-date').value;

    const filteredFlights = flights.filter(flight => {
        const flightDateMatch = !flightDate || 
            new Date(flight.departureDateTime).toISOString().split('T')[0] === flightDate;
        
        const originMatch = !originCode || flight.departureDestinationCode === originCode;
        const destinationMatch = !destinationCode || flight.arrivalDestinationCode === destinationCode;

        return originMatch && destinationMatch && flightDateMatch;
    });

    displayFlights(filteredFlights);
}

function displayAllFlights() {
    displayFlights(flights);
}

function displayFlights(flightsList) {
    const flightsList_el = document.getElementById('flights-list');
    flightsList_el.innerHTML = '';

    flightsList.forEach(flight => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${flight.flightNumber}</td>
            <td>${getDestinationName(flight.departureDestinationCode)}</td>
            <td>${getDestinationName(flight.arrivalDestinationCode)}</td>
            <td>${new Date(flight.departureDateTime).toLocaleDateString()}</td>
            <td>${new Date(flight.departureDateTime).toLocaleTimeString()}</td>
            <td>${flight.availableSeats}</td>
            <td>
                <button onclick="bookFlight('${flight.flightNumber}')">הזמן</button>
            </td>
        `;

        flightsList_el.appendChild(row);
    });
}

function getDestinationName(code) {
    const destination = destinations.find(dest => dest.code === code);
    return destination ? destination.name : code;
}

function bookFlight(flightNumber) {
    // Store selected flight and redirect to booking page
    localStorage.setItem('selectedFlight', flightNumber);
    window.location.href = 'flight-booking.html';
}
