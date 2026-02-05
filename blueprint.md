
# Japan Itinerary Generator

## Overview

This application generates a personalized and detailed travel itinerary for a trip to Japan. It considers user preferences for accommodation, activities, trip duration, budget, and cities to visit, presenting a realistic, day-by-day schedule in a visually engaging card format.

## Implemented Features

*   **Comprehensive User Input Form:**
    *   Country, duration, and start date.
    *   **Total Spending:** A field to input the total trip budget.
    *   **Cities to Visit:** A selection of major Japanese cities (Tokyo, Osaka, Kyoto, Fukuoka, Nagasaki, Sapporo).
    *   Accommodation preference (Budget, 4-star, 5-star).
    *   Choice of up to 4 interests from a list including shopping, museums, zoo, beach, trekking, and eating.
*   **Dynamic & City-Specific Itinerary:**
    *   A clean, card-based layout where each day is assigned to one of the selected cities.
    *   The itinerary is logically structured, distributing the trip duration among the chosen cities.
    *   Each card includes the date, city, a morning activity, an afternoon activity, and a **specific evening restaurant recommendation**.
    *   Displays the overall trip budget.
*   **Reset Functionality:** A "Reset" button to clear the form and previous itinerary.

## Current Plan

*   **Add Restaurant Database:** Expand the `cityActivityDatabase` in `main.js` to include a list of specific restaurant recommendations for each city.
*   **Enhance Itinerary Logic:** Upgrade the `generateItinerary` function to replace the generic evening suggestion with a specific restaurant recommendation from the database, appropriate for the current city.
