import React from "react";
import NavigationComponent from "../Components/HomePageComponent/NavigationComponent";

export default function HomePage() {
  return (
    <div>
      <NavigationComponent />
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="display-4 mb-4">
              Welcome to File Management System
            </h1>
            <p>
              File Management System is a powerful tool for managing and
              organizing your digital files. Whether you need to upload,
              organize we've got you covered.
            </p>
            <p>Here's how to get started:</p>
            <ul>
              <li>Login/Register first</li>
              <li>Go to Dashboard</li>
              <li>Click "Upload" to add files to your system.</li>
              <li>Create folders to keep your files organized.</li>
              <li>Click on a file to view or edit it.</li>
            </ul>
          </div>
          <div className="col-lg-6">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/file-management-system-62d4a.appspot.com/o/fileManagement.jpg?alt=media&token=a1857b60-1210-4eaf-b1e3-63bb47f96a7c&_gl=1*1kz5nw0*_ga*MTU0Nzk6Njk3MDMzNzUy*_ga_CW55HF8NVT*MTY5ODU3MDM2OC4yOC4xLjE2OTg1NzE4MjEuNjAuMC4w"
              alt="File Management System"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
      <footer className="bg-dark text-light text-center py-2">
        <p>&copy; 2023 All rights reserved by Manthan.</p>
      </footer>
    </div>
  );
}
