import { useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../store/auth";
import { formatCurrency } from "../utils/formatCurrency";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      (async () => {
        const data =
          await api.getOrdersByUserId(user.id);
        setOrders(data);
      })();
    }
  }, [user]);

  if (!orders.length)
    return <div>Belum ada pesanan.</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Riwayat Pesanan
      </h1>
      <div className="space y-4">
        {orders.map(o => (
          <div key={o.id} className="border p-3 rounded bg-zinc-900">
            <div>ID Pesanan: {o.id}</div>
            <div>Tanggal: {new Date(o.createdAt).toLocaleString()}</div>
            <div>Status: <span className="font-bold">{o.status}</span></div>
            <div>Total: {formatCurrency(o.total)}</div>
            <div className="mt-2">
              <strong>Items:</strong>
              <ul className="ml-4 list-disc">
                {o.items.map(i => (
                  <li key={i.id}>{i.name} x {i.qty} - {formatCurrency(i.price)}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Orders;