# 🏥 Care Agency Management App

A modern, responsive web application for care agencies to manage caregivers, clients, and scheduling. Built with Next.js 13+, React, TypeScript, and Tailwind CSS.

## ✨ Features

### Core Functionality
- **Caregiver Management**: View all caregivers with contact information
- **Client Management**: Track client details and addresses
- **Shift Scheduling**: Create and manage care shifts
- **Conflict Prevention**: Automatic detection of scheduling conflicts
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### User Experience
- **Loading States**: Professional loading indicators during data operations
- **Error Handling**: User-friendly error messages with retry functionality
- **Form Validation**: Real-time validation for shift creation
- **Type Safety**: Full TypeScript implementation for reliability

## 🛠 Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + useReducer
- **Forms**: React Hook Form
- **Mock Data**: Custom singleton service
- **API Simulation**: Custom service with configurable delays

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** 18.0 or higher
- **npm** 9.0 or higher (or yarn/pnpm)
- **Git** for version control

### System Requirements
- **Operating System**: macOS, Windows, or Linux
- **Memory**: 4GB RAM minimum (8GB recommended)
- **Storage**: 1GB free space
- **Browser**: Modern browser with ES6+ support (Chrome, Firefox, Safari, Edge)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd care-agency-app
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Start Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 4. Open Application
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run TypeScript type checking
npm run type-check

# Run linting
npm run lint
```

### Development Notes
- **Mock Data**: The app uses simulated data with configurable delays (1-2 seconds)
- **Type Checking**: TypeScript errors will show in the terminal and browser

## 📁 Project Structure

```
src/
├── app/                          # Next.js 13+ App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page (caregiver list)
│   └── schedule/                # Schedule management
│       └── [carerId]/           # Dynamic caregiver routes
│           ├── page.tsx         # Individual caregiver schedule
│           └── new/             # New shift creation
│               └── page.tsx     # Shift creation form
├── components/                   # Reusable UI components
│   ├── ui/                      # UI component library
│   │   ├── Button.tsx          # Reusable button component
│   │   ├── FormField.tsx       # Form field wrapper
│   │   ├── LoadingState.tsx    # Loading indicator
│   │   └── ErrorState.tsx      # Error display
│   ├── Spinner.tsx             # Loading spinner
│   └── ClientOnly.tsx          # Client-side wrapper
├── context/                     # State management
│   └── ShiftContext.tsx        # Global state and API calls
├── lib/                         # Utilities and data
│   └── data.ts                 # Mock data service and types
└── services/                    # API layer
    └── api.ts                  # Mock API service
```

## 🤔 Assumptions

### Business Logic Assumptions
1. **Care Agency Model**: Single agency managing multiple caregivers and clients
2. **Shift Scheduling**: One caregiver per shift, one client per shift
3. **Time Zones**: All times are in the local timezone of the agency
4. **Conflict Prevention**: Caregivers cannot have overlapping shifts
5. **Data Persistence**: Currently using mock data 

### Technical Assumptions
1. **User Authentication**: Not implemented (assumes single-user or admin access)
2. **Real-time Updates**: Not implemented (page refresh required for updates)
3. **Data Validation**: Client-side validation
4. **Mobile Usage**: Responsive design for mobile devices
5. **Browser Support**: Modern browsers with ES6+ support

### User Experience Assumptions
1. **Primary Users**: Care agency administrators and schedulers
2. **Workflow**: View caregivers → Select caregiver → View/manage schedule → Create shifts


**Built with ❤️ for care agencies**
