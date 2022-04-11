import {Link} from "react-router-dom";
import {LinkProps} from "react-router-dom";

function CustomLink({ children, to, ...props }: LinkProps) {

    return (
        <div>
            <Link
                to={to}
                {...props}
                className={ props.className }
            >
                {children}
            </Link>
        </div>
    );
}


export default CustomLink;