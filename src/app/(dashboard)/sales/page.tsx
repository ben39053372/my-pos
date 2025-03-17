"use client";

import { useState } from "react";
import useCartStore from "@/store/useCartStore";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Sale } from "@/lib/types";

export default function SalesPage() {
  const { sales } = useCartStore();
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
  const averageSale = sales.length > 0 ? totalSales / sales.length : 0;

  const handleViewReceipt = (sale: Sale) => {
    setSelectedSale(sale);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Sales History</h1>

        {sales.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No sales recorded yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Receipt #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Items
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Payment
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sales.map((sale) => (
                  <tr key={sale.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {sale.receiptNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(sale.timestamp)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {sale.items.reduce(
                          (sum, item) => sum + item.quantity,
                          0
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatCurrency(sale.total)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {sale.paymentMethod.charAt(0).toUpperCase() +
                          sale.paymentMethod.slice(1)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewReceipt(sale)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Sales Summary</h2>

        <div className="space-y-4">
          <div className="border-b pb-4">
            <div className="text-sm text-gray-500 mb-1">Total Sales</div>
            <div className="text-2xl font-bold">
              {formatCurrency(totalSales)}
            </div>
          </div>

          <div className="border-b pb-4">
            <div className="text-sm text-gray-500 mb-1">
              Number of Transactions
            </div>
            <div className="text-2xl font-bold">{sales.length}</div>
          </div>

          <div className="border-b pb-4">
            <div className="text-sm text-gray-500 mb-1">Average Sale</div>
            <div className="text-2xl font-bold">
              {formatCurrency(averageSale)}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500 mb-1">Payment Methods</div>
            <div className="space-y-2 mt-2">
              {["cash", "card", "other"].map((method) => {
                const count = sales.filter(
                  (sale) => sale.paymentMethod === method
                ).length;
                const percentage =
                  sales.length > 0 ? (count / sales.length) * 100 : 0;

                return (
                  <div key={method} className="flex items-center">
                    <div className="w-24 text-sm capitalize">{method}</div>
                    <div className="flex-1 mx-2">
                      <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 w-16 text-right">
                      {count} ({percentage.toFixed(0)}%)
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {selectedSale && (
          <div className="mt-8">
            <h2 className="text-lg font-medium mb-4">
              Receipt #{selectedSale.receiptNumber}
            </h2>
            <div className="bg-gray-100 p-4 rounded-md font-mono text-sm whitespace-pre-wrap">
              <div className="mb-2">
                Date: {formatDate(selectedSale.timestamp)}
              </div>
              {selectedSale.customerName && (
                <div className="mb-2">
                  Customer: {selectedSale.customerName}
                </div>
              )}
              <div className="border-t border-b border-gray-300 my-2 py-2">
                {selectedSale.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      {item.quantity} x {item.product.name}
                    </div>
                    <div>
                      {formatCurrency(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold mt-2">
                <div>Total</div>
                <div>{formatCurrency(selectedSale.total)}</div>
              </div>
              <div className="mt-2 text-gray-500">
                Payment:{" "}
                {selectedSale.paymentMethod.charAt(0).toUpperCase() +
                  selectedSale.paymentMethod.slice(1)}
              </div>
            </div>
            <button
              onClick={() => setSelectedSale(null)}
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Close Receipt
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
