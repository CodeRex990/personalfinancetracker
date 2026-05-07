import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/16/solid"
import { useRouteError, Link, useNavigate } from "react-router-dom"

const Error = () => {
    const error = useRouteError();
    const navigate =useNavigate();
    return (
        <div className="error">
            <h1>Oh oh</h1>
            <p>{error.message || error.status}</p>
            <div className="flex-md">
                <button className="btn btn--dark" onClick={() => navigate(-1)}>
                    <ArrowUturnLeftIcon width={20} />
                    <span>Go Back</span>
                </button>
                    <Link to="/" className="btn btn--dark" >
                    <HomeIcon width={20}/>
                    <span>Go Home</span>
                    </Link>
            </div>
        </div>
    )
}
export default Error