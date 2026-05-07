import { formatCurrency } from "../helpers";

const BudgetHealth = ({ budgets = [], expenses = [] }) => {
  // Use logical OR to ensure we are working with arrays
  const budgetList = budgets || [];
  const expenseList = expenses || [];

  const totalMoney = budgetList.reduce((acc, budget) => acc + budget.amount, 0);
  const totalSpent = expenseList.reduce((acc, expense) => acc + expense.amount, 0);
  const remaining = totalMoney - totalSpent;

  return (
    <div className="form-wrapper">
      <h3 className="h4">Total <span className="accent">Balance</span></h3>
      <div className="grid-xs">
        <h2 className="h2">{formatCurrency(totalMoney)}</h2>
        <small className="muted">Total across {budgetList.length} wallets</small>
        <progress value={totalSpent} max={totalMoney} />
        <p className="accent">{formatCurrency(remaining)} currently available</p>
      </div>
    </div>
  );
};

export default BudgetHealth;