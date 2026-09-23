# Tamasha Frontend Developer Assessment: Multi-Step Onboarding Wizard

A production-quality, human-written **4-Step Multi-Step Onboarding Wizard** built with **React (Create React App)**, **Plain CSS**, and the **Context API**.

---

## 🚀 Getting Started

### Prerequisites

* **Node.js:** Ensure Node.js (>= 16) is installed on your machine.
* **npm:** Version 8 or higher.

### Quick Start

1. Navigate to the project directory:
   ```bash
   cd E:\Projects\assessment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

   The app will automatically open at [http://localhost:3000](http://localhost:3000) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

---

## 🛠️ Tech Stack & Architecture

* **Framework:** React 18 (Create React App with `react-scripts`)
* **Language:** JavaScript (ES6+ / `.js` files)
* **Styling:** Plain CSS (Modular files inside `src/styles/` without `.module.css`)
  * `global.css`: CSS custom properties, layout wrappers, reset, navigation buttons.
  * `stepper.css`: Horizontal progress stepper circles, connector lines, active/completed states.
  * `form.css`: Form inputs, floating labels, validation error alerts, draft indicator.
  * `review.css`: Review summary cards, badges, and quick-edit buttons.
  * `pages.css`: Step 2 radio cards, Step 3 conditional tech checkboxes, and Step 4 confirmation card.
* **State Management:** React Context API (`FormContext.js`)
* **Persistence:** `localStorage` with 500ms debouncing (`tamasha_onboarding_draft`)
* **Strict Constraints Maintained:**
  * ❌ No Vite
  * ❌ No Redux
  * ❌ No Tailwind CSS
  * ❌ No TypeScript
  * ❌ No Next.js
  * ❌ No Bootstrap / Material UI
  * ❌ No animation libraries
  * ❌ No toast notification libraries
  * ❌ No icon libraries (pure inline SVGs only)

---

## 📁 Project Structure

```text
tamasha-onboarding/
├── package.json
├── README.md
├── public/
│   └── index.html
└── src/
    ├── components/
    │   ├── Stepper.js
    │   ├── DraftIndicator.js
    │   ├── FormField.js
    │   └── ReviewCard.js
    ├── context/
    │   └── FormContext.js
    ├── pages/
    │   ├── Step1.js
    │   ├── Step2.js
    │   ├── Step3.js
    │   └── Step4.js
    ├── utils/
    │   ├── validation.js
    │   └── techOptions.js
    ├── styles/
    │   ├── global.css
    │   ├── stepper.css
    │   ├── form.css
    │   ├── review.css
    │   └── pages.css
    ├── App.js
    └── index.js
```

---

## 📋 Features & Functional Specifications

### Step 1: Personal Information
* **Fields:** Full Name (required), Email Address (required), Portfolio / GitHub URL (optional).
* **Validation:** Inline errors only appear on field blur or when clicking "Next Step". Errors do not trigger while typing.

### Step 2: Preferences
* **Options:**
  * **Primary Track:** Frontend, Backend, Fullstack, UI/UX Design.
  * **Experience Level:** Junior, Mid, Senior.
* **Interactive Radio Cards:** Purple active border (`#6D5EF5`), soft purple background (`#F5F3FF`), and keyboard navigation (Tab, Space, Enter).
* **Auto-Clear Rule:** If the user switches their track, any previous selections in Step 3 are automatically reset.

### Step 3: Tech Stack (Conditional)
* Dynamically displays tech stack options matching the chosen track:
  * **Frontend:** React, Vue, TypeScript, CSS Modules
  * **Backend:** Node.js, Python/Django, PostgreSQL, Redis
  * **Fullstack:** React, Node.js, MongoDB, TypeScript
  * **UI/UX Design:** Figma, Storybook, Design Systems
* At least one technology must be selected to proceed.

### Step 4: Review & Submit
* Elegant review cards displaying Personal Information, Preferences, and Tech Stack badges.
* Each card includes an **Edit** button that navigates directly to that step.
* **Submit Action:**
  * Logs the entire `formData` object to the browser console (`F12` > Console).
  * Removes `tamasha_onboarding_draft` from `localStorage`.
  * Displays an "Application Submitted!" confirmation view.

---

## 💾 Auto-Save & Debounce

* Implements a **500ms debounced** auto-save mechanism using `setTimeout` and cleanup in `useEffect`.
* Saves state under `tamasha_onboarding_draft` in `localStorage`.
* Restores user input and active step automatically on page refresh.
* Displays a live **"Draft Saved"** indicator with a green checkmark.
