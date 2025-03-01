## CodeVue – AI-Powered Interview Management Platform 🚀

###  Interview Management Web App designed to streamline the hiring process for organizations. It enables seamless interview scheduling, live coding sessions, role-based access, feedback management, and more.

#### 🌟 Features
✅ Role-Based Access – Admins can assign Candidate or Interviewer roles.<br>
✅ Instant & Scheduled Interviews – Start a meeting instantly or schedule a future interview.<br>
✅ Automated Email Invites – Candidates receive email invitations with join links.<br>
✅ Built-in Code Editor – Monaco Editor with selected coding questions.<br>
✅ Live Video & Screen Sharing – Seamless video conferencing with screen-sharing capabilities.<br>
✅ Interview Recording – Review past interviews from the recordings page.<br>
✅ Feedback System – Interviewers can rate candidates and share feedback.<br>
✅ Candidate Dashboard – Candidates can track their interviews & results.

#### 🛠 Tech Stack
Frontend: Next.js, TypeScript<br>
Backend: Convex<br>
Authentication: Clerk<br>
Video Conferencing: Stream<br>
Editor: Monaco Editor<br>
Email Service: MailJet<br>

### 🚀 Getting Started
#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/swarnab007/codevue.git
cd codevue
```

#### 2️⃣ Install Dependencies
```bash
npm install
```

#### 3️⃣ Configure Environment Variables
Create a .env.local file in the root directory and add:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_new_clerk_public_key
CLERK_SECRET_KEY=your_new_clerk_secret_key
CONVEX_DEPLOYMENT=your_new_convex_deployment
NEXT_PUBLIC_CONVEX_URL=your_new_convex_url
NEXT_PUBLIC_STREAM_API_KEY=your_new_stream_api_key
STREAM_API_SECRET=your_new_stream_api_secret
CLERK_ISSUER_URL=your_new_clerk_issuer_url
CLERK_WEBHOOK_SECRET=your_new_clerk_webhook_secret
MAILJET_API_PUBLIC_KEY=your_new_mailjet_public_key
MAILJET_API_PRIVATE_KEY=your_new_mailjet_private_key
```

#### 4️⃣ Start the Development Server
```bash
npm run dev
```

The app will be running at http://localhost:3000

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

#### 🤝 Contributing
Contributions are welcome! Feel free to:
  - Fork the repo.
  - Create a new branch (feature-branch).
  - Submit a Pull Request (PR).




## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- Convex Docs : https://docs.convex.dev/home
- Clerk Docs : https://clerk.com/docs
- Stream Docs : https://getstream.io/video/docs/api/
