🏠 PropertyPulse
Live Site URL:** https://pro-fast-curier.web.app/

 📜 Features

- **Real Estate Platform**: A comprehensive platform for buying, selling, and reviewing real estate properties, with user, agent, and admin roles.
- **User Registration/Login**: Secure authentication system with email/password-based login and JWT-based session management.
- **Responsive Design**: Fully responsive UI for mobile, tablet, and desktop users.
- **Property Listing**: Easily view and filter properties based on location, price range, and agent.
- **Wishlist**: Users can save their favorite properties in a wishlist.
- **Property Reviews**: Users can leave reviews on properties they view, with an option to read other reviews.
- **Agent Dashboard**: Agents can manage their properties, view offers, and track their sales.
- **Admin Dashboard**: Admins can manage users, properties, reviews, and perform role-based actions (make admin, make agent, etc.).
- **Offer System**: Users can place offers on properties. Agents can accept or reject these offers, with status updates for the user.
- **Stripe Payment Integration**: After an offer is accepted, users can pay for the property through Stripe, making the purchase process seamless.
- **Search & Sort**: Search properties by location and filter by price range to easily find the best options.

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/propertypulse.git
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Build the project for production:

   ```bash
   npm run build
   ```

5. Preview the built project:

   ```bash
   npm run preview
   ```

## 🛠️ Technologies Used

* **Frontend:**

  * React.js (for building the UI)
  * Vite.js (for fast builds and efficient development)
  * TailwindCSS (with daisyUI for components and styling)
  * React Hook Form (for handling forms)
  * React Query (for data fetching and mutation handling)
  * Stripe (for secure payment integration)
  * SweetAlert2 (for custom alerts and toasts)
  * Recharts (for visualizing agent statistics)
* **Backend:**

  * Firebase Authentication (for user registration and authentication)
  * MongoDB (for storing properties, offers, reviews, and other data)
  * Node.js with Express (for the backend API)

## 🔑 Configuration

1. Set up your `.env` file with your Firebase credentials and MongoDB connection string.

2. The `.env` file should contain the following:

   ```env
   REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
   REACT_APP_MONGODB_URI=your-mongodb-uri
   ```

3. Ensure sensitive credentials are hidden from public view using environment variables.

## 📝 Notes

* This project supports **3 user roles**: **User**, **Agent**, and **Admin**.
* **Admins** can verify/reject properties, manage users, and oversee reviews.
* **Agents** can add properties, view their offers, and track sold properties.
* **Users** can wishlist properties, make offers, and leave reviews.

## 🚀 Future Improvements

* Implement **email verification** and **password reset** functionality for better user security.
* Add **advanced search filters** (e.g., property type, number of bedrooms, amenities).
* Integrate other payment systems besides **Stripe** (e.g., PayPal).
* Improve **analytics and tracking** for agents and admins, including property view statistics.

## 🤝 Contributing

Feel free to fork this project and create pull requests for any improvements or bug fixes. Please make sure to follow the coding conventions and guidelines used in this repository.

**Happy coding!** 🎉


