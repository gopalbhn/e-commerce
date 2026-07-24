
import AdminSideBar from '@/components/admin/AdminSideBar'
import AdminTopBar from '@/components/admin/AdminTopBar'
import MetricChart from '@/components/admin/MetricCard'
import { AdminSideProducts, AprovalRequestData, mostSellingData } from "../../lib/data.js"
import { useEffect, useState } from 'react'
import UserPieChart from '@/components/admin/UserPieChart.js'
import Table from '@/components/admin/table.js'
import { toast } from 'sonner'

interface DashboardStats {
  userWeeklyCounts: {
    week1: number;
    week2: number;
    week3: number;
    week4: number;
  };
  productsWeeklyCount: {
    week1: number;
    week2: number;
    week3: number;
    week4: number;
  };
  orderWeeklyCounts: {
    week1: number;
    week2: number;
    week3: number;
    week4: number;
  };
  seller: number;
  customer: number;
}


const AdminDashboard = () => {
  const [open, setOpen] = useState<boolean>(true)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [mostSoldProduct, setMostSoldProduct] = useState([])
  const [recentProducts, setRecentProducts] = useState([])
  const [sellerRequests, setSellerRequests] = useState([])
  async function fetchstats() {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/dashboard-stats`, {
        method: "GET",

      })
      const data = await res.json()
      console.log(data)
      setStats(data)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  async function fetchMostSoldProduct() {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/most`, {
        credentials: "include"
      })

      const data = await res.json()
      if (data.success) {
        setMostSoldProduct(data.data)
      }

    } catch (error: any) {
      console.log(error.message)
    }
  }

  async function fetchRecentProducts() {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/recent-products`, {
        credentials: "include"
      })

      const data = await res.json()
      if (data.success) {
        setRecentProducts(data.products)
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  async function fetchSellerRequests() {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/seller-requests`, {
        credentials: "include"
      })
      const data = await res.json()
      if (data.success) {
        console.log("seller request", data)
        setSellerRequests(data.sellers)
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  async function handleAcceptRequest(id) {
    console.log(id)
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/seller-approve/${id}`, {
        method: "PUT",
        credentials: "include"
      })

      const data = await res.json()
      if (data.success) {
        toast.success(`Seller Request Accepted`)
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleRejectRequest(id) {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/seller-reject/${id}`, {
        method: "PUT",
        credentials: "include"
      })

      const data = await res.json();

      if (data.success) {
        toast.message("User Rejected Successfully")
        setTimeout(() => {
          window.location.reload();
        }, 500)
      }
    } catch (error: any) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchstats()
    fetchMostSoldProduct()
    fetchRecentProducts()
    fetchSellerRequests()
  }, [])
  const piechartData = [

    {
      name: "Consumers",
      value: stats?.customer,
      color: "#A16207", // amber
    },
    {
      name: "Sellers",
      value: stats?.seller,
      color: "#793A2E5C", // teal
    },

  ]


  return (
    <div className='h-full w-full relative'>

      <AdminSideBar open={open} />
      <section
        className={`flex-1 transition-all duration-300 px-10 mb-10 ${open ? "ml-[15%]" : "ml-0"
          }`}
      >
        <AdminTopBar text="Dashboard" onclick={() => setOpen(!open)} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">

          <MetricChart
            title="Users"
            data={[
              { week: "Week 1", value: stats?.userWeeklyCounts["Week 1"] },
              { week: "Week 2", value: stats?.userWeeklyCounts["Week 2"] },
              { week: "Week 3", value: stats?.userWeeklyCounts["Week 3"] },
              { week: "Week 4", value: stats?.userWeeklyCounts["Week 4"] },
            ]}
          />

          <MetricChart
            title="Products"

            data={[
              { week: "Week 1", value: stats?.productsWeeklyCount["Week 1"] },
              { week: "Week 2", value: stats?.productsWeeklyCount["Week 2"] },
              { week: "Week 3", value: stats?.productsWeeklyCount["Week 3"] },
              { week: "Week 4", value: stats?.productsWeeklyCount["Week 4"] },
            ]}
          />

          <MetricChart
            title="Orders"

            data={[
              { week: "Week 1", value: stats?.orderWeeklyCounts["Week 1"] },
              { week: "Week 2", value: stats?.orderWeeklyCounts["Week 2"] },
              { week: "Week 3", value: stats?.orderWeeklyCounts["Week 3"] },
              { week: "Week 4", value: stats?.orderWeeklyCounts["Week 4"] },
            ]}
          />

        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10'>
          <div className='w-full bg-white rounded-xl p-4 shadow-sm'>


            <h1 className='font-semibold text-body mb-4'>Pending Seller Approval</h1>

            <div className="w-full">
              {sellerRequests.map((data) => (
                <div
                  key={data.userId._id}
                  className="w-full flex justify-between items-center  rounded-xl p-4 mb-3 bg-gray-50"
                >
                  <div className="flex flex-col">
                    <h1 className="text-sm font-bold">{data.shopName}</h1>
                    <p className='text-small text-gray-700 '>Owner: {data.userId.name}</p>
                    <p className="text-small text-gray-700">Email: {data.userId.email}</p>
                    <p className='text-small text-gray-700'>Requested On {new Date(data.createdAt).toDateString()}</p>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-full bg-primary text-white" onClick={() => handleAcceptRequest(data.userId._id)}>
                      Accept
                    </button>

                    <button className="px-3 py-1 rounded-full border border-primary" onClick={() => handleRejectRequest(data.userId._id)}>
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='w-full bg-white rounded-xl p-4 shadow-sm'>
            <h1 className='font-semibold text-body mb-4'>Users Distribution</h1>
            <div className='w-full  mt-5'>
              <UserPieChart data={piechartData} />
            </div>
            <div className='w-full flex items-center justify-center gap-10'>
              <div className='flex items-center gap-2'>
                <div className='h-3 w-3 rounded-full bg-primary'></div>
                <p className='text-body text-small font-semibold'>Consumer</p>
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-3 w-3 rounded-full bg-[#793A2E5C]'></div>
                <p className='text-body text-small font-semibold'>Seller</p>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full mt-10'>
          <h1 className='text-body font-semibold mb-4'>Most Sold Products</h1>
          <Table varaint='most-selling' data={mostSellingData} />
        </div>
        <div className='w-full mt-10'>
          <h1 className='text-body font-semibold mb-4'>Recent Products</h1>
          <Table varaint='product' data={recentProducts} />
        </div>
      </section>
    </div>
  )
}

export default AdminDashboard