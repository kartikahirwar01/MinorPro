// script.js

// Open the offcanvas menu
function openNav() {
    document.getElementById("offcanvasMenu").style.width = "250px";
}

// Close the offcanvas menu
function closeNav() {
    document.getElementById("offcanvasMenu").style.width = "0";
}
// script.js

// script.js

const text = "Welcome to our Purple Typewriter Effect!";
let index = 0;
const speed = 100; // Speed of typing in milliseconds
const element = document.getElementById("typewriter-text");

function typeWriter() {
    if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    }
}

// Start the typewriter effect when the page loads
window.onload = typeWriter;


// bookingjs

document.getElementById('infoToggle').addEventListener('click', function() {
    const infoCard = document.getElementById('infoCard');
    if (infoCard.style.display === 'block') {
        infoCard.style.display = 'none';
    } else {
        infoCard.style.display = 'block';
    }
});

// Booking Form submission
document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Simulate booking process (you can add real logic or API calls here)
    alert('Booking Successful!');

    // Clear form fields
    document.getElementById('bookingForm').reset();

    // Redirect to another page after 2 seconds
    setTimeout(function() {
        window.location.href = 'confirmation.html';  // Replace 'confirmation.html' with the actual confirmation page URL
    }, 2000);
});

// confimation js

function goHome() {
    window.location.href = 'index.html';  // Replace with your actual home page URL
}


//location feed


let map;
        let marker;

        // Initialize the map with a default view
        function initMap(lat, lng) {
            const location = [lat, lng];
            map = L.map('map').setView(location, 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            marker = L.marker(location).addTo(map);
        }

        // Update the marker on the map
        function updateMap(lat, lng) {
            const location = [lat, lng];
            map.setView(location, 13);
            marker.setLatLng(location);
        }

        // Get the user's location using Geolocation API
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }

        // Show the position on the map and in the info section
        function showPosition(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            // Update location info
            document.getElementById("latitude").textContent = lat;
            document.getElementById("longitude").textContent = lng;
            document.getElementById("accuracy").textContent = accuracy + " meters";

            // If the map is initialized, update it; otherwise, initialize it
            if (map) {
                updateMap(lat, lng);
            } else {
                initMap(lat, lng);
            }
        }

        // Handle errors during geolocation
        function showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    alert("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("An unknown error occurred.");
                    break;
            }
        }

        // Suggest location using OpenStreetMap Nominatim API
        async function locationSuggestion(event) {
            const input = event.target.value;

            if (input.length > 3) {
                const url = `https://nominatim.openstreetmap.org/search?format=json&q=${input}`;
                const response = await fetch(url);
                const data = await response.json();

                if (data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lng = parseFloat(data[0].lon);

                    // Update location info with the suggested place
                    document.getElementById("latitude").textContent = lat;
                    document.getElementById("longitude").textContent = lng;
                    document.getElementById("accuracy").textContent = "N/A";

                    updateMap(lat, lng);
                }
            }
        }

        // Automatically fetch the location when the page loads
        window.onload = function() {
            getLocation();
        };

        // Review

        let selectedRating = 0;

        // Event listeners for stars to select a rating
        document.querySelectorAll('.rating-star').forEach(star => {
            star.addEventListener('click', function() {
                selectedRating = this.getAttribute('data-score');
                updateStars(selectedRating);
            });
        });
        
        // Update the appearance of the stars based on selection
        function updateStars(score) {
            document.querySelectorAll('.rating-star').forEach(star => {
                star.classList.remove('active');
                if (star.getAttribute('data-score') <= score) {
                    star.classList.add('active');
                }
            });
        }
        
        // Submit and display the review
        function saveReview() {
            const company = document.getElementById('transport-company').value;
            const feedback = document.getElementById('feedback-text').value;
        
            if (!company || !feedback || selectedRating === 0) {
                alert('Please complete the form and select a rating.');
                return;
            }
        
            // Create a new review card
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('review-card');
            reviewCard.innerHTML = `
                <h3>${company} - ${'★'.repeat(selectedRating)}</h3>
                <p>${feedback}</p>
            `;
        
            // Append to the review board
            document.getElementById('review-board').appendChild(reviewCard);
        
            // Clear form fields
            document.getElementById('transport-company').value = '';
            document.getElementById('feedback-text').value = '';
            updateStars(0); // Reset star ratings
        }
        

        // scrollspy

        
        