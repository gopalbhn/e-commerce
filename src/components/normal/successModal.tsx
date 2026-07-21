
import { CheckCircleIcon } from "lucide-react"
import { Button } from "../ui/button";


const SuccessModal = ({ text, onclick }: { text: string, onclick: () => void }) => {
    return (
        <div className="h-full w-full fixed top-0 left-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">


            <div className="h-70 w-90 bg-white shadow-sm rounded-xl flex flex-col items-center justify-center gap-y-5">
                <div className="h-20 w-20 rounded-full bg-primary-hover/50 flex justify-center items-center">
                    <CheckCircleIcon className="text-white" size={30} />
                </div>
                <p className="text-body font-semibold tracking-tight ">{text}</p>
                <Button variant="default" className={"mx-auto"} onClick={onclick}>OK</Button>
            </div>
        </div>
    )
}

export default SuccessModal;