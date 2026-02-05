
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('itinerary-form');
    const display = document.getElementById('itinerary-display');
    const summaryDisplay = document.getElementById('itinerary-summary');
    const resetButton = document.getElementById('reset-button');
    const checkboxes = document.querySelectorAll('input[name="activity"]');
    const maxActivities = 4;

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checkedCount = document.querySelectorAll('input[name="activity"]:checked').length;
            if (checkedCount > maxActivities) {
                alert(`You can select a maximum of ${maxActivities} activities.`);
                checkbox.checked = false;
            }
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        generateItinerary();
    });

    resetButton.addEventListener('click', () => {
        display.innerHTML = '';
        summaryDisplay.innerHTML = '';
    });

    const cityActivityDatabase = {
        Tokyo: {
            Shopping: [{ name: 'Ginza', description: 'Luxury shopping and art galleries.' }, { name: 'Shibuya', description: 'Trendy fashion and the famous Scramble Crossing.' }],
            Museums: [{ name: 'Tokyo National Museum', description: 'Largest collection of Japanese art.' }, { name: 'Ghibli Museum', description: 'Fantasy world of Studio Ghibli (requires advance tickets).' }],
            Zoo: [{ name: 'Ueno Zoo', description: 'Japan\'s oldest zoo, home to giant pandas.' }],
            Eating: [{ name: 'Omoide Yokocho', description: 'Nostalgic alleyways with delicious yakitori.' }, { name: 'Tsukiji Outer Market', description: 'Fresh seafood and street food.' }]
        },
        Kyoto: {
            Shopping: [{ name: 'Nishiki Market', description: 'A narrow, five-block long shopping street.' }, { name: 'Gekkeikan Okura Sake Museum', description: 'Learn about and taste Japanese sake' }],
            Museums: [{ name: 'Kyoto National Museum', description: 'Focuses on pre-modern Japanese and Asian art.' }],
            Trekking: [{ name: 'Fushimi Inari Shrine', description: 'Hike through thousands of red torii gates.' }, { name: 'Arashiyama Bamboo Grove', description: 'A beautiful and serene bamboo forest.' }],
            Eating: [{ name: 'Pontocho Alley', description: 'Traditional dining in a narrow, atmospheric alley.' }]
        },
        Osaka: {
            Shopping: [{ name: 'Shinsaibashi-suji', description: 'The main shopping area in Osaka.' }],
            Zoo: [{ name: 'Tennoji Zoo', description: 'A large zoo in the heart of the city.' }],
            Eating: [{ name: 'Dotonbori', description: 'Famous for its vibrant nightlife and diverse street food.' }]
        },
        Fukuoka: {
            Beach: [{ name: 'Momochi Seaside Park', description: 'A modern waterfront with a large artificial beach.' }],
            Eating: [{ name: 'Yatai Stalls', description: 'Open-air food stalls, a famous feature of Fukuoka.' }]
        },
        Nagasaki: {
            Museums: [{ name: 'Nagasaki Atomic Bomb Museum', description: 'A powerful and moving museum about the 1945 atomic bombing.' }],
            Trekking: [{ name: 'Mount Inasa', description: 'Offers stunning panoramic views of the city.' }]
        },
        Sapporo: {
            Shopping: [{ name: 'Tanukikoji Shopping Arcade', description: 'A 1km-long arcade with around 200 shops.' }],
            Trekking: [{ name: 'Moerenuma Park', description: 'A large park designed by Isamu Noguchi.' }],
            Eating: [{ name: 'Ramen Alley', description: 'A narrow lane lined with shops serving Sapporo\'s famous ramen.' }]
        }
    };

    const eveningSuggestions = {
        '5-star': 'Enjoy a world-class kaiseki dinner at your hotel.',
        '4-star': 'Dine at a highly-rated local restaurant nearby.',
        'Budget': 'Explore a local yokocho (food alley) for authentic, affordable eats.'
    };

    function generateItinerary() {
        display.innerHTML = '';
        summaryDisplay.innerHTML = '';

        const duration = parseInt(form.duration.value, 10);
        const startDate = new Date(form['start-date'].value);
        const totalSpending = form['total-spending'].value;
        const accommodation = form.accommodation.value;
        const selectedCities = Array.from(form.cities.selectedOptions).map(opt => opt.value);
        const selectedActivities = Array.from(document.querySelectorAll('input[name="activity"]:checked')).map(cb => cb.value);

        summaryDisplay.innerHTML = `<h2>Trip Summary</h2><p><strong>Total Budget:</strong> $${totalSpending}</p>`;

        const daysPerCity = Math.floor(duration / selectedCities.length);
        let remainderDays = duration % selectedCities.length;

        let dayCounter = 0;
        selectedCities.forEach((city, cityIndex) => {
            let cityDays = daysPerCity + (remainderDays > 0 ? 1 : 0);
            remainderDays--;

            for (let i = 0; i < cityDays; i++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + dayCounter);

                const getSuggestion = (activityType, city) => {
                    const cityDb = cityActivityDatabase[city];
                    if (cityDb && cityDb[activityType] && cityDb[activityType].length > 0) {
                        return cityDb[activityType][Math.floor(Math.random() * cityDb[activityType].length)];
                    }
                    return { name: 'Local Exploration', description: 'Wander around the city and discover its unique charm.' };
                };

                const morningActivityType = selectedActivities[i % selectedActivities.length] || 'Exploring';
                const afternoonActivityType = selectedActivities[(i + 1) % selectedActivities.length] || 'Sightseeing';

                const morningSuggestion = getSuggestion(morningActivityType, city);
                const afternoonSuggestion = getSuggestion(afternoonActivityType, city);
                const eveningSuggestion = eveningSuggestions[accommodation];

                const dayCard = document.createElement('div');
                dayCard.className = 'day-card';

                const dayHeader = document.createElement('div');
                dayHeader.className = 'day-header';
                dayHeader.innerHTML = `<h3>Day ${dayCounter + 1}: ${city}</h3><span>${date.toDateString()}</span>`;

                const dayContent = document.createElement('div');
                dayContent.className = 'day-content';
                dayContent.innerHTML = `
                    <p><strong>Morning:</strong> ${morningSuggestion.name} - <em>${morningSuggestion.description}</em></p>
                    <p><strong>Afternoon:</strong> ${afternoonSuggestion.name} - <em>${afternoonSuggestion.description}</em></p>
                    <p><strong>Evening:</strong> ${eveningSuggestion}</p>
                    <p><strong>Accommodation:</strong> 🏨 Stay at your selected ${accommodation} hotel.</p>
                `;

                dayCard.appendChild(dayHeader);
                dayCard.appendChild(dayContent);
                display.appendChild(dayCard);
                dayCounter++;
            }
        });
    }
});
