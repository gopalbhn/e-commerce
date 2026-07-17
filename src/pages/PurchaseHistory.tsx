import Footer from "../components/Footer"

const PurchaseHistory = () => {




    return (
        <div className="h-full w-full ">
            <section className="h-full w-full mb-15 px-10">
                <h1 className="text-title font-bold mb-8 mt-2 text-primary">Your Purchase History</h1>
                <div className="h-15 w-full flex items-center justify-between px-10 shadow-sm bg-primary/10">
                    <div className="w-[85%] flex items-center justify-start bg-white rounded-xl ">
                        <input type="text"
                            placeholder="Search.. "
                            className="w-full h-12 rounded-xl pl-5 border border-gray-300 "
                        />
                    </div>
                    <div className="flex rounded-xl">
                        <select className="w-full h-12 px-2 rounded-xl border border-gray-300 bg-white">
                            <option>Last 3 Months</option>
                            <option>Last 6 Months</option>
                            <option>Last 1 Year</option>
                        </select>
                    </div>

                </div>
                <div className="h-full w-full flex flex-col gap-2">
                    <div className="h-full w-full mt-5 shadow-sm p-4">
                        <h1 className="text-xl font-semibold text-primary">Delivered On : {new Date().toDateString()}</h1>
                        <div className="h-full w-full flex items-center gap-2">

                            <div className="h-15 w-15 flex items-center justify-center overflow-hidden rounded-xl mt-2">
                                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" className="h-full w-full object-cover" alt="" />
                            </div>
                            <div className=" w-full flex items-center justify-between mt-2">
                                <div className="flex flex-col gap-1">
                                    <p className="font-semibold text-primary">Smart Watch Series x</p>
                                    <p>Quantity: 2</p>
                                    <p >Total Costs: $299.00</p>
                                </div>
                                <button className="bg-primary px-5 py-3 rounded-xl text-white">Buy Again</button>
                            </div>
                        </div>
                    </div>
                    <div className="h-full w-full mt-5 shadow-sm p-4">
                        <h1 className="text-xl font-semibold text-primary">Delivered On : {new Date().toDateString()}</h1>
                        <div className="h-full w-full flex items-center gap-2">

                            <div className="h-15 w-15 flex items-center justify-center overflow-hidden rounded-xl mt-2">
                                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" className="h-full w-full object-cover" alt="" />
                            </div>
                            <div className=" w-full flex items-center justify-between mt-2">
                                <div className="flex flex-col gap-1">
                                    <p className="font-semibold text-primary">Smart Watch Series x</p>
                                    <p>Quantity: 2</p>
                                    <p >Total Costs: $299.00</p>
                                </div>
                                <button className="bg-primary px-5 py-3 rounded-xl text-white">Buy Again</button>
                            </div>
                        </div>
                    </div>
                </div>


            </section>
            <Footer />
        </div>
    )
}


export default PurchaseHistory