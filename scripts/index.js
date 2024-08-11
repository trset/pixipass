if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

  // Function to generate a random pixipassID
function generatePixipassID() {
    return Math.random().toString(36).substr(2, 9); // Random ID generator
}

// Function to format date
function formatDate(dateStr) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateStr).toLocaleDateString("en-US", options);
}

// Function to render events on the page
function renderEvents(events) {
    const container = document.getElementById('events-container');
    container.innerHTML = ''; // Clear existing events

    Object.keys(events).forEach(key => {
        const event = events[key];
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');

        eventCard.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <h2>${event.title}</h2>
            <p>${event.Venue}</p>
            <button onclick="buyTicket('${event.id}')">Buy Ticket</button>
        `;

        container.appendChild(eventCard);
    });
}

// Function to handle buying ticket
function buyTicket(eventID) {
    const pixipassID = generatePixipassID();
    let url = `/views/ticket.html?pixipass=${eventID}-${pixipassID}`;
    if(window.location.pathname !== "/" ) {
        url = "/pixipass" + url
    }
    window.location.href = url; // Redirect to the new page with eventID and pixipassID
}

// Function to load events from the JSON file
function loadEvents() {
    fetch('config/events.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => renderEvents(data))
        .catch(error => console.error('Error fetching events:', error));
}

// Initialize the events on page load
window.onload = loadEvents;
