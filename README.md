# Twisted-Donkey
Frontend application that provides an interface for users to generate storybooks based on their input. Users simply provide a description and choose the number of pages, and the application takes care of the rest.

### Demo
[Try the Front-end Demo](https://picturebook-generator.vercel.app/)

## Features
- **User-friendly interface**: Simplifies the complex process of generating storybooks into a couple of clicks.
- **Real-time updates**: Utilizes Server-Sent Events (SSE) to keep users informed about the generation process, showing them progress updates and generated content as it becomes available.
- **Mobile responsive**: Designed with a mobile-first approach to ensure a smooth experience on all devices.

## Tech Stack
- **TypeScript**: The main language used for the frontend server.
- **Next.js**: React framework for server rendering.
- **TailwindCSS**: Framework to adjust the application's look and feel.
- **Vercel**: Platform for hosting and deployment, ensuring fast access times with CDN capabilities.
- **Javascript Fetch API**: For calling the backend `/get_storybook` endpoint.
- **Event Source**: Javascript library for consuming SSE.

## How It Works

1. Users enter a description and choose a total number of pages on the frontend interface.
2. Upon submission, the frontend uses the Fetch API to send a request to the backend's `/get_storybook/` endpoint.
3. The backend responds with a `task_id` which is then used to create an SSE connection using the Event Source library.
4. As the backend processes the request and generates content, updates are pushed to the frontend in real-time through SSE. Users see the text and images of each page as soon as they're generated and available.
5. Once the entire storybook has been generated, users can view and enjoy the content.

## Local Development

1. Clone the repository.
2. Install the required packages using `npm install` or `yarn install`.
3. Start the local development server using `npm run dev` or `yarn dev`.
4. Open a browser and navigate to `http://localhost:3000` to view the application.
5. Ensure the backend service is also running locally to test the entire flow.

## Deployment on Vercel

1. Link your repository to your Vercel account.
2. Choose the master/main branch for continuous deployment.
3. Set up environment variables if required.
4. Vercel will automatically deploy your application and provide a live link.

## Areas for Improvement

1. **UX/UI Enhancements**: Implement smooth transitions between pages or when displaying newly generated content.
2. **Error Handling**: Improve error messages and handling for failed backend requests or if the SSE connection drops.
3. **Integration Tests**: Develop end-to-end tests to ensure the frontend and backend work seamlessly together.
4. **Internationalization (i18n)**: Make the application available in multiple languages.
5. **New Features**: Integrate user authentication, allow users to save their favorite generated storybooks, or implement a share feature.
