"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCheckLogin } from "../utils/auth";
import Typography from "@/components/Typography";
import toast, { Toaster } from 'react-hot-toast';
import ButtonNoLink from "@/components/button/buttonnolink";
import { Dialog } from "@headlessui/react";

interface Order {
  user: {
    name: string;
  };
  doctor: {
    name: string;
  };
  id: number;
  date: string;
  status: string;
}

export default function MyOrderPage() {
  const isLoggedIn = useCheckLogin();
  const router = useRouter();

  if (!isLoggedIn) {
    router.push("/login");
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [role, setRole] = useState<string | null>(null); 

  const deleteOrder = async (orderId: number) => {
    const token = localStorage.getItem("token");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    try {
      const response = await fetch(`${baseUrl}/reservations/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Order cancelled successfully.");
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
      } else {
        toast.error("Failed to cancel order.");
      }
    } catch {
      console.error("An error occurred while cancelling order.");
    }
  };

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    const token = localStorage.getItem("token");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    try {
      const response = await fetch(`${baseUrl}/reservations/${orderId}/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast.success("Order status updated successfully.");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        toast.error("Failed to update order status.");
      }
    } catch {
      console.error("An error occurred while updating order status.");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("userRole");
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/reservations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const { data } = await response.json();
          setOrders(data.reservations); 
          setRole(role);
        } else {
          console.error("Failed to fetch orders.");
        }
      } catch {
        console.error("An error occurred while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOpenDialog = (orderId: number) => {
    setSelectedOrderId(orderId);
    setIsDialogOpen(true);
  };

  const handleCancelOrder = () => {
    if (selectedOrderId !== null) {
      deleteOrder(selectedOrderId);
    }
    setIsDialogOpen(false);
    setSelectedOrderId(null);
  };

  const handleAcceptOrder = (orderId: number) => {
    updateOrderStatus(orderId, "ACCEPTED");
  };

  const handleRejectOrder = (orderId: number) => {
    updateOrderStatus(orderId, "REJECTED");
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));  // Remove from state
  };

  return (
    <>
      <Toaster />
      <Navbar />
      <section className="min-h-screen bg-[#ECF4FE] px-8 sm:px-12 md:px-16 lg:px-32 py-8">
        <Typography variant="h4" weight="bold" className="text-center text-primary mb-8">
          My Orders
        </Typography>

        {loading ? (
          <div className="flex justify-center items-center">
            <Typography variant="h6">Loading...</Typography>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex justify-center items-center">
            <Typography variant="h6">No orders found.</Typography>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              role === "doctor" ? (
                order.status !== "REJECTED" && (
                  <div
                    key={order.id}
                    className="bg-white shadow-md justify-around p-6 rounded-lg border border-gray-300 flex flex-col"
                  >
                    <Typography variant="t" weight="semibold" className="mb-2">
                      Patient: {order.user.name}
                    </Typography>
                    <Typography variant="bl" className="mb-2">
                      Date: {new Date(order.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="bl" className="mb-4">
                      Status: <span
                      className={`font-semibold ${
                        order.status === "ACCEPTED"
                          ? "text-green-600"
                          : order.status === "REJECTED"
                          ? "text-red-600"
                          : order.status === "PENDING"
                          ? "text-gray-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {order.status}
                    </span>
                    </Typography>
                    {order.status === "PENDING" ? (
                      <div className="flex space-x-2">
                        <ButtonNoLink
                          size="small"
                          className="bg-green-500 border-none"
                          onClick={() => handleAcceptOrder(order.id)}
                        >
                          Accept
                        </ButtonNoLink>
                        <ButtonNoLink
                          size="small"
                          className="bg-red-500 border-none"
                          onClick={() => handleRejectOrder(order.id)}
                        >
                          Reject
                        </ButtonNoLink>
                      </div>
                    ) : order.status === "ACCEPTED" ? (
                      <ButtonNoLink
                        size="small"
                        className="bg-blue-500 border-none"
                      >
                        Lihat Detail
                      </ButtonNoLink>
                    ) : null}
                  </div>
                )
              ) : (
                <div
                  key={order.id}
                  className="bg-white shadow-md p-6 justify-around rounded-lg border border-gray-300 flex flex-col"
                >
                  <Typography variant="t" weight="semibold" className="mb-2">
                    {order.doctor.name}
                  </Typography>
                  <Typography variant="bl" className="mb-2">
                    Date: {new Date(order.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="bl" className="mb-4" >
                    Status: <span
                  className={`font-semibold ${
                    order.status === "ACCEPTED"
                      ? "text-green-600"
                      : order.status === "REJECTED"
                      ? "text-red-600"
                      : order.status === "PENDING"
                      ? "text-gray-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </span>
                  </Typography>
                  {order.status === "PENDING" ? (
                    <ButtonNoLink
                      size="small"
                      className="bg-gray-400 border-none"
                      onClick={() => handleOpenDialog(order.id)}
                    >
                      Cancel
                    </ButtonNoLink>
                  ) : order.status === "ACCEPTED" ? (
                    <ButtonNoLink
                      size="small"
                      className="bg-blue-500 border-none"
                    >
                      Lihat Detail
                    </ButtonNoLink>
                  ) : null}
                </div>
              ))
            )}
          </div>
        )}
      </section>
      <Footer />

      {/* Dialog for Confirmation */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <Dialog.Title className="text-lg font-bold mb-4">Cancel Order</Dialog.Title>
            <Dialog.Description className="text-sm mb-6">
              Are you sure you want to cancel this order? This action cannot be undone.
            </Dialog.Description>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCancelOrder}
                className="px-4 py-2 text-sm bg-red-500 text-white hover:bg-red-600 rounded"
              >
                Confirm
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
