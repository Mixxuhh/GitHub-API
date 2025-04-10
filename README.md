# GitHub API Integration

A React application that integrates with the GitHub API to search for users and view their profiles.

## Features

- **GitHub Authentication**: Secure token-based authentication with GitHub API
- **User Search**: Search for GitHub users by username
- **User Profiles**: View detailed information about GitHub users
- **Candidate Management**: Save and manage potential candidates
- **Responsive Design**: Modern UI that works on desktop and mobile devices

## Technologies Used

- React
- TypeScript
- Vite
- GitHub REST API
- React Router
- CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- GitHub account with a personal access token

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/github-api.git
   cd github-api
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your GitHub token:

   ```
   VITE_GITHUB_TOKEN=your_github_token_here
   ```

4. Start the development server:

   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Authentication**: Enter your GitHub personal access token to authenticate with the GitHub API
2. **Search Users**: Use the search bar to find GitHub users
3. **View Profiles**: Click on a user to view their detailed profile information
4. **Manage Candidates**: Save or reject potential candidates

## Deployment

This application is configured for deployment on Render:

1. Build Command: `npm run build`
2. Start Command: `npm start`

## Project Structure

- `src/api/API.tsx`: GitHub API integration functions
- `src/components/`: Reusable UI components
- `src/pages/`: Page components
- `src/styles/`: CSS styles
- `src/interfaces/`: TypeScript interfaces

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- GitHub API Documentation
- React Documentation
- Vite Documentation
