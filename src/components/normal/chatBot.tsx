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

                <h1 className=" w-full pl-5  text-white font-semibold text-xl font-fraunces">Easy Mart Support</h1>
                <button className="h-16 w-16 flex items-center justify-center text-white font-semibold text-xl text-white rounded-r-xl" onClick={() => setActive(false)}><IoClose size={20} /></button>
            </div>
            <div className=" w-full flex flex-col justify-end">
                <div className=" h-65 flex flex-col gap-2 p-2 overflow-y-scroll scrolbar-modify">
                    {
                        messages?.map((m, i) => (
                            <h1 key={i}
                                className={`rounded-lg p-2 w-fit font-ibm-plex-mono ${m.role === "user" ? "bg-primary text-white self-end" : "bg-white"}`}>{m.content}</h1>
                        ))
                    }
                </div>
                {
                    !limit ? (
                        <div className="flex p-2">
                            <input type="text" placeholder="Type your message..." className="w-full px-4 py-2 text-sm outline-none bg-slate-200 font-ibm-plex-mono" value={input} onChange={(e) => handleInputchange(e.target.value)}
                            />
                            <button
                                disabled={disabled}
                                onClick={sendMessage} className={`bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/70 transition-colors duration-200 ${disabled && "bg-primary/50 cursor-not-allowed"}`}>
                                {loading ? <ImSpinner8 className="animate-spin" /> : <FaPaperPlane />}
                            </button>
                        </div>
                    ) : (
                        <div className="flex p-2">
                            <h1 className="text-red-500 text-sm">You have exceeded the limit of messages. Please try again later.</h1>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ChatBot