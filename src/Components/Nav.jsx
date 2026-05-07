import { Form, NavLink } from "react-router-dom";
import logomark from "../assets/footprint.svg"
import { TrashIcon } from "@heroicons/react/16/solid";


const Nav = ({userName}) => {
    return (
            <nav>
                <NavLink to="/" aria-label="Go To Home">
                <img src={logomark} height={30} alt="" />
                <span>BudgetSaurus</span>
                </NavLink>
                {
                    userName && (
                        <Form method="post" action="/logout" onSubmit={(event) => {
                            if (!confirm("Delete User?")) {event.preventDefault()}
                        }}>
                            <button type="submit" className="btn btn--warning"><span>DELETE USER</span>
                            <TrashIcon width={20} />
                            </button>
                        </Form>
                    )
                }
            </nav>
    )
}
export default Nav;