import { Button } from "../ui/button"

interface DeleteModalProps {
    onCancel: () => void

}

const DeleteModal = ({ onCancel }: DeleteModalProps) => {

    return (
        <div className="fixed top-0 left-0 inset-0 w-full h-full flex items-center justify-center bg-black/20 z-100 ">
            <div className=" w-xl bg-white  flex flex-col gap-5 rounded-xl p-5">
                <h1 className="text-title font-semibold">Are You Sure?</h1>
                <div className="flex gap-x-5 justify-end">
                    <Button variant={"outline"} onClick={onCancel}>Cancel</Button>
                    <Button>Delete</Button>
                </div>
            </div>
        </div>
    )
}


export default DeleteModal;
