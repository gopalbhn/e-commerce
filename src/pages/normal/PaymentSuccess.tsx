import Loader from "@/components/normal/Loader";
import { Button } from "@/components/ui/button"
import { CheckCircleIcon } from "lucide-react"
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"



const PaymentSuccess = () => {

    const [searchParams] = useSearchParams();
    const encodedData = searchParams.get("data");

    const data = encodedData
        ? JSON.parse(atob(encodedData))
        : null;
    const [loading, setLoading] = useState<boolean>(false)
    const [transaction, setTransaction] = useState<any>({})
    const navigate = useNavigate()
    async function fetchData() {

        try {
            setLoading(true)
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/payment/verify-esewa/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    total_amount: data.total_amount,
                    transaction_uuid: data.transaction_uuid,
                    product_code: data.product_code
                }),
                credentials: "include"
            })
            const resData = await res.json();
            if (resData.success) {
                setTransaction(resData.result)
                console.log("transaact", resData.result)
            } else {
                console.log("faild to get data")
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    async function fetchKhaltiData() {
        try {
            setLoading(true)
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/payment/verify-khalti/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pidx: data.pidx,
                    total_amount: data.total_amount,
                    status: data.status,
                    transaction_id: data.transaction_id,

                }),
                credentials: "include"
            })
            const resData = await res.json();
            if (resData.success) {
                setTransaction(resData.result)
                console.log("transaact", resData.result)
            } else {
                console.log("faild to get data")
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (data && data.product_code === "EPAYTEST") {
            fetchData()
        } else {
            fetchKhaltiData();
        }

    }, [])
    if (loading) {
        return <Loader />
    }

    return (
        <div className="h-[calc(100vh-5rem)] w-full flex items-center justify-center ">
            <div className="min-h-70 w-90 bg-white shadow-sm rounded-xl flex flex-col items-center justify-center gap-y-5 py-5">
                <div className="h-20 w-20 rounded-full bg-primary-hover/50 flex justify-center items-center">
                    <CheckCircleIcon className="text-white" size={30} />
                </div>
                <p className="text-body font-semibold tracking-tight font-ibm-plex-mono ">Your order has been placed successfully</p>
                <div className="w-[80%] p-5 bg-gray-100 border border-gray-300 rounded-xl">
                    <div className="w-full flex justify-between gap-2">
                        <p>Transaction id:</p>
                        <p className="">{transaction?.transactionId}</p>

                    </div>
                    <div className="w-full flex justify-between">
                        <p>Amount</p>
                        <p>{transaction?.amount}</p>

                    </div>
                    <div className="w-full flex justify-between">
                        <p>Status</p>
                        <p>{transaction?.status}</p>

                    </div>

                </div>
                <Button variant="default" className={"mx-auto"} onClick={() => navigate("/")} >OK</Button>
            </div>
        </div>
    )
}

export default PaymentSuccess