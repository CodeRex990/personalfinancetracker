import { UserPlusIcon } from "@heroicons/react/16/solid"
import { Form } from "react-router-dom"
import illustration from "../assets/illustration.png"

const Intro = () => {
    return (
        <div className="intro">
            <div>
                <h1>
                    Small Savings, <span className="accent">Giant Impact</span>
                </h1>
                <p>
                    It’s time to get "Saur-ious" about your finances. No meteor showers allowed here.
                </p>
                <Form method="post">
                    <input type="text" name="userName" required placeholder="Name?" aria-label="Your Name"
                    autoComplete="given-name" />
                    <input type="hidden" name="_action" value="newUser" />
                    <button type="submit" className="btn btn--dark">
                        <span>Create User</span>
                        <UserPlusIcon width={20} />
                    </button>
                </Form>
            </div>
            <img src= {illustration} alt="Person money" width={600} />
        </div>
    )
}

export default Intro