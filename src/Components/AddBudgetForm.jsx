import { CurrencyDollarIcon } from "@heroicons/react/16/solid"
import { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom"

const AddBudgetForm = () => {
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
            <h2 className=""> 
                <span className="accent">Initialize</span> Wallet
            </h2>
            <fetcher.Form method="post" className="grid-sm" ref={formRef}>
            <div className="grid-xs">
                <label htmlFor="newBudget">Wallet Name</label>
                <input type="text" name="newBudget"
                id="newBudget" placeholder="e.g., E-Wallets" required ref={focusRef} />
            </div>

            <div className="grid-xs">
                <label htmlFor="newBudgetAmount">Allocation Amount</label>
                <input type="number" step="0.01" name="newBudgetAmount" id="newBudgetAmount"
                placeholder="₱0.00" required inputMode="decimal" />
            </div>
            <input type="hidden" name="_action" value="createBudget" />
            <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                {
                    isSubmitting ?  <span>Submitting Wallet</span> : (
                        <>
                        <span>Add Wallet</span>
                        <CurrencyDollarIcon width={20} /></>
                    )

                }
            </button>
            </fetcher.Form>
        </div>
    )
}

export default AddBudgetForm