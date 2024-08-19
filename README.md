  📍Project Name: StaffMan📍
  
  Description: ⤵️
StaffMan is a small-scale project aimed at managing personnel using modern web development technologies. The project demonstrates the integration of SOLID principles, CRUD operations, and Ocelot for gateway implementation on the backend, combined with React for the frontend.

  Key Features: ⤵️
  
  Backend:
  
✔️Built with Asp.Net Core.

✔️Implements SOLID principles for a clean and maintainable codebase.

✔️CRUD operations for managing personnel data.

✔️JWT Tokens are used for secure authentication and authorization.

✔️Ocelot is used for efficient API gateway management, routing, and request aggregation.

  Frontend:
  
✔️Built with React.

✔️Simple and clean user interface using Material-UI.

✔️React Router is used for seamless navigation across the application.

✔️Provides a user-friendly experience with a responsive design.


  Installation: ⤵️
  
  Clone the repository:
git clone https://github.com/MarkoSavka/AspNetCoreProj.git

  Navigate to the project directory:
cd AspNetCoreProj

  Backend setup:
Ensure you have the .NET SDK installed.

  Navigate to the backend project directory and restore the necessary packages:
- cd Backend
- you need to add your appseting.json file with db connection and your security key for JWT token
- dotnet restore
- dotnet build
- dotnet run

  Frontend setup:
Ensure you have Node.js and npm installed.

  Navigate to the frontend project directory and install dependencies:
- cd Frontend
- npm install
- npm start

  Usage: ⤵️
  
After setting up, you can access the application in your web browser at http://localhost:3000. The frontend connects seamlessly with the backend, allowing you to perform CRUD operations on personnel data with a responsive and intuitive UI. And don’t forget that only users with the Administrator role can add, delete, and change.

  Contributing: ⤵️
  
Feel free to contribute to StaffMan by submitting pull requests, reporting issues, or suggesting improvements.
