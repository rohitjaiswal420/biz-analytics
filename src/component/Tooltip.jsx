import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";



export default function Tooltip({ message }) {
    return (
        <div className="tooltipSec success">
            <span><FontAwesomeIcon icon={faThumbsUp} /></span>
            {message}

        </div>
    )
}
