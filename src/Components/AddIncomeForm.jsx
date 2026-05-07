import { ArrowDownCircleIcon } from "@heroicons/react/16/solid";
import { Form } from "react-router-dom";

const AddIncomeForm = ({ budgets }) => {
  return (
    <div className="form-wrapper">
      <h2 className=""><span className="accent">Add</span> Income</h2>
      <Form method="post" className="grid-sm">
        {/* RESTORED: Amount Input */}
        <div className="grid-xs">
          <label htmlFor="incomeAmount">Amount</label>
          <input 
            type="number" 
            name="incomeAmount" 
            id="incomeAmount" 
            step="0.01" 
            placeholder="₱0.00" 
            required 
            inputMode="decimal"
          />
        </div>

        {/* Wallet Dropdown */}
        <div className="grid-xs">
          <label htmlFor="budgetCategory">Add to Wallet</label>
          <select name="budgetCategory" id="budgetCategory" required>
            {/* If budgets is empty, show a placeholder */}
            {budgets?.length === 0 && <option value="">No Wallets Available</option>}
            {budgets?.map((budget) => (
              <option key={budget.id} value={budget.id}>
                {budget.name}
              </option>
            ))}
          </select>
        </div>

        {/* Hidden action for the dashboardAction toggle */}
        <input type="hidden" name="_action" value="addIncome" />
        
        <button type="submit" className="btn btn--dark">
          <span>Deposit to Wallet </span><ArrowDownCircleIcon width={20} />
        </button>
      </Form>
    </div>
  );
};

export default AddIncomeForm;