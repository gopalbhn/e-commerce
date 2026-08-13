import { useState } from "react"
import { FaPaperPlane } from "react-icons/fa"
import { ImSpinner8 } from "react-icons/im"
import { IoChatboxOutline } from "react-icons/io5"


const ChatBot = () => {
    const [active, setActive] = useState(false)
    return (
        <>
            {active && <MessageBox />}
            <button
                onClick={() => setActive(!active)}
                className={`h-16 w-16 rounded-full bg-primary fixed z-50 right-5 bottom-5 flex items-center justify-center cursor-pointer hover:bg-primary/70 transition-all duration-200 ${active && "border-6 p-2 border-slate-200"}`}
            >
                <IoChatboxOutline size={40} color="white" />
            </button >
            {active && <MessageBox />}
        </>
    )
}

function MessageBox() {
    const [messages, setMessages] = useState<Array<{ sender: "user" | "bot", message: string }>>([
        { sender: "bot", message: "Hello! How can I help you today?" }
    ])
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    async function sendMessage() {

        if (input.length <= 0 || disabled) {
            return
        }

        setMessages(prev => [...prev, { sender: "user", message: input }]);
        setInput("");
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/chat`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question: input })
        });
        const data = await response.json();
        setMessages(prev => [...prev, { sender: "bot", message: data.answer }]);
        setLoading(false);
    }
    function handleInputchange(text: string) {
        setInput(text)
        if (text.length > 0) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }
    console.log(messages)
    return (
        <div className={`h-96 w-96 overflow-hidden bg-slate-300 fixed z-50 right-5 bottom-22 rounded-xl transition-all duration-200`}>
            <h1 className="bg-primary w-full h-16 flex items-center justify-center text-white font-semibold text-xl">Easy Mart Support</h1>
            <div className=" w-full flex flex-col justify-end">
                <div className=" h-65 flex flex-col gap-2 p-2 overflow-y-scroll">
                    {
                        messages.map((m, i) => (
                            <h1 key={i}
                                className={`rounded-lg p-2 w-fit ${m.sender === "user" ? "bg-primary text-white self-end" : "bg-white"}`}>{m.message}</h1>
                        ))
                    }
                </div>
                <div className="flex p-2">
                    <input type="text" placeholder="Type your message..." className="w-full px-4 py-2 text-sm outline-none bg-slate-200" value={input} onChange={(e) => handleInputchange(e.target.value)}
                    />
                    <button
                        disabled={disabled}
                        onClick={sendMessage} className={`bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/70 transition-colors duration-200 ${disabled && "bg-primary/50 cursor-not-allowed"}`}>
                        {loading ? <ImSpinner8 className="animate-spin" /> : <FaPaperPlane />}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatBot