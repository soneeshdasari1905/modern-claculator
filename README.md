# 🧮 Modern Minimalist Dark Theme Calculator

A sleek, responsive, and modern calculator built using pure **HTML5**, **CSS3**, and **Vanilla JavaScript**. Designed with a minimalist dark aesthetic, tactile button feedback, and robust arithmetic logic.

---

## ✨ Features

- **Modern Dark UI**: Obsidian card design with subtle ambient gradients, high contrast typography, and warm amber operator accents.
- **Two-Tier Display**: Displays previous operand/operation on top and current active input or result below.
- **Tactile Micro-Interactions**: Smooth scale depression (`:active`) on button presses simulating physical clicks.
- **Robust Math Engine**:
  - Handles basic operations: Addition (`+`), Subtraction (`−`), Multiplication (`×`), Division (`÷`), and Percentage (`%`).
  - Chained operations support (e.g., `5 + 5 + 5`).
  - Division by zero safeguards (`Error` handling).
  - Accurate decimal precision fix for JavaScript floating-point arithmetic quirks (`0.1 + 0.2`).
  - Automatic thousand-separator formatting (e.g., `1,250,000`).
- **Keyboard Support**: Full desktop keyboard input (0-9, `.`, `+`, `-`, `*`, `/`, `Enter`, `Backspace`, `Escape`).
- **Responsive Layout**: Adapts cleanly across mobile screens and desktop displays using CSS Grid.

---

## 🛠️ Built With

- **HTML5**: Semantic markup using modern `data-*` attributes.
- **CSS3**: Custom CSS Variables, Flexbox, and CSS Grid layout.
- **JavaScript (ES6+)**: Pure vanilla JS with state-driven architecture and zero external dependencies.

---

## 🚀 Getting Started

No build tools, package managers, or servers required!

1. Clone or download this repository:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   ```
2. Open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Firefox, Safari).

---

## 📂 Project Structure

```text
├── index.html       # Calculator markup and screen structure
├── style.css        # Minimalist dark theme styles and layout
├── script.js        # State management, arithmetic logic, and event listeners
└── README.md        # Project documentation
```

---

## 📄 License

This project is open-source and free to use for learning and development.

