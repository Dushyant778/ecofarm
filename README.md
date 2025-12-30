# EcoFarm Project Documentation

This comprehensive documentation details every file, component, and utility function within the EcoFarm application. The application is a React-based platform designed to assist farmers with AI-driven insights, crop management, and financial planning.

---

## 1. **src/components/About.jsx**

### **Overview**
The `About.jsx` file renders the "About Us" page of the EcoFarm application. Its primary purpose is to communicate the mission, vision, and core values of the platform to the user. It serves as a static yet highly interactive information hub that builds trust with the user by showcasing the platform's capabilities and the team's dedication to agricultural innovation.

### **Architecture & State Management**
This component is largely presentational but utilizes `React.useState` for managing the state of interactive UI elements, such as expandable cards or FAQ sections. It leverages `framer-motion` for complex entrance animations to ensure the page feels modern and responsive. The component does not maintain complex global state but focuses on local UI state to handle hover effects and scroll-triggered animations.

### **Key Features & Functionality**
-   **Mission Statement Display**: Prominently features the core mission of "Empowering Farmers through Technology," using large typography and hero images.
-   **Feature Highlights**: A grid layout displaying the key pillars of the platform—Sustainability, Technology, and Community. Each pillar is represented by an icon (using `lucide-react`) and a descriptive paragraph.
-   **Team Section**: Displays profile cards for the development team or organization members.
-   **Responsive Design**: The layout automatically adjusts from a multi-column grid on desktop to a stacked vertical layout on mobile devices using Tailwind CSS responsive modifiers (`md:grid-cols-2`, `lg:grid-cols-3`).

### **UI/UX Design**
The design uses a calming color palette of greens and earth tones to reflect the agricultural theme. `Framer-motion` is used to trigger "fade-in-up" animations as the user scrolls down the page, keeping the content engaging. Shadows are soft (`shadow-lg`), and borders are rounded (`rounded-2xl`) to create a friendly, accessible aesthetic.

---

## 2. **src/components/ChatAssistant.jsx**

### **Overview**
`ChatAssistant.jsx` is a critical interactive component that provides an AI-powered chat interface. It acts as a virtual agricultural expert, allowing farmers to ask natural language questions about crops, pests, soil health, and weather. This component bridges the gap between complex agricultural data and the farmer by providing instant, easy-to-understand answers.

### **Architecture & State Management**
-   **State**: Uses `useState` to manage the array of chat messages (`messages`), current input value (`input`), and loading state (`isLoading`).
-   **Integration**: Directly imports `getAIResponse` from `../utils/geminiAPI` to handle the asynchronous communication with the Google Gemini AI.
-   **Effect Hooks**: May use `useEffect` to scroll the chat window to the bottom whenever a new message is added.

### **Key Features & Functionality**
-   **`handleSend`**: This asynchronous function is the core driver. It creates a user message object, updates the state to show the user's input immediately, and then calls the API. Upon receiving a response, it appends the AI's reply to the message history.
-   **`handleKeyPress`**: A usability feature that allows users to submit their query by pressing the "Enter" key, mimicking standard chat applications.
-   **Loading Indicators**: Visual feedback (e.g., "AI is typing...") is displayed while the API request is in flight, ensuring the user knows the system is processing their request.
-   **Error Handling**: If the API fails, the component gracefully catches the error and displays a user-friendly message in the chat stream instead of crashing.

### **UI/UX Design**
The chat interface mimics popular messaging apps with distinct bubble styles for user messages (aligned right, blue/green) and AI responses (aligned left, gray/white). It features a fixed-height scrollable container and a sticky input area at the bottom.

---

## 3. **src/components/CostCalculator.jsx**

### **Overview**
The `CostCalculator.jsx` (exported as `AdvancedCostCalculator`) is a financial planning tool designed to help farmers estimate the cost of cultivation. By analyzing various inputs—seeds, labor, fertilizers, and irrigation—it provides a coherent visual breakdown of expenses, aiding in budget management and profitability analysis.

### **Architecture & State Management**
-   **Data Model**: Contains a static database of crop profiles (`cropDB`) with default cost factors per unit area.
-   **State**: Manages the selected crop, input values for each cost category, and the calculated totals.
-   **Visualization**: Integrates `recharts` to render a BarChart that dynamically updates as the user modifies input values.

### **Key Features & Functionality**
-   **`handleCalculate`**: Aggregates the costs from all input fields. It applies logic to sum up values such as `seedCost + fertilizerCost + laborCost`.
-   **`handleChange`**: A dynamic input handler that updates the specific cost factor in the state array without mutating the original reference, ensuring React re-renders correctly.
-   **Dynamic Graphing**: The component transforms the raw numeric data into a format suitable for the `recharts` library, rendering a bar graph where the X-axis represents cost categories (Labor, Seeds, etc.) and the Y-axis represents cost in currency.
-   **Interactive Sliders/Inputs**: Users can adjust default values to match their specific local prices.

### **UI/UX Design**
Designed as a dashboard widget, it splits the screen between the input form and the visualization result. It uses a card-based layout with clear labels and input validation to prevent negative numbers.

---

## 4. **src/components/CropRecommendation.jsx**

### **Overview**
`CropRecommendation.jsx` is a decision-support module. It takes environmental inputs from the user (soil type, nitrogen/phosphorus/potassium levels, rainfall, season) and filters a database of crops to recommend the scientifically best options. This helps farmers diversify their crops and choose those best suited for their specific land conditions.

### **Architecture & State Management**
-   **Database**: Contains a `expandedCropDB` array with detailed objects for each crop, including properties like `soil`, `idealRain`, `season`, `yield`, and `marketPrice`.
-   **State**: Tracks user selections for soil type, season, and rainfall range.
-   **Logic**: Uses extensive filtering logic (array `.filter()` and `.find()`) to match user conditions against the crop database.

### **Key Features & Functionality**
-   **`handleRecommend`**: The primary logic function. It iterates through the crop database and returns items where the crop's requirements overlap with the user's selected parameters.
-   **Detailed Cards**: For each recommended crop, the component renders a card showing projected yield (`qtl/ha`) and potential market price, helping the farmer make economic decisions alongside agronomic ones.
-   **Filtering System**: Supports multi-criteria filtering. For example, a user can search for "Clay" soil crops suitable for "Winter" (Rabi) season.

### **UI/UX Design**
The results are displayed in a responsive grid. Each card uses color-coding to indicate suitability or season. Transitions are smooth when the list of recommendations updates.

---

## 5. **src/components/Crops.jsx** (Farmer Calendar App)

### **Overview**
Despite its name, `Crops.jsx` acts as a full-fledged **Farmer Calendar & Training App**. It is a sophisticated tool for planning agricultural activities across the year. It allows farmers to visualize tasks month-by-month, filter based on their farming scenario (Irrigated vs. Rain-fed), and export their plan for offline use.

### **Architecture & State Management**
-   **Complex State**: Uses `useState` for the calendar items list, active filters, search query, view mode (Grid/List/Print), and modal visibility.
-   **Persistence**: Uses `useEffect` to sync the calendar state with `localStorage`, ensuring data persists across browser reloads.
-   **PDF Generation**: Heavily relies on `html2canvas` and `jsPDF` to take a snapshot of the DOM and generate a high-quality, multi-page PDF document.

### **Key Features & Functionality**
-   **`exportPDF`**: A technically complex function that renders a hidden "Printable" view, rasterizes it onto a canvas, calculates page breaks, and generates a PDF file.
-   **`downloadCSV`**: Converts the JSON calendar data into a Comma Separated Values string and triggers a file download using `file-saver`.
-   **CRUD Operations**: Includes functions to `addNew` events, `updateItem` (edit existing events), and `removeItem` (delete events).
-   **`FilterBar` Component**: A sub-component that handles the UI for switching between "All", "Irrigated", and "Rain-fed" scenarios, effectively filtering the visible month cards.

### **UI/UX Design**
This component features a highly functional interface with a top toolbar for actions (Search, Add, Export). The main view can toggle between a card grid and a detailed list. The "Print Preview" mode strips away interactive buttons to show exactly how the paper version will look.

---

## 6. **src/components/Dashboard.jsx**

### **Overview**
`Dashboard.jsx` is the central command center of the EcoFarm application. It aggregates all other functionalities into a single, cohesive interface. It provides real-time weather updates, quick stats, and navigation to specific tools like the Crop Recommendation system or Market Prices.

### **Architecture & State Management**
-   **Module Management**: Uses a state variable `openModule` to track which sub-component (e.g., `CropRecommendation`, `MandiPrice`) is currently active/expanded in the main view.
-   **Weather API Integration**: Contains a `fetchWeather` function that calls the WeatherAPI to get real-time temperature, humidity, and wind speed for the user's location.
-   **Animation**: `framer-motion` is used extensively for "staggered" entrance animations of the dashboard cards.

### **Key Features & Functionality**
-   **`fetchWeather`**: Asynchronous function that fetches data from `api.weatherapi.com`. It handles loading states and errors (e.g., if the city is not found).
-   **Module Toggle**: Clicking a card (e.g., "Crop AI") triggers `toggleModule`, which dynamically renders the corresponding imported component within an `AnimatePresence` block for smooth transitions.
-   **Live Stats**: Displays a row of key performance indicators (KPIs) like "Active Farms", "Profit Margin", etc., which are currently mocked but structured to be connected to a backend.

### **UI/UX Design**
The dashboard uses a glassmorphism effect (translucent backgrounds with blur) over a gradient background. It is highly responsive, moving from a single column on mobile to a 4-column grid on large screens. Icons are centrally featured to make navigation intuitive for users with varying literacy levels.

---

## 7. **src/components/DiseaseDetection.jsx**

### **Overview**
Currently a placeholder/prototype module, `DiseaseDetection.jsx` is intended to be the interface for the computer vision functionality. Its future purpose is to allow users to upload photos of crop leaves and receive a diagnosis of potential diseases using an image classification model.

### **Architecture & State Management**
-   **Current State**: Static component returning a "Under Development" UI.
-   **Planned State**: Will eventually manage file upload state (`selectedImage`), analysis status (`analyzing`), and result data (`diseaseName`, `confidenceScore`).

### **Key Features & Functionality**
-   **Blueprint**: Reserved for future integration with the `getAIResponseWithImage` function from the Gemini utility.
-   **UI Placeholder**: Renders a clean card indicating that the feature is coming soon, managing user expectations.

---

## 8. **src/components/Footer.jsx**

### **Overview**
`Footer.jsx` provides site-wide navigation, rapid access to tools, and engagement features like newsletter signup and language selection. It anchors the bottom of the page with essential links and legal information.

### **Architecture & State Management**
-   **Animation**: Uses `framer-motion` to animate elements into view when the user scrolls to the bottom of the page.
-   **Structural Components**: Divides content into columns: Logo/Mission, Tools Links, Government Links, and Newsletter.

### **Key Features & Functionality**
-   **Quick Ask AI**: Embeds a mini version of the chat input directly in the footer, encouraging users to engage with the AI even if they are at the end of the page.
-   **Scroll to Top**: Includes a floating button that smoothly scrolls the window back to the top of the viewport.
-   **Language Selector**: A dropdown menu allowing users to theoretically switch the application language (English, Hindi, etc.).

### **UI/UX Design**
Uses a dark theme (`bg-gray-900`) to visually distinguish it from the main content. It features a decorative "wave" SVG at the top to create a fluid, organic transition from the body of the page.

---

## 9. **src/components/GovtSchemeMatcher.jsx**

### **Overview**
`GovtSchemeMatcher.jsx` is a powerful logic-driven component that connects farmers with government aid. It contains a comprehensive database of Indian government agricultural schemes and uses a rule-based engine to determine user eligibility.

### **Architecture & State Management**
-   **Scheme Database**: A large array of objects (`schemes`), each defining strict eligibility criteria (`minAge`, `maxLand`, `requiresBank`, etc.).
-   **Form State**: Manages a complex form with inputs for Age, Land Size, Farmer Type, State, Caste, etc.
-   **Memoization**: Uses `useMemo` to recalculate the "matches" array whenever the form input changes, ensuring high performance even with many schemes.

### **Key Features & Functionality**
-   **`schemeMatches` Helper**: A pure function that takes a scheme object and the user form data, returning `true` or `false` based on boolean logic (e.g., `if (form.age < scheme.minAge) return false`).
-   **Scoring Logic**: Beyond simple matching, it calculates a "relevance score" to sort schemes that are the best fit for the user to the top of the list.
-   **Dynamic Search**: A search bar filters the resulting list of schemes by name or benefit text.
-   **Details Expansion**: Users can toggle details for each scheme to see specific benefits and required documents.

### **UI/UX Design**
The interface is split into a "Farmer Profile" sidebar (or top section on mobile) and a "Schemes List" main area. Eligible schemes are highlighted with green badges, while ineligible ones are grayed out or marked clearly.

---

## 10. **src/components/Header.jsx**

### **Overview**
`Header.jsx` is the primary navigation component. It ensures users can access different parts of the application (Home, Dashboard, Tools) from anywhere. It handles responsive navigation (hamburger menu) and theme toggling.

### **Architecture & State Management**
-   **State**: Tracks `isMenuOpen` for the mobile navigation drawer and `isDarkMode` for the theme state.
-   **Routing**: Uses `Link` from `react-router-dom` to facilitate client-side navigation without page reloads.

### **Key Features & Functionality**
-   **`toggleDarkMode`**: Modifies the `document.documentElement` class list to add/remove the 'dark' class, triggering Tailwind's dark mode styles globally.
-   **Mobile Menu**: A responsive implementation that shows a hamburger icon on small screens and expands a drawer/modal with navigation links when clicked.
-   **Active Link Styling**: Visually indicates the current page the user is on.

### **UI/UX Design**
Features a "sticky" positioning so it remains at the top of the viewport during scrolling. It uses a backdrop blur effect (`backdrop-blur-md`) to ensure text remains readable over scrolling content.

---

## 11. **src/components/Home.jsx**

### **Overview**
`Home.jsx` is the landing page of EcoFarm. It is a marketing-focused component designed to convert visitors into users. It features high-impact visuals, testimonials, and a clear breakdown of features.

### **Architecture & State Management**
-   **Scroll Animations**: Uses `framer-motion` variants to orchestrate complex entrance animations (hero text sliding in, feature cards popping up) as the user traverses the page.
-   **Component Composition**: May include sub-sections like `Hero`, `Features`, `Testimonials`, and `CTA` (Call to Action).

### **Key Features & Functionality**
-   **Hero Section**: Contains the primary value proposition and a "Get Started" button linking to the Dashboard.
-   **Feature Grid**: Icon-rich section explaining the benefits of AI, Cost Calculation, and Schemes.
-   **Testimonials**: Carousel or grid of user stories to build social proof.

### **UI/UX Design**
Designed for maximum visual impact. Uses large typography, generous whitespace, and high-quality imagery (or generative illustrations). The color scheme reinforces the brand identity (Nature/Green/Growth).

---

## 12. **src/components/IrrigationPlanner.jsx**

### **Overview**
`IrrigationPlanner.jsx` helps farmers optimize water usage. It calculates the water needs of a crop based on its growth stage and soil moisture levels, providing a specific recommendation (e.g., "Irrigate 20mm").

### **Architecture & State Management**
-   **Localization**: Contains a `translations` object to support seamless switching between English and Hindi, critical for rural accessibility.
-   **State**: Manages form inputs (Soil Moisture, Crop Stage, Soil Type) and the generated plan.

### **Key Features & Functionality**
-   **`handleSubmit`**: Processes inputs. It might check if `soilMoisture < threshold` for a given crop and generate a warning or an action plan.
-   **`fetchWeather`**: (Optional integration) pulls rainfall forecast to advise users *not* to irrigate if rain is expected.
-   **Language Toggle**: A simple UI switch that updates all text labels in real-time based on the selected locale.

### **UI/UX Design**
Uses a clean, form-based layout. The result is often displayed as a clear, actionable card (e.g., "Status: CRITICAL - Water Immediately") with color-coded alerts (Red/Yellow/Green).

---

## 13. **src/components/MandiPrice.jsx**

### **Overview**
`MandiPrice.jsx` provides market intelligence. It displays the current market rates for various crops, helping farmers decide when and where to sell their produce for maximum profit.

### **Architecture & State Management**
-   **Data Visualization**: Uses `recharts` to render line or bar charts showing price trends over time.
-   **State**: Manages the list of crops and their associated prices (mocked or fetched).
-   **Effects**: Might use `useEffect` to set up a polling interval to "refresh" prices periodically.

### **Key Features & Functionality**
-   **Price Chart**: A LineChart that visualizes price volatility, helping identification of trends.
-   **Refresh Mechanism**: A manual "Refresh" button that simulates fetching new data from an API source.
-   **Trend Indicators**: Visual arrows (Green Up / Red Down) indicating if the price is rising or falling compared to the previous day.

### **UI/UX Design**
Designed to look like a financial ticker or trading dashboard. It uses compact numbers and clear trend colors to convey information quickly.

---

## 14. **src/components/Market.jsx** (Q&A Hub)

### **Overview**
`Market.jsx` is actually an interactive **Community Q&A Forum**. Farmers can post questions, upload images of their crops, and receive answers from the community or the AI. It features voice input to assist users who may prefer speaking over typing.

### **Architecture & State Management**
-   **Voice Recognition**: Directly accesses the browser's `SpeechRecognition` API. It manages event listeners (`onstart`, `onend`, `onresult`) to transcribe spoken audio into the text input field.
-   **State**: Tracks the list of questions (`qaList`), the current question being typed, image attachments, and active category filters.
-   **AI Integration**: Calls `getAIResponse` when a new question is added to provide an immediate "AI Expert" answer while waiting for humans.

### **Key Features & Functionality**
-   **`addQuestion`**: Submits a user query. It generates a temporary "Generating answer..." placeholder, calls the Gemini API, and then updates the question with the AI's response asynchronously.
-   **`startVoice`**: Activates the microphone and listens for speech, populating the textarea in real-time.
-   **Image Handling**: Users can select a file. The component creates a temporary ObjectURL for previewing the image before submission.
-   **Search & Filter**: Clients-side filtering of the question list based on the search string and selected category (Soil, Pests, etc.).

### **UI/UX Design**
A sophisticated, social-media-style feed. Each question is a card with tags for categories. The "Ask" form is prominent and expandable. Voice input is highlighted with a pulsing microphone icon when active.

---

## 15. **src/utils/geminiAPI.js**

### **Overview**
`geminiAPI.js` is the robust utility module that acts as the bridge between the React frontend and Google's Gemini Generative AI. It abstracts away the complexity of making HTTP requests to the AI model, handling authentication, error recovery, and response parsing.

### **Architecture & Design**
-   **Pure JavaScript**: This is a non-React file containing async functions exported for use by components.
-   **Configuration**: Stores the API Key and Endpoints securely (or retrieves them from environment variables).

### **Key Features & Functionality**
-   **`getAIResponse(question)`**: The main entry point. It constructs the JSON payload required by the Gemini API, including the prompt structure (`contents: [{ parts: [{ text: ... }] }]`). It sends a POST request and awaits the JSON response.
-   **`retryWithBackoff`**: A critical reliability feature. If the API fails (e.g., due to rate limiting `429` or server overload `503`), this wrapper function recursively calls the API again after a delay (e.g., 1s, then 2s, then 4s), ensuring high success rates under unstable network conditions.
-   **`getAIResponseWithImage`**: Extends the functionality to support multimodal inputs. It encodes the image as Base64 and sends it alongside the text prompt to the Vision capabilities of the Gemini model.
-   **Error Handling**: specifically catches common failures (Quota Exceeded, Network Error) and returns human-readable error messages to the calling component, preventing app crashes.

---
