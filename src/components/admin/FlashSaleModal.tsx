import { FaX } from "react-icons/fa6"
import { ImSpinner8 } from "react-icons/im";

interface FormState {

    saleTitle: string;
    discountPercentage: number;
    startTime: string;
    endTime: string;
}


const FalshSaleModal = ({ onclose, handleSave, form, updateForm, loading, isEditing }: { onclose: () => void, handleSave: () => void, form: FormState, updateForm: <K extends keyof FormState>(key: K, value: FormState[K]) => void, loading: boolean, editId: string, isEditing: boolean }) => {
    console.log("Loading", loading)
    console.log('formdata', form)
    return (
        <div className="h-full w-full bg-black/20 fixed top-0 left-0 flex items-center justify-center z-100 ">
            <div className="p-5 bg-white max-w-xl w-full rounded-xl">
                <div className="flex items-center justify-between">
                    <h1 className="text-title font-semibold text-lg">{isEditing ? "Edit Flash Sale" : "Create Flash Sale"}</h1>
                    <button className="p-2 rounded-full hover:bg-gray-200" onClick={onclose}>
                        <FaX size={12} />
                    </button>
                </div>
                <div className="p-5 flex flex-col gap-4">
                    <div>
                        <label htmlFor="flashSaleTitle" className="text-body font-semibold mb-2">Flash Sale Title</label>
                        <input type="text" id="flashSaleTitle" placeholder="Enter Flash Sale Title" className=" w-full px-4 py-2.5 mt-2 border border-gray-300 rounded-xl" value={form.saleTitle} onChange={(e) => updateForm("saleTitle", e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="discountPercentage" className="text-body font-semibold mb-2">Discount Percentage</label>
                        <input type="number" id="discountPercentage" placeholder="Enter Discount Percentage" className="w-full px-4 py-2.5 mt-2 border border-gray-300 rounded-xl" value={form.discountPercentage} onChange={(e) => updateForm("discountPercentage", Number(e.target.value))} />
                    </div>
                    <div>
                        <label htmlFor="startDate" className="text-body font-semibold mb-2">Start Time</label>
                        <input type="datetime-local" id="startDate" className="w-full px-4 py-2.5 mt-2 border border-gray-300 rounded-xl" value={isEditing ? new Date(form.startTime).toLocaleDateString() : form.startTime} onChange={(e) => updateForm("startTime", e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="expiryDate" className="text-body font-semibold mb-2">Expiry Date</label>
                        <input type="datetime-local" id="expiryDate" className="w-full px-4 py-2.5 mt-2 border border-gray-300 rounded-xl" value={isEditing ? new Date(form.endTime).toLocaleDateString() : form.endTime} onChange={(e) => updateForm("endTime", e.target.value)} />
                    </div>
                    <div className="flex items-center justify-end gap-3 mt-5">

                        <button className="px-4 py-2  rounded-xl bg-gray-100 text-body hover:bg-gray-200 transition-all" onClick={onclose}>Cancel</button>
                        <button className={`px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/80 transition-all${loading ? "bg-primary/40 cursor-not-allowed" : ""}`} onClick={handleSave} disabled={loading}>{
                            loading ? (
                                <div className="flex items-center gap-2">
                                    <span>{isEditing ? "Updating..." : "Creating..."}</span>
                                    <ImSpinner8 className="animate-spin" />
                                </div>
                            ) : (
                                <span>{isEditing ? "Update" : "Create"}</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default FalshSaleModal