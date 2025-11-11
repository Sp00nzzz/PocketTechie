# Pocket Toxic BF

A satirical single-page web app that mimics the visual and structural style of EMO (the personal robot assistant), but replaces the assistant's personality with a "toxic boyfriend" persona.

## ⚠️ Disclaimer

This is a **satirical parody** intended for humor and educational purposes. It is not intended to trivialize real relationship issues or abuse. If you're experiencing abuse, please seek help from appropriate resources.

## Features

- 🎭 **Four Toxic Moods**: Jealous, Clingy, Gaslight, and Dismissive
- 💬 **Interactive Chat Interface**: Send messages and receive predefined toxic responses
- 🎨 **Futuristic UI**: Clean, minimalist design with soft gradients and subtle animations
- 🎬 **Mood-Based Animations**: Avatar animations change based on selected mood
- 📱 **Responsive Design**: Works on both mobile and desktop devices
- 🎯 **No Backend Required**: All responses are hardcoded, no AI or API calls

## Tech Stack

- **React** + **Vite** - Fast development and build tooling
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Framer Motion** - Animation library for smooth transitions
- **Radix UI** - Accessible component primitives

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── AvatarDisplay.jsx    # Animated avatar component
│   ├── ChatWindow.jsx       # Main chat interface
│   ├── MessageBubble.jsx    # Individual message bubbles
│   └── MoodSelector.jsx     # Mood dropdown selector
├── data/
│   └── responses.js         # Hardcoded toxic responses by mood
├── store/
│   └── useChatStore.js      # Zustand state management
├── App.jsx                  # Main app component
├── main.jsx                 # React entry point
└── index.css                # Global styles
```

## Usage

1. **Select a Mood**: Use the dropdown to choose between Jealous, Clingy, Gaslight, or Dismissive
2. **Send Messages**: Type in the input field and click "Send" or press Enter
3. **Watch Animations**: The avatar animates differently based on the selected mood
4. **Experience Toxicity**: Receive predefined responses that match the toxic behavior patterns

## Customization

### Adding New Responses

Edit `src/data/responses.js` to add new responses for each mood:

```javascript
export const responses = {
  jealous: [
    "Your new response here",
    // ... more responses
  ],
  // ... other moods
};
```

### Modifying Avatar

Edit the SVG in `src/components/AvatarDisplay.jsx` to change the avatar's appearance.

### Adjusting Animations

Modify the `moodVariants` object in `src/components/AvatarDisplay.jsx` to change animation behaviors.

## License

This project is for educational and satirical purposes only.


