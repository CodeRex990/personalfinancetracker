import { Form, Link } from "react-router-dom";
import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../helpers";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/16/solid";

const BudgetItem = ({ budget, showDelete = false }) => {
    const {id, name, amount, color} = budget;
    const spent = calculateSpentByBudget(id);

    return (
        <div className="budget" style={{"--accent": color}}>
            <div className="progess-text">
                <h3>{name}</h3>
                <p>{formatCurrency(amount)}</p>
            </div>
            <progress max={amount} value={spent}>
                {formatPercentage(spent / amount)}
            </progress>
            <div className="progress-text">
                <small>{formatCurrency(spent)} spent</small>
                <small>{formatCurrency(amount - spent)} remaining</small>
            </div>
            {
                showDelete ? (
                    <div className="flex-sm">
                    <Form method="post" action="delete" onSubmit={(event) => {
                        if(!confirm("Are you sure about that"))
                        {event.preventDefault}
                    }}>
                <button className="btn" type="submit">
                    <span>Delete Budget</span>
                    <TrashIcon width={20} />
                </button>            

                    </Form>
                    </div>
                ) : (
                    <div className="flex-sm">
                    <Link to={`/budget/${id}`} className="btn">
                        <span>View Details</span>
                        <BanknotesIcon width={20} />
                    </Link>
                    </div>
                ) 
            }
        </div>
    )
}

export default BudgetItem