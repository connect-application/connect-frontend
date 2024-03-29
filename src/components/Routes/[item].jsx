    import { ArrowBackIcon } from "../Icons";
    import { Link } from "react-router-dom";

    const Item = (props) => {
    const { page } = props;
    if (page === "homepage") {
        return <div id="page">{page}</div>;
    } else {
        return (
        <div id="page">
            <Link to="/">
            <button className="btn">
                <ArrowBackIcon /> Back to Home
            </button>
            </Link>
            {page}
        </div>
        );
    }
    };

    export default Item;