import React, { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { format } from "timeago.js";

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await userRequest.get("transactions");
        setTransactions(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransactions();
  }, []);

  const handleApprove = async (transactionId) => {
    try {
      await userRequest.patch(`transactions/${transactionId}`, { status: "approved" });
      setTransactions(prevTransactions => prevTransactions.map(transaction => {
        if (transaction._id === transactionId) {
          return { ...transaction, status: "approved" }
        }
        return transaction;
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecline = async (transactionId) => {
    try {
      await userRequest.patch(`transactions/${transactionId}`, { status: "declined" });
      setTransactions(prevTransactions => prevTransactions.map(transaction => {
        if (transaction._id === transactionId) {
          return { ...transaction, status: "declined" }
        }
        return transaction;
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePending = async (transactionId) => {
    try {
      await userRequest.patch(`transactions/${transactionId}`, { status: "pending" });
      setTransactions(prevTransactions => prevTransactions.map(transaction => {
        if (transaction._id === transactionId) {
          return { ...transaction, status: "pending" }
        }
        return transaction;
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Transactions</h2>
      <table>
        <tr>
          <th>Customer</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
        {transactions.map((transaction) => (
          <tr key={transaction._id} onClick={() => setSelectedTransaction(transaction)}>
          <td>{transaction.userId}</td>
          <td>{format(transaction.createdAt)}</td>
          <td>${transaction.amount}</td>
          <td>{transaction.status}</td>
          <td>
          <button onClick={() => handleApprove(transaction._id)}>Approve</button>
          <button onClick={() => handleDecline(transaction._id)}>Decline</button>
          <button onClick={() => handlePending(transaction._id)}>Keep Pending</button>
          </td>
          </tr>
          ))}
          </table>
          {selectedTransaction && (
          <div>
          <h3>Transaction Details</h3>
          <p>Customer: {selectedTransaction.userId}</p>
          <p>Date: {format(selectedTransaction.createdAt)}</p>
          <p>Amount: ${selectedTransaction.amount}</p>
          <p>Status: {selectedTransaction.status}</p>
          </div>
          )}
          </div>
          );
          }
