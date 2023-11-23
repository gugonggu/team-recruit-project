import spinner from "../img/spinner.gif";
import { SpinnerContainer } from "../style/SpinnerCSS.js";

function Spinner() {
    return (
        <SpinnerContainer>
            <img src={spinner} alt="Loading..."></img>
            <p>잠시만 기다려주세요...</p>
        </SpinnerContainer>
    );
}

export default Spinner;
