# 🇮🇳 Press India

Press India is a next-generation hybrid platform merging verified citizen journalism with civic action. Built as a secure, intellectual social network, it empowers citizens to report local news, raise civic grievances, and crowdfund verified social initiatives.

## ✨ Core Features

* **📰 Citizen Journalism:** A robust editor allowing users to write, submit, and publish local news reports.
* **🗣️ Make into News (Grievance System):** A public forum where citizens can highlight civic issues, gather community upvotes, and force accountability.
* **🤝 Verified Initiatives:** A transparent crowdfunding system for social causes, legal funds, and startups, protected by strict KYC and moderation.
* **🛡️ Admin Moderation Queue:** A comprehensive super-admin dashboard for reviewing pending content, managing user roles, and ensuring platform integrity.
* **📈 Real-Time Impact Metrics:** Live tracking of active cases and platform engagement, optimized using pseudo-Redis local caching for cost efficiency.

## 🛠️ Tech Stack

* **Frontend:** React 19, Tailwind CSS, Framer Motion (for fluid UI/UX)
* **Routing:** React Router v6
* **State Management:** Redux Toolkit & React Context
* **Backend/Database:** Google Firebase (Firestore, Authentication, Storage)
* **Build Tool:** Vite

## 🚀 Getting Started

### Prerequisites
* Node.js (v18 or higher)
* A Firebase Project configured with Authentication, Firestore, and Storage.


2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Firebase configuration keys:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```

## 🔒 Security & Compliance

Press India operates purely as a technology intermediary. The platform features atomic database transactions (`increment`, `arrayUnion`) to prevent race conditions and strict `firestore.rules` to ensure data integrity and prevent unauthorized modifications to user-generated content or funding amounts.

## 📄 License

This project is proprietary. All rights reserved by Dunstom Tech.
```

