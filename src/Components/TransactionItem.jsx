import { Link, useFetcher } from "react-router-dom";
import { formatCurrency, formatDateToLocaleString, getAllMatchingItems } from "../helpers"
import { TrashIcon } from "@heroicons/react/16/solid";

const ExpenseItem = ({ expense, showBudget }) => {
    const fetcher = useFetcher();

const isIncome = transaction.type === "income";

    const budget = getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: isIncome ? transaction.budgetId : transaction.budgetId,
    })[0];
return (
        <>
          <td>{transaction.name}</td>   
          <td className={isIncome ? "text-accent" : ""}>
            {isIncome ? `+${formatCurrency(transaction.amount)}` : formatCurrency(transaction.amount)}
          </td>
          <td>{formatDateToLocaleString(transaction.createdAt)}</td> 
          {showBudget && (
            <td>
                <Link 
                    to={`/budget/${budget.id}`} 
                    style={{"--accent": budget.color}}
                >
                    {budget.name} 
                </Link>
            </td>
          )}  
          <td>
            <fetcher.Form method="post">
                {/* Dynamically set action based on type */}
                <input type="hidden" name="_action" value={isIncome ? "deleteIncome" : "deleteExpense"} />
                <input type="hidden" name="transactionId" value={transaction.id} />
                <button 
                    type="submit" 
                    className="btn btn--warning" 
                    aria-label={`Delete ${transaction.name}`}
                >
                    <TrashIcon width={20} />
                </button>
            </fetcher.Form>
          </td>
        </>
    )
}

export default ExpenseItem 