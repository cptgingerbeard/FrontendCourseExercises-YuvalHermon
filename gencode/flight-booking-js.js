document.addEventListener('DOMContentLoaded', function() {
    const selectedFlightNumber = localStorage.getItem('selectedFlight');
    if (selectedFlightNumber) {
        displayFlightDetails(selectedFlightNumber);
    } else {
        // Redirect if no flight selected
        window.location.href = 'flight-search.html';
    }
});

function displayFlightDetails(flightNumber) {
    const flight = flights.find(f => f.flightNumber === flightNumber);
    if (flight) {
        const flightDetailsEl = document.getElementById('flight-details');
        flightDetailsEl.innerHTML = `
            <h3>פרטי טיסה</h3>
            <p>מספר טיסה: ${flight.flightNumber}</p>
            <p>יעד מקור: ${getDestinationName(flight.departureDestinationCode)}</p>
            <p>יעד נחיתה: ${getDestinationName(flight.arrivalDestinationCode)}</p>
            <p>תאריך המראה: ${new Date(flight.departureDateTime).toLocaleDateString()}</p>
            <p>שעת המראה: ${new Date(flight.departureDateTime).toLocaleTimeString()}</p>
        `;
    }
}

function updatePassengerFields() {
    const passengersCount = document.getElementById('passengers-count').value;
    const passengersFieldsEl = document.getElementById('passengers-fields');
    passengersFieldsEl.innerHTML = '';

    for (let i = 1; i <= passengersCount; i++) {
        const passengerDiv = document.createElement('div');
        passengerDiv.className = 'passenger-field';
        passengerDiv.innerHTML = `
            <h4>נוסע ${i}</h4>
            <label>שם נוסע:</label>
            <input type="text" name="passenger-name-${i}" required>
            
            <label>מספר דרכון:</label>
            <input type="text" name="passenger-passport-${i}" required>
        `;
        passengersFieldsEl.appendChild(passengerDiv);
    }
}

function submitBooking() {
    const form = document.getElementById('booking-form');
    const passengersCount = document.getElementById('passengers-count').value;
    const selectedFlightNumber = localStorage.getItem('selectedFlight');

    let isValid = true;
    const passengers = [];

    for (let i = 1; i <= passengersCount; i++) {
        const name = form[`passenger-name-${i}`].value;
        const passport = form[`passenger-passport-${i}`].value;

        if (!validateInput(name, 'text') || !validateInput(passport, 'passport')) {
            isValid = false;
            break;
        }

        passengers.push({
            name: name,
            passportNumber: passport
        });
    }

    if (isValid) {
        const booking = {
            flightNumber: selectedFlightNumber,
            passengers: passengers
        };

        // In this phase, we'll just show an alert - no actual storage
        alert('הזמנה התקבלה בהצלחה!');
        
        // Reset local storage and redirect
        localStorage.removeItem('selectedFlight');
        window.location.href = 'index.html';
    } else {
        alert('אנא וודא שכל השדות מולאו בצורה תקינה');
    }
}

// Initial passenger fields setup
updatePassengerFields();
