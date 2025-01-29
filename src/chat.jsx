import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;
        setLoading(true);

        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        try {
            const response = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "deepseek-coder-lite",
                    prompt: input,
                    stream: false,
                }),
            });

            const data = await response.json();
            const botMessage = { role: "bot", content: data.response };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Erro ao conectar ao Ollama", error);
        }

        setLoading(false);
    };

    const startNewChat = () => {
        setMessages([]);
        setInput("");
    };

    // Função para copiar código
    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        alert("Código copiado!");
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
            {/* Header com botão de novo chat */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Chat com IA</h2>
                <button
                    onClick={startNewChat}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
                >
                    Novo Chat
                </button>
            </div>

            {/* Chat Container */}
            <div className="flex-1 overflow-y-auto bg-gray-800 shadow-lg p-4 rounded-md">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-2 p-3 rounded-lg ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-600"
                            }`}
                    >
                        <strong>{msg.role === "user" ? "Você:" : "Bot:"}</strong>
                        <ReactMarkdown
                            className="prose prose-invert mt-1"
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                            components={{
                                code({ inline, children }) {
                                    const codeText = String(children).trim();

                                    // Se for código em linha (ex: `useState`)
                                    if (inline) {
                                        return (
                                            <code className="bg-gray-700 text-yellow-400 px-1 rounded">
                                                {codeText}
                                            </code>
                                        );
                                    }

                                    // Se for um bloco de código
                                    return (
                                        <div className="relative group">
                                            <button
                                                onClick={() => copyToClipboard(codeText)}
                                                className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                Copiar
                                            </button>
                                            <pre className="p-3 bg-gray-900 text-white rounded-md overflow-x-auto">
                                                <code>{codeText}</code>
                                            </pre>
                                        </div>
                                    );
                                },
                            }}
                        >
                            {msg.content || "*Erro ao renderizar a resposta*"}
                        </ReactMarkdown>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-center mt-2">
                        <div className="w-6 h-6 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex mt-4">
                <input
                    type="text"
                    className="flex-1 border bg-gray-700 text-white p-3 rounded-md outline-none"
                    placeholder="Digite sua pergunta..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-md transition duration-200"
                    disabled={loading}
                >
                    {loading ? "Enviando..." : "Enviar"}
                </button>
            </div>
        </div>
    );
}

