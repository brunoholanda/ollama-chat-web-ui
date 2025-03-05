# LLM Chatbot Frontend

A **React-based frontend** for an LLM-powered chatbot, connected to **DeepSeek models** via **Ollama**. This project allows users to interact with large language models in a streamlined web interface.

## Features

- 💬 **Chat Interface**: Seamless communication with LLM models.
- 🎨 **Styled with Tailwind CSS & Twind**: Fully responsive UI.
- 📝 **Markdown Support**: Display formatted text and code blocks.
- 📚 **Math Rendering**: Supports KaTeX for mathematical expressions.
- 🔍 **Syntax Highlighting**: Enhances code readability in chat responses.

## Installation

Clone the repository and install dependencies:

## Usage

Start the development server:

```sh
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Dependencies

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Twind](https://twind.style/)
- [React Markdown](https://github.com/remarkjs/react-markdown) – for Markdown rendering
- [Rehype Highlight](https://github.com/rehypejs/rehype-highlight) – for syntax highlighting
- [KaTeX](https://katex.org/) – for math rendering
- [Remark GFM](https://github.com/remarkjs/remark-gfm) – for GitHub-flavored Markdown
- [Remark Math](https://github.com/remarkjs/remark-math) – for math expressions

## Backend Integration

This frontend connects to **DeepSeek models** via **Ollama**. Ensure the backend is running and accessible before starting the frontend.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
