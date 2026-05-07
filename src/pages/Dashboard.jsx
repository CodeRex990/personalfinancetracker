import { Link, useLoaderData } from "react-router-dom";
import { createBudget, createExpense, deleteItem, fetchData, waait } from "../helpers"
import Intro from "../Components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../Components/AddBudgetForm";
import AddExpenseForm from "../Components/AddExpenseForm";
import BudgetItem from "../Components/BudgetItem";
import Table from "../Components/Table";
import CurrencyTracker from "../Components/CurrencyTracker";
import BudgetHealth from "../Components/BudgetHealth";
import AddIncomeForm from "../Components/AddIncomeForm";

export function dashboardLoader(){
    const userName = fetchData("userName");
    // Provide an empty array fallback directly in the loader
    const budgets = fetchData("budgets") ?? [];
    const expenses = fetchData("expenses") ?? [];
    return { userName, budgets, expenses }
}

export async function dashboardAction({request}){
    // await waait();
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);
    if (_action === "addIncome") {
        try {
            const amount = parseFloat(values.incomeAmount);
            const budgetId = values.budgetCategory;
            const budgets = fetchData("budgets");

            const updatedBudgets = budgets.map(b => {
                if (b.id === budgetId) {
                    return { ...b, amount: b.amount + amount };
                }
                return b;
            });

            localStorage.setItem("budgets", JSON.stringify(updatedBudgets));
            return toast.success("Income deposited successfully!");
        } catch (e) {
            throw new Error("Problem adding income.");
        }
    }
    if(_action === "newUser"){
    try {
         localStorage.setItem("userName", JSON.stringify(values.userName))
         return toast.success(`Welcome, ${values.userName}`)
        } catch(e) {
        throw new Error("There was a problem")
        }
    }
    if(_action === "createBudget"){
        try {
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount,
            })
            return toast.success("Budget Added")
        } catch(e){
            throw new Error("There was a problem creating your budget.")
        }
    }

      if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget
      })
      return toast.success(`Expense ${values.newExpense} created!`)
    } catch (e) {
      throw new Error("There was a problem creating your expense.")
    }
  }
    if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId
      });
      return toast.success("Expense deleted!")
    } catch (e) {
      throw new Error("There was a problem deleting your expense.")
    }
  }
}

const Dashboard = () => {
    const {userName, budgets, expenses} = useLoaderData()
    return (
        <>
                {userName ? (<div className="dashboard">
                    <h1>Welcome,  <span className="accent">{userName}</span></h1>
                    <div className="grid-lg">
                        {/* {budgets ? () : ()} */}
                        {
                            budgets && budgets.length > 0 ?(
                        <div className="grid-lg">
                            <div className="grid-dashboard-main">
{/* Column 1: Budget Creation & Health Summary */}
                    <div className="column-stack">
                        <AddBudgetForm budgets={budgets} />
                        {/* BudgetHealth needs both budgets and expenses to calculate balance[cite: 1, 4] */}
                        <BudgetHealth budgets={budgets} expenses={expenses} />
                    </div>

                    {/* Column 2: Expense Entry */}
                    <div className="dashboard-column">
                        <AddExpenseForm budgets={budgets} />
                    </div>

                    {/* Column 3: Income & External Data */}
                    <div className="column-stack">
                        {/* AddIncomeForm MUST receive budgets to populate the dropdown */}
                        <AddIncomeForm budgets={budgets} />
                        <CurrencyTracker />
                    </div>
                            </div>
                            <h2>Existing Wallets</h2>
                            <div className="budgets">
                                {
                                    budgets.map((budget) => (
                                        <BudgetItem key={budget.id} budget={budget} />
                                    ))
                                }
                            </div>
                                {
                                    expenses && expenses.length > 0 && (
                                        <div className="grid-md"> 
                                            <h2>Recent Expenses</h2>
                                            <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 8)
                                            } />
                                            {expenses.length > 8 && (
                                                <Link to="expenses" className="btn btn--dark">
                                                View All Expenses 
                                                </Link>
                                            )}
                                        </div>
                                    )
                                }
                        </div>) 
                        : ( 
                            <div className="grid-sm"> 
                                <p>The hunt for extra savings starts here.</p>
                                <p>Open a new wallet to start sorting your leaves.</p>
                                <AddBudgetForm />
                            </div>
                         )
                        }
                    </div>
                </div>) : <Intro />}
                
        </>
    )
}

export default Dashboard