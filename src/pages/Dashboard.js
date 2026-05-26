import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";


function Dashboard() {

  const navigate = useNavigate();

  const [summary, setSummary] = useState({
    total_income: 0,
    total_expense: 0,
    balance: 0
  });

  const [expenses, setExpenses] = useState([]);

  const [income, setIncome] = useState([]);

  const [expenseData, setExpenseData] = useState({
    title: "",
    amount: "",
    category: ""
  });

  const [incomeData, setIncomeData] = useState({
    source: "",
    amount: ""
  });


  useEffect(() => {

    fetchSummary();

    fetchExpenses();

    fetchIncome();

  }, []);


  const fetchSummary = async () => {

    const response = await API.get(
      "/analytics/summary"
    );

    setSummary(response.data);

  };


  const fetchExpenses = async () => {

    const response = await API.get(
      "/expenses/"
    );

    setExpenses(response.data);

  };


  const fetchIncome = async () => {

    const response = await API.get(
      "/income/"
    );

    setIncome(response.data);

  };


  const deleteExpense = async (id) => {

    await API.delete(
      `/expenses/${id}`
    );

    fetchExpenses();

    fetchSummary();

  };


  const deleteIncome = async (id) => {

    await API.delete(
      `/income/${id}`
    );

    fetchIncome();

    fetchSummary();

  };


  const handleExpenseChange = (e) => {

    setExpenseData({
      ...expenseData,
      [e.target.name]: e.target.value
    });

  };


  const handleIncomeChange = (e) => {

    setIncomeData({
      ...incomeData,
      [e.target.name]: e.target.value
    });

  };


  const addExpense = async (e) => {

    e.preventDefault();

    await API.post(
      "/expenses/",
      expenseData
    );

    fetchExpenses();

    fetchSummary();

    setExpenseData({
      title: "",
      amount: "",
      category: ""
    });

  };


  const addIncome = async (e) => {

    e.preventDefault();

    await API.post(
      "/income/",
      incomeData
    );

    fetchIncome();

    fetchSummary();

    setIncomeData({
      source: "",
      amount: ""
    });

  };


  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };


  return (

    <div className="container mt-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">

          Expense Tracker Dashboard

        </h2>

        <button
          className="btn btn-danger px-4"
          onClick={logout}
        >
          Logout
        </button>

      </div>

      <div className="row g-4">

        <div className="col-md-4">

          <div className="card p-4 shadow dashboard-card income-card">

            <h4>Total Income</h4>

            <h2>₹ {summary.total_income}</h2>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card p-4 shadow dashboard-card expense-card">

            <h4>Total Expense</h4>

            <h2>₹ {summary.total_expense}</h2>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card p-4 shadow dashboard-card balance-card">

            <h4>Balance</h4>

            <h2>₹ {summary.balance}</h2>

          </div>

        </div>

      </div>

      <div className="row mt-5 g-4">

        <div className="col-md-6">

          <div className="card p-4 shadow">

            <h4 className="mb-4">

              Add Expense

            </h4>

            <form onSubmit={addExpense}>

              <input
                type="text"
                name="title"
                placeholder="Expense Title"
                className="form-control mb-3"
                value={expenseData.title}
                onChange={handleExpenseChange}
              />

              <input
                type="number"
                name="amount"
                placeholder="Expense Amount"
                className="form-control mb-3"
                value={expenseData.amount}
                onChange={handleExpenseChange}
              />

              <input
                type="text"
                name="category"
                placeholder="Category"
                className="form-control mb-3"
                value={expenseData.category}
                onChange={handleExpenseChange}
              />

              <button className="btn btn-dark w-100">

                Add Expense

              </button>

            </form>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card p-4 shadow">

            <h4 className="mb-4">

              Add Income

            </h4>

            <form onSubmit={addIncome}>

              <input
                type="text"
                name="source"
                placeholder="Income Source"
                className="form-control mb-3"
                value={incomeData.source}
                onChange={handleIncomeChange}
              />

              <input
                type="number"
                name="amount"
                placeholder="Income Amount"
                className="form-control mb-3"
                value={incomeData.amount}
                onChange={handleIncomeChange}
              />

              <button className="btn btn-success w-100">

                Add Income

              </button>

            </form>

          </div>

        </div>

      </div>

      <div className="row mt-5 g-4">

        <div className="col-md-6">

          <div className="card p-4 shadow">

            <h4 className="mb-4">

              Expenses

            </h4>

            <ul className="list-group">

              {expenses.map((expense) => (

                <li
                  key={expense.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >

                  <span>

                    {expense.title} - ₹ {expense.amount}

                  </span>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteExpense(expense.id)}
                  >
                    Delete
                  </button>

                </li>

              ))}

            </ul>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card p-4 shadow">

            <h4 className="mb-4">

              Income

            </h4>

            <ul className="list-group">

              {income.map((item) => (

                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >

                  <span>

                    {item.source} - ₹ {item.amount}

                  </span>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteIncome(item.id)}
                  >
                    Delete
                  </button>

                </li>

              ))}

            </ul>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;