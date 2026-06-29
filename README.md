# Habit Tracker & Streak Dashboard

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)
![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white)
![LocalStorage](https://img.shields.io/badge/Storage-localStorage-64748B)
![Status](https://img.shields.io/badge/Status-Completed-22C55E)

## Overview

Habit Tracker & Streak Dashboard is a React-based productivity app built for tracking daily habits, visualizing consistency, and growing streaks over time.

The app allows users to create habits, mark them complete each day, monitor progress, review insights, and track consistency through a calendar-style heatmap. All data is stored in the browser using `localStorage`, so habits and check-ins remain available even after refreshing or closing the browser.

This project was built as part of the Kshitij Web Development and AI Workshop 2026 assignment to practice React, JavaScript, routing, component organization, state management, CSS responsiveness, and browser-based data persistence.

## Highlights

- Feature-based React architecture
- Dynamic streak tracking and analytics
- Pure CSS 30-day consistency heatmap
- Browser persistence with `localStorage`
- Responsive mobile-first interface
- Reusable utility layer for streaks and statistics
- Built-in Pomodoro timer and streak freeze system

## Features

### Navigation & Home

- Fixed responsive navigation bar with links for Home, My Habits, Insights, and About.
- Mobile-friendly hamburger menu for smaller screens.
- Two-column hero section with a clear "Begin Tracking" call-to-action.
- Live global check-in counter powered by `localStorage`.

### Habit Management

- Create habits with name, category, frequency, and optional description.
- Inline form validation that appears only after a field is touched.
- Disabled "Add Habit" button until all required fields are completed.
- Edit and delete existing habits with browser persistence.
- Delete confirmation modal to prevent accidental habit removal.

### Dashboard

- Daily dashboard displaying all active habits as interactive cards.
- Mark habits as completed or incomplete for the current day.
- Automatic current streak and longest streak calculations.
- Animated daily progress bar.

### Consistency Tracking

- 30-day consistency heatmap built using pure CSS Grid.
- Filter heatmap by habit category.
- Tooltips displaying the date and completed habit count.

### Insights & Analytics

- Overview statistics including total habits, completion rate, current streak, and longest streak.
- Best habit highlight based on 30-day completion rate.
- Individual habit insight cards with current streak and 7-day completion rate.
- Habit momentum score with a visual gradient progress bar.

### Bonus Features

- Built-in Pomodoro timer with 25-minute work and 5-minute break sessions.
- Weekly streak freeze token stored in `localStorage`.

### User Experience

- Responsive design across desktop and mobile devices.
- Custom 404 page for invalid routes.

## Tech Stack

##### Frontend

- React
- JavaScript
- CSS
- Vite

##### Routing

- React Router DOM

##### Icons

- lucide-react

##### Data Persistence

- Browser `localStorage`

##### Development Tools

- ESLint
- npm

## Installation

##### 1. Clone the repository

```bash
git clone https://github.com/DeShyam01/habit-tracker.git
```

##### 2. Navigate to the project directory

```bash
cd habit-tracker
```

##### 3. Install dependencies

```bash
npm install
```

##### 4. Start the development server

```bash
npm run dev
```

##### 5. Open the app

Open the local URL shown in the terminal, usually:

```text
http://127.0.0.1:5173/
```

## Usage

- Open the Home page and click Begin Tracking.
- Create a new habit by entering a habit name, selecting a category, and choosing a frequency.
- Mark a habit as done from the My Habits dashboard.
- Uncheck a habit on the same day if it was marked by mistake.
- Edit an existing habit using the edit button on the habit card.
- Delete a habit only after confirming through the delete modal.
- Review the daily progress bar to see how many habits are completed today.
- Use the consistency grid to check habit completion history over the last 30 days.
- Filter the heatmap by category to inspect specific habit groups.
- Open Insights to view completion rate, streaks, best habit, and habit momentum.
- Use the Pomodoro timer to track focus minutes linked to a habit.

## Project Structure

```text
habit-tracker/
|-- public/
|   |-- favicon.svg
|   `-- icons.svg
|-- src/
|   |-- app/
|   |   |-- App.jsx
|   |   `-- App.css
|   |-- assets/
|   |   `-- home/
|   |       `-- heroright.png
|   |-- features/
|   |   |-- about/
|   |   |   `-- pages/
|   |   |-- dashboard/
|   |   |   |-- components/
|   |   |   `-- pages/
|   |   |-- home/
|   |   |   `-- pages/
|   |   |-- insights/
|   |   |   `-- pages/
|   |   `-- notfound/
|   |       `-- pages/
|   |-- shared/
|   |   |-- components/
|   |   `-- utils/
|   |-- index.css
|   `-- main.jsx
|-- index.html
|-- package.json
|-- vite.config.js
`-- README.md
```

| Folder / File             | Description                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------ |
| `public/`                 | Static public assets used by the app.                                                |
| `src/app/`                | Main app component, routes, and app-level styling.                                   |
| `src/assets/`             | Image assets used in the UI.                                                         |
| `src/features/home/`      | Home page hero section and live check-in stat.                                       |
| `src/features/dashboard/` | Habit dashboard, habit form, habit cards, heatmap, progress bar, and Pomodoro timer. |
| `src/features/insights/`  | Insights page with habit analytics and momentum score.                               |
| `src/features/about/`     | Project information page.                                                            |
| `src/features/notfound/`  | Custom 404 route.                                                                    |
| `src/shared/components/`  | Reusable UI components such as Navbar and Button.                                    |
| `src/shared/utils/`       | Habit storage, streak calculation, stats, and localStorage helper logic.             |
| `package.json`            | Project scripts and dependencies.                                                    |

## API Integration

This project does not use an external backend API.

Instead, it uses the browser `localStorage` API to persist:

- Habit details
- Daily check-ins
- Streak history
- Pomodoro focus minutes
- Weekly freeze token state

The main storage and analytics logic is handled in:

```text
src/shared/utils/habitStorage.js
```

This file works like a small local data layer for the app. It loads habits, saves habits, normalizes older habit data, calculates streaks, generates stats, and dispatches update events so different pages can stay in sync.

## Challenges Faced

- Designing a data structure that could support habits, check-ins, streaks, heatmap data, and insights without a backend.
- Calculating current streak and longest streak correctly from saved check-in dates.
- Making form validation user-friendly by showing errors only after fields are touched.
- Keeping Home, Dashboard, and Insights synchronized with the same `localStorage` data.
- Building a responsive layout that works well across desktop and mobile screens.
- Creating a heatmap using pure CSS grid without external chart libraries.
- Preventing accidental habit deletion by adding a confirmation modal.

## Key Learnings

- Learned how to organize a React project using feature-based folders.
- Practiced React Router for building a multi-page single-page application.
- Improved understanding of component state, derived data, and browser persistence.
- Learned how to use `localStorage` as a simple client-side data source.
- Practiced writing reusable utility functions for streaks, stats, and date handling.
- Learned how to create responsive layouts and small CSS animations without relying on heavy UI libraries.
- Understood the importance of validation timing and confirmation flows for better user experience.

## Future Improvements

- Add user accounts and cloud sync.
- Add reminder notifications for pending habits.
- Add weekly and monthly charts for deeper habit analytics.
- Allow users to export habit reports as CSV or PDF.
- Add drag-and-drop habit ordering.
- Add dark mode.
- Add custom habit colors.
- Add achievement badges for streak milestones.
- Improve accessibility with more keyboard navigation and ARIA support.

## Contributing

Contributions, suggestions, and improvements are welcome.

You can contribute by:

- Improving the UI and responsive design.
- Adding new habit analytics.
- Improving accessibility.
- Refactoring components.
- Fixing bugs.
- Adding tests.

## Author

Habit Tracker & Streak Dashboard is a React-based productivity application for building daily habits, tracking consistency, and visualizing long-term progress, built by **Shyamsundar Gayen**.

It was developed during the Kshitij Web Development and AI Workshop 2026, where I used the project to strengthen my React fundamentals, state management, routing, responsive UI design, and browser-based persistence.

- GitHub: [@DeShyam01](https://github.com/DeShyam01)
- LinkedIn: [Shyamsundar Gayen](https://www.linkedin.com/in/shyamsundar-gayen-77a904309)
