import { CurrencyDollarIcon, PlusCircleIcon } from "@heroicons/react/16/solid"
import { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";
import logoRex from "../assets/LogoRex2025.png";

const AddExpenseForm = ({budgets}) => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting"

    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if(!isSubmitting){
            formRef.current.reset()
            focusRef.current.focus()
        }
    }, [isSubmitting])

    return (
        <div className="form-wrapper">
            <div className="logo">
            <img src={logoRex} width={150} alt="" className="" />

            </div>
            <h2 className=""> 
                <span className="accent"> {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`} Purchase </span>
                History 
            </h2>
            <fetcher.Form method="post" className="grid-sm" ref={formRef}>

        <div className="expense-inputs">
            <div className="grid-xs" >
                <label htmlFor="newExpense">Purchased Item</label>
                <input type="text" name="newExpense"
                id="newExpense" placeholder="Item Name" required ref={focusRef} />
            </div>
        </div>

            <div className="grid-xs">
                <label htmlFor="newExpenseAmount">Price</label>
                <input type="number" step="0.01" name="newExpenseAmount" id="newExpenseAmount"
                placeholder="₱0.00" required inputMode="decimal" />
            </div>

            <div className="grid-xs">
                <label htmlFor="newExpenseBudget" hidden={budgets.length === 1}>Wallet Category</label>
                <select name="newExpenseBudget" id="newExpenseBudget" required>
                    {
                        budgets.sort((a, b) => a.createdAt - b.createdAt)
                        .map((budget) => {
                            return (
                                <option key={budget.id} value={budget.id}>{budget.name}</option>
                            )
                        })
                    }
                </select>
            </div>

            <input type="hidden" name="_action" value="createExpense" />
            <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                {
                    isSubmitting ?  <span>Submitting Purchased Item</span> : (
                        <>
                        <span>Record Purchase</span>
                        <PlusCircleIcon width={20} /></>
                    )
                }
            </button>
            </fetcher.Form>
        </div>
    )
}

export default AddExpenseForm 