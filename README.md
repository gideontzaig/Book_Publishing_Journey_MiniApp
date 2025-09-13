# Book Publishing Journey Wizard

A small front-end mini-app that guides users through a **4-step wizard** to tailor their book publishing journey.  
Built with **vanilla HTML, CSS, and JavaScript** (no frameworks, no build tools).

---

## Features

- **Modal-based wizard** centered on the page.
- **4 steps**:
  1. **User type** – Indie Author, Thought Leader, Casual Writer.
  2. **Book genre** – Fiction, Non-fiction, Autobiography, etc.
  3. **Publishing process** – Idea stage, Writing in progress, Manuscript ready, etc.
  4. **Budget selection** – Radio options with visual highlighting.
- **Single selection** per step (cards or radio options).
- **Progress bar** and **step indicator** update dynamically.
- **Back/Next navigation** with buttons or keyboard:
  - `Enter` → next step
  - `← / →` → move back or forward
  - `Esc` → close modal
- **Responsive design**: cards switch to single column on smaller screens.
- **Accessible focus states** for cards, buttons, and radio groups.

---

## File Structure

```
project-root/
│
├── index.html   # Main HTML structure (modal, steps, navigation)
├── styles.css   # Styling: layout, cards, progress bar, responsive design
├── app.js       # Wizard logic: state, navigation, event handling
└── README.md    # This file
```

---

## How to Run

1. Clone or download this repository.  
2. Open `index.html` in any modern browser (no server setup required).  
3. Interact with the modal to walk through the publishing journey wizard.

---

## Customization

- **Colors and layout** are controlled by CSS variables in `styles.css` (`:root` block).
- To change step options (cards, labels, budgets):
  - Edit the corresponding sections in `index.html`.
- The wizard’s logic (progress, validation, navigation) is in `app.js` within the `BookPublishingWizard` class.

---

## Limitations

- **Modal close button** currently just logs a message to console (can be extended to actually hide/destroy the modal).
- **No persistence**: selections reset on page reload.
- **No backend integration**: final step triggers a browser alert and logs results to console.

---

## License

This project is provided as an assignment/demo. Free to use and adapt for educational or personal purposes.
