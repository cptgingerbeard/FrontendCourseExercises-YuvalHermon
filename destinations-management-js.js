document.addEventListener('DOMContentLoaded', function() {
    renderDestinationsTable();
});

function renderDestinationsTable() {
    const tableBody = document.getElementById('destinations-list');
    tableBody.innerHTML = ''; // Clear existing rows

    destinations.forEach(destination => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${destination.name}</td>
            <td>${destination.code}</td>
            <td>${destination.airportName}</td>
        `;
        tableBody.appendChild(row);
    });
}

function addDestination() {
    const nameInput = document.getElementById('destination-name');
    const codeInput = document.getElementById('destination-code');
    const airportNameInput = document.getElementById('airport-name');

    // Validation
    if (!validateInput(nameInput.value, 'text') || 
        !validateInput(codeInput.value, 'code') || 
        !validateInput(airportNameInput.value, 'text')) {
        alert('אנא מלא את כל השדות בצורה תקינה');
        return;
    }

    const newDestination = {
        name: nameInput.value,
        code: codeInput.value.toUpperCase(),
        airportName: airportNameInput.value,
        imageUrl: '', // Optional
        airportSite: '', // Optional
        email: '' // Optional
    };

    destinations.push(newDestination);
    
    // Clear form
    nameInput.value = '';
    codeInput.value = '';
    airportNameInput.value = '';

    // Render updated table and show success message
    renderDestinationsTable();
    alert(`היעד ${newDestination.name} נוסף בהצלחה!`);
}

// Add validation for destination code
function validateInput(input, type) {
    switch(type) {
        case 'text':
            return input.trim().length > 0;
        case 'code':
            return /^[A-Z]{3}$/.test(input);
        default:
            return false;
    }
}
