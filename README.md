eeeresources jntugv
eeeresources jntugv is a centralized academic platform developed specifically for the Electrical & Electronics Engineering (EEE) department at JNTU-GV.

This project addresses the fragmentation of academic materials by consolidating lecture notes, previous question papers, and lab manuals into a single, searchable digital library. It eliminates the reliance on scattered WhatsApp groups and isolated Google Drive links, ensuring students have reliable access to curriculum resources.

Core Features
For Students (Public Access)
Comprehensive Library: A curated repository covering the full four-year EEE curriculum.

Global Search: Integrated Supabase-powered search allows users to instantly filter subjects or locate specific documents.

Structured Navigation: Subjects are categorized by academic year and difficulty level (Basics, Intermediate, Advanced).

Intuitive Interface: A clean, responsive file grid with preview capabilities, designed to resemble familiar cloud storage interfaces.

Mobile Optimization: Fully responsive design ensures accessibility on smartphones and tablets.

Open Access: No authentication is required for viewing or downloading materials, removing barriers to entry.

For Admins (Management System)
Role-Based Access Control (RBAC):

Super Admin: Manages the administrative team and high-level permissions.

Content Admin: Student representatives authorized to upload and organize files for specific academic years.

Admin Dashboard: A central hub for monitoring platform activity.

File Management: A custom UI for uploading, renaming, moving, and deleting files without direct database interaction.

Automated Organization: Uploads are automatically sorted into a structured Subject/Category/Filename hierarchy within cloud storage.

Tech Stack
The platform utilizes a modern, scalable architecture focused on performance and maintainability.

Frontend: Next.js 14 (App Router and Server Components).

Styling: Custom CSS (chosen over frameworks to ensure a lightweight, distinct design).

Backend & Auth: Supabase (PostgreSQL and Row Level Security).

Storage: Supabase Storage (Document hosting).

Deployment: Vercel.

Local Development Setup
Follow these steps to run the project locally for testing or development.
**
1. Clone the Repository**

Bash

git clone https://github.com/Krishna2646/eeeresourcesjntugv.git
cd eeeresourcesjntugv

**2. Install Dependencies**

Bash

npm install
**3. Configure Environment Variables**

Create a .env.local file in the root directory. You will need credentials from your own Supabase project.

Code snippet

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url # you have to enter Ur project url to view actual changes in backend and ive provided sql settings below 
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

**4. Run the Development Server**

Bash

npm run dev
Access the application at http://localhost:3000.

Database Architecture
The backend relies on a relational PostgreSQL schema managed via Supabase.

Tables
subjects: Stores curriculum data.

Schema: id (int8), name (text), level (int2 - determines UI color coding).

resources: Stores metadata for uploaded files.

Schema: id (int8), file_name, file_url, file_type, category, subject_id (Foreign Key).

user_roles: Manages administrative permissions.

Schema: id (uuid, links to auth.users), role ('admin' or 'super_admin').

Security
Row Level Security (RLS) is enforced on all tables:

Public: SELECT access for subjects and resources.

Admins: INSERT, UPDATE, and DELETE access for resources.

Super Admins: Full management access to the user_roles table.

Contributing
Contributions to the codebase are welcome. If you wish to improve the UI, fix bugs, or add features:

Fork the repository.

Create a feature branch (git checkout -b feature/NewFeature).

Commit your changes (git commit -m 'Add NewFeature').

Push to the branch (git push origin feature/NewFeature).

Open a Pull Request for review.

Note: If you wish to contribute by uploading notes rather than coding, please contact the project maintainer to request Content Admin access.

License
Distributed under the MIT License. See LICENSE for more information.

Built by the EEE Students of JNTU-GV
