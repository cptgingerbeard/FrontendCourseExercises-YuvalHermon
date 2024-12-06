// Global variables for destinations, flights, and bookings
const destinations = [
    {
        name: "לונדון",
        imageUrl: "",
        airportName: "Heathrow Airport",
        airportSite: "heathrow.com",
        email: "info@heathrow.com",
        code: "LHR"
    },
    {
        name: "ניו יורק",
        imageUrl: "",
        airportName: "JFK Airport",
        airportSite: "jfkairport.com",
        email: "info@jfkairport.com",
        code: "JFK"
    },
    // Add at least 8 more destinations here
];

const flights = [
    {
        flightNumber: "ON001",
        departureDestinationCode: "LHR",
        arrivalDestinationCode: "JFK",
        departureDateTime: "2024-12-15T10:00:00",
        arrivalDateTime: "2024-12-15T14:30:00",
        availableSeats: 150
    },
    {
        flightNumber: "ON002",
        departureDestinationCode: "JFK",
        arrivalDestinationCode: "LHR",
        departureDateTime: "2024-12-20T15:00:00",
        arrivalDateTime: "2024-12-21T06:30:00",
        availableSeats: 120
    },
    // Add at least 8 more flights here
];

const bookings = [
    // This will be populated dynamically later
];

// Navigation functions
function navigateToHome() {
    window.location.href = 'main.html';
}

function navigateToHelp() {
    window.location.href = 'help.html';
}

// Helper function to validate form inputs
function validateInput(input, type) {
    switch(type) {
        case 'text':
            return input.trim().length > 0;
        case 'passport':
            // Simple passport number validation
            return /^[A-Z0-9]{6,9}$/.test(input);
        default:
            return false;
    }
}
