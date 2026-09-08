# ⚡ Click Fast!

> A reflex and precision browser game built with Vanilla JavaScript.

## 🎮 About the project

**Click Fast!** is a reflex game where the player must click on a target as quickly and accurately as possible before the timer reaches zero.

The project is developed as a **Single Page Application (SPA)** using HTML, CSS and Vanilla JavaScript.

The goal of this project is to practice and demonstrate fundamental JavaScript concepts such as:

- DOM manipulation
- Event handling
- Game state management
- Timers
- Random positioning
- Form validation
- Local Storage
- Data filtering and sorting
- Responsive design
- Accessibility

---

## 🚀 Features

### Game modes

- **Classic** — Score one point for every successful click.
- **Precision** — Tracks misses and calculates accuracy.
- **Challenge** — The target automatically moves if it is not clicked quickly enough.

### Configuration

The player can configure:

- Player name
- Game mode
- Game duration: 10s, 20s or 30s
- Difficulty: Easy, Medium or Hard
- Sound

### Results

After each game, the player can see:

- Final score
- Best score
- Number of hits
- Number of misses
- Accuracy
- Game configuration
- New record status

### History

The application stores previous games and provides:

- Game history
- Filtering by mode
- Sorting by date or score
- Maximum of 20 saved sessions
- Clear history option

---

## 🛠️ Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage
- Git & GitHub

No framework or library is used for the application logic.

---

## 📁 Project structure

```text
click-fast/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── main.js
│
├── assets/
│   ├── images/
│   └── icons/
│
└── README.md
```

---

## 🧩 Application views

The application contains five main views:

```text
Home
  ↓
Configuration
  ↓
Game Arena
  ↓
Results
  ↓
History
```

The application works as a **SPA**, so navigation between views does not require a full page reload.

---

## 🎯 Game rules

### Classic

- Successful click → `+1`
- Miss → ignored
- Timer → 10s / 20s / 30s
- Target moves after every successful click

### Precision

- Successful click → `+1`
- Miss → `+1 miss`
- Accuracy:

```text
Hits / (Hits + Misses) × 100
```

If there are no hits and no misses:

```text
Accuracy = 0%
```

### Challenge

The target automatically changes position after **1 second** without a successful hit.

A successful hit resets the 1-second countdown.

---

## 💾 Data persistence

The application uses `localStorage`.

### Settings

```text
clickFast.settings
```

Stores the player's configuration.

### Records

```text
clickFast.records
```

Stores the best score for each combination of:

```text
Mode + Difficulty + Duration
```

### History

```text
clickFast.history
```

Stores the last **20 games**.

When a 21st game is added, the oldest game is removed.

---

## 📱 Responsive design

The interface is designed for:

- Desktop
- Tablet
- Mobile

The game arena adapts to smaller screens while keeping the target completely inside the playable area.

Minimum supported layout:

```text
360px
```

---

## ♿ Accessibility

The project follows accessibility best practices, including:

- Semantic HTML
- Labels for form controls
- Keyboard-friendly controls
- ARIA attributes where necessary
- Visible focus states
- Sufficient contrast
- Responsive layout

---

## 🧠 Learning objectives

This project is part of my JavaScript learning journey.

The main objective is to understand JavaScript by implementing the application logic manually rather than relying on frameworks.

Concepts practiced:

```text
DOM
│
├── querySelector
├── textContent
├── classList
│
Events
│
├── click
├── input
├── change
│
Game logic
│
├── state
├── score
├── timer
├── random position
│
Storage
│
└── localStorage
```

---

## ▶️ Run the project

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/click-fast.git](https://github.com/achrafelberkaoui/clickFast.git
```

Open the project:

```bash
cd clickfast
```

Then open `index.html` in your browser.

For development, you can also use **VS Code Live Server**.

---



## Author

**Achraf El Berkaoui**  
YouCode — Web Development / Full Stack

---

## 📄 License

This project was created for educational purposes.
