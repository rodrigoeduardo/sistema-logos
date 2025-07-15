# Sistema Logos

Sistema Logos is a web application fully adapted and customized for the Logos tabletop role-playing game system, featuring character sheet management with attributes, skills, defenses, dice rolling and more. It provides a modern UI, authentication, and real-time data management. Logos is a tabletop role-playing game (like D&D) developed by Fernando Emboaba and UFRN students. This app aims to be a digital toolset for Logos developers, players and game masters, with every feature specifically designed to support the unique mechanics and rules of the system.

DISCLAIMER: This application was also an experiment made by me (Rodrigo) to build this website mostly using the principles of vibe coding. In other words, I tried to write the least lines of code as I could and use AI to generate, refine and debug code based on prompts.

---

## Features

- **Character Sheet (Ficha de Personagem):**

  - Editable attributes (Força, Constituição, Destreza, etc.) with experience tracking and validation.
  - Defenses and stats with expandable/collapsible sections.
  - Skills management (simple and complex), including prerequisites and dice rolling.
  - Notes section for player annotations.
  - Print and copy/import/export character sheet functionality.
  - Editable sheet title.

- **Dice Rolling:**

  - Integrated 3D dice roller with custom themes.
  - Attribute and skill-based dice rolls, including fortune/critical results.
  - DiceBox component for user-inputted rolls.

- **Moment Tracker:**

  - Track and increment/decrement moments (turns/phases) with automatic switching.

- **Authentication:**

  - Discord login via NextAuth.
  - AuthButton component for login/logout.

- **Manager/Admin Page:**

  - Manage attributes and defenses.
  - Integrate with Firebase for data storage and retrieval.
  - QueryProvider for state management.

- **UI/UX:**
  - Uses Radix UI and custom components for a modern, accessible interface.
  - Tooltips, floating/expandable boxes, and responsive design.
  - Sonner Toaster for notifications.

---

## Technologies Used

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Radix UI, Lucide React
- **State/Data:** React Query, Firebase, NextAuth (Discord)
- **Dice:** @3d-dice/dice-box with custom themes
- **Other:** Sonner (notifications), react-to-print

---

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000)

4. **Environment:**
   - Configure Firebase and NextAuth (Discord) credentials in `.env.local`.

---

## Notable Files & Structure

- `src/app/ficha/page.tsx` — Main character sheet page
- `src/components/sheet/` — Character sheet components (attributes, skills, defenses, dice, notes, etc.)
- `src/constants/` — Game system constants (attributes, skills, dice levels, etc.)
- `src/lib/dice.ts` — Dice rolling logic
- `src/app/page.tsx` — Home page with navigation and authentication

---

## How to Contribute

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to the branch and open a Pull Request

---

## Credits

- Dice 3D assets and themes by Frank Ali
- Built with Next.js, Radix UI, and open-source libraries
