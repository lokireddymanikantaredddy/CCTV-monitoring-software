# SecureSight Dashboard – Fullstack Developer Intern Technical Assessment (July '25)

## Overview
SecureSight is a fictional CCTV monitoring dashboard. This project is a technical assessment for a Fullstack Developer Intern role. The dashboard allows you to view up to 3 CCTV feeds, see detected incidents (e.g., unauthorized access, gun threats), and resolve them. It is built with Next.js 15 (App Router), Prisma, and SQLite.

## Features
- **Navbar**: Modern, Figma-accurate navigation bar.
- **Incident Player**: Large video/image frame with overlays and camera thumbnails.
- **Incident List**: Scrollable, fixed-width list of incidents with colored icons, thumbnails, and optimistic resolve button.
- **Interactive Timeline**: 24-hour SVG/Canvas timeline with draggable scrubber and colored event blocks (optional/extra credit).
- **API**: RESTful endpoints for fetching and resolving incidents.
- **Seed Script**: Populates the database with realistic cameras and incidents.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS, React Icons
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: SQLite (local file)

## Setup Instructions

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd <project-folder>
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up the database**
   ```sh
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

4. **Run the development server**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000)

## API Endpoints
- `GET /api/incidents?resolved=false` – Get unresolved incidents (newest first)
- `PATCH /api/incidents/:id/resolve` – Flip resolved status and return updated row

## Project Structure
- `/src/app/components/` – All React components (Navbar, IncidentPlayer, IncidentList, TimelineWidget, ControlBar)
- `/src/app/api/` – Next.js API routes
- `/prisma/` – Prisma schema and seed script
- `/public/` – Static assets (icons, thumbnails)

## Customization
- **Add/Change Cameras or Incidents**: Edit the seed script in `/prisma/seed.ts` and re-run the seed command.
- **Change Timeline Events**: Update the event data in `TimelineWidget.tsx`.
- **Icons**: Replace icons in `/public` or use different React Icons.

## Optional/Extra Credit
- **Interactive Timeline**: Already implemented (draggable scrubber, colored event blocks).
- **3D Website in React Three Fibre**: Not implemented (optional).

## Notes
- No authentication or real-time features are required for this assessment.
- The UI is designed to closely match the provided Figma design.
- The app is fully responsive and works in all modern browsers.

## License
This project is for technical assessment and educational purposes only.
