import UserStore from "@/store/userStore"
import { useEffect, useState } from "react"
import { FaPaperPlane } from "react-icons/fa"
import { ImSpinner8 } from "react-icons/im"
import { IoChatboxOutline, IoClose } from "react-icons/io5"
import { toast } from "sonner"


const ChatBot = () => {
    const [active, setActive] = useState(false)
    const [messages, setMessages] = useState<Array<{ role: "user" | "assistant", content: string }>>([
        { role: "assistant", content: "Hello! How can I help you today?" }
    ])

    const getPreviousChat = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/chat/history`, {
                method: "GET",
                credentials: "include"
            })
            console.log('res', res)
            const data = await res.json();
            console.log("data", data)
            if (res.ok) {
                setMessages(data.messages);
            }
            console.log("messages ", data.messages)


        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getPreviousChat();
    }, [])
    console.log("chat", messages)
    return (
        <>
            {active && <MessageBox messages={messages} setMessages={setMessages} setActive={setActive} />}
            {!active && (

                <button
                    onClick={() => setActive(!active)}
                    className={`h-16 w-16 rounded-full bg-primary fixed z-50 right-5 bottom-18 md:bottom-10 flex items-center justify-center cursor-pointer hover:bg-primary/70 transition-all duration-200 chat-reveal space-y-0 ${active && "border-6 p-2 border-slate-200"} `}
                >
                    <IoChatboxOutline size={40} color="white" />
                </button >
            )}
        </>
    )
}

function MessageBox({ messages, setMessages, setActive }: { messages: Array<{ role: "user" | "assistant", content: string }>; setMessages: React.Dispatch<React.SetStateAction<Array<{ role: "user" | "assistant", content: string }>>>, setActive: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [limit, setLimit] = useState(false)
    const user = UserStore(state => state.user?.id)
    console.log("user from chat", user)
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            sendMessage();
        }
    }
    async function sendMessage() {

        if (input.length <= 0 || disabled) {
            return
        }
        console.log("send msg", messages)

        setMessages(prev => [...prev, { role: "user", content: input }]);
        setInput("");
        setLoading(true);

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/chat`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question: input, })
        });

        if (response.status == 429) {
            setTimeout(() => {
                toast.error("Too many requests, please wait for 5 minutes")
            }, 500)
            setLoading(false)
            setLimit(true)
            return;

        }
        const data = await response.json();
        setMessages(prev => [...prev, { role: "assistant", content: data.answer }]);
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
    console.log("messages", messages)
    return (
        <div className={`h-96 w-96 overflow-y-auto bg-slate-300 fixed z-100 left-210 bottom-15 md:bottom-10 rounded-xl transition-all duration-200 fadeOut`}>
            <div className="w-full flex justify-between items-center  bg-primary">
                <div className="flex items-center gap-1">
                    <div className="p-3 ml-2 flex items-center justify-center bg-white/20 font-semibold text-xl text-white rounded-full"><IoChatboxOutline size={20} /></div>
                    <h1 className=" w-full pl-2  text-white font-semibold text-lg font-fraunces">Easy Mart Support</h1>
                </div>
                <button className="h-16 w-16 flex items-center justify-center text-white font-semibold text-xl text-white rounded-r-xl" onClick={() => setActive(false)}><IoClose size={20} /></button>
            </div>
            <div className=" w-full flex flex-col justify-end">
                <div className=" h-65 flex flex-col gap-2 p-2 overflow-y-scroll scrolbar-modify">
                    {
                        messages?.map((m, i) => {
                            const prevSameRole = messages[i - 1]?.role === m.role;
                            const nextSameRole = messages[i + 1]?.role === m.role;
                            return (
                                <div key={i}
                                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} chat-bubble-in`}
                                >

                                    <h1
                                        className={`
                                        px-3 py-2 max-w-[80%]  text-sm font-ibm-plex-mono break-words
                                    ${m.role === "user"
                                                ? "bg-primary text-white "
                                                : "bg-white text-slate-800 "
                                            }
                                         ${m.role === "user"
                                                ? `rounded-l-2xl ${prevSameRole ? "rounded-tr-md" : "rounded-tr-2xl"} ${nextSameRole ? "rounded-br-md" : "rounded-br-2xl"}`
                                                : `rounded-r-2xl ${prevSameRole ? "rounded-tl-md" : "rounded-tl-2xl"} ${nextSameRole ? "ro  unded-bl-md" : "rounded-bl-2xl"}`
                                            }

                                    `}>
                                        {m.content}
                                    </h1>
                                </div>
                            )
                        })
                    }
                </div>
                {!limit ? (
                    <div className="flex items-center gap-2 p-2 bg-white/30 shrink-0 border-t border-slate-200 backdrop-blur-xl">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="w-full px-4 py-2 text-sm outline-none bg-slate-100 rounded-full font-ibm-plex-mono"
                            value={input}
                            onKeyDown={(e: any) => handleKeyDown(e)}
                            onChange={(e) => handleInputchange(e.target.value)}

                        />
                        <button
                            disabled={disabled}
                            onClick={sendMessage}
                            className={`
                            h-9 w-9 shrink-0 flex items-center justify-center rounded-full
                            bg-primary text-white hover:bg-primary/70 transition-colors duration-200
                            ${disabled && "bg-primary/50 cursor-not-allowed"}
                        `}
                        >
                            {loading ? <ImSpinner8 className="animate-spin" size={14} /> : <FaPaperPlane size={14} />}
                        </button>
                    </div>
                ) : (
                    <div className="flex p-3 bg-white border-t border-slate-200">
                        <h1 className="text-red-500 text-sm font-ibm-plex-mono">You have exceeded the limit of messages. Please try again later.</h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatBot