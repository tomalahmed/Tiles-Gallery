# Tiles Gallery

Modern tile catalog and profile app built with Next.js App Router, Better Auth, and MongoDB.

## Features

- Responsive marketing + catalog pages
- Search, filter, and sort tile listings
- Tile detail pages with image support
- Authentication with Better Auth (email/password + Google OAuth)
- Protected profile and profile update pages
- Mobile navbar with animated menu and Font Awesome icons

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Better Auth
- MongoDB
- Font Awesome

## Project Structure

```text
src/
  app/
    (marketing)/           # Home and marketing pages
    (catalog)/             # All tiles + tile details
    (auth)/                # Login and register pages
    my-profile/            # Protected profile pages
    api/auth/[...all]/     # Better Auth API route
  components/
    auth/                  # Login/register forms
    layout/                # Navbar, footer
    home/                  # Home page sections
    tiles/                 # Catalog UI pieces
    profile/               # Profile update form
    ui/                    # Reusable UI primitives
  lib/
    auth.js                # Better Auth server config
    auth-client.js         # Better Auth client
    server-session.js      # Server-side session helper
    mongodb.js             # MongoDB connection
    tiles-db.js            # Local JSON tile data reader
    tiles-service.js       # Search/filter/sort helpers
  db/db.json               # Tile seed/catalog data
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Create environment file

Create `.env.local` in project root:

```env
# Better Auth
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# MongoDB
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=tiles_gallery

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3) Run development server

```bash
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - start dev server
- `npm run build` - build for production
- `npm run start` - run production server
- `npm run lint` - run ESLint

## Main Routes

- `/` - marketing home page
- `/all-tiles` - catalog page (search/filter/sort)
- `/tiles/[tileId]` - tile details page
- `/login` - login
- `/register` - registration
- `/my-profile` - protected profile page
- `/my-profile/update` - protected profile update page

## Notes

- Keep `BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL` identical to your app origin.
- Remote images are allowed from:
  - `images.unsplash.com`
  - `source.unsplash.com`
  - `picsum.photos`
  - `lh3.googleusercontent.com`

## Security

- Do not commit real secrets to git.
- If any secret was exposed, rotate it immediately (auth secret, MongoDB URI, OAuth credentials).
