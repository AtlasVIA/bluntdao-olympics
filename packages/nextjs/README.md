# BluntDAO Olympics

Welcome to the BluntDAO Olympics application! This Next.js-based web application showcases various events, leaderboards, and participant statistics for the BluntDAO Olympics.

## Features

- Home page with quick access to all main sections
- Medal Tally
- Country Leaderboard
- Participant Statistics
- Consumption Stats
- Activity Data
- Top Participants
- Popular Activities
- Live Leaderboards
- Responsive design for mobile and desktop
- Animations for enhanced user experience

## Getting Started

To run the BluntDAO Olympics application locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-repo/bluntdao-olympics.git
   cd bluntdao-olympics
   ```

2. Install dependencies:
   ```
   yarn install
   ```

3. Run the development server:
   ```
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

The main components of the application are organized as follows:

- `packages/nextjs/app`: Next.js app router pages
- `packages/nextjs/components/bluntdao-olympics`: Custom components for the application
  - `common`: Reusable components (Header, Footer, LeaderboardTable, StatCard)
  - `screens`: Main screen components (Home, MedalTally, CountryLeaderboard, ParticipantStats, ConsumptionStats, ActivityData, TopParticipants, PopularActivities, LiveLeaderboards)
  - `layout`: Layout component for consistent page structure

## Technologies Used

- Next.js 13 (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion

## Important Notes

- This project uses Next.js 13 with the new App Router structure.
- All components that use client-side functionality (e.g., hooks, interactivity) are marked with the "use client" directive.
- The application currently uses mock data for demonstration purposes. In a production environment, you would integrate with a backend API to fetch real data.

## Contributing

We welcome contributions to the BluntDAO Olympics project. Please feel free to submit issues, feature requests, or pull requests.

## License

This project is licensed under the MIT License.