document.addEventListener('DOMContentLoaded', () => {
    // Get query parameters from the URL
    const params = new URLSearchParams(window.location.search).get("pixipass");
    if (!params) {
        alert('Invalid ticket information.');
        return;
    }

    const [eventId, pixipassId] = params.split("-");
    if (!eventId || !pixipassId) {
        alert('Invalid ticket information.');
        return;
    }

    // Generate QR Code URL
    const ticketUrl = `${window.location.origin}/views/index.html/${eventId}-${pixipassId}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(ticketUrl)}&size=200x200`;

    // Fetch event details from the server or use a local source
    fetch(`../config/events.json`)
        .then(response => response.json())
        .then(events => {
            const event = events[eventId];
            if (event) {
                // Update ticket details
                document.getElementById('event-title').textContent = event.title;
                document.getElementById('event-venue').textContent = event.Venue;

                // Format date and time
                const date = new Date(event.date);
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
                const formattedDate = date.toLocaleString("en-US", options);

                document.getElementById('event-date').textContent = formattedDate;
                document.getElementById('event-price').textContent = `${event.price}`;
                document.getElementById('ticket-id').textContent = `PixiPass-${pixipassId}`;

                // Set QR Code image
                document.getElementById('qr-code').innerHTML = `<img src="${qrCodeUrl}" alt="QR Code">`;
            } else {
                alert('Event not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching event details:', error);
            alert('Failed to load event details.');
        });
});
