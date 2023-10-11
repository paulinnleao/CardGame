import { useState } from "react";
import thisTadaa from "../songs/tadaa.mp3";

const EndGame = ({data, setData}) => {
    const [tadaa] = useState(new Audio(".."+thisTadaa));
    tadaa.play();
    return(
        <div className="EndGame">
            <h1>Very nice!</h1>
            <h2>Would you like to play another game or go back to the beginning?</h2>
            <button
            onClick={() => {
                const updateDataGame = {...data};
                    updateDataGame.play = true;
                    updateDataGame.endGame = false;
                    setData(updateDataGame);
                }}>Play again</button>
            <button
            onClick={() => {
                const updateDataGame = {...data};
                    updateDataGame.endGame = false;
                    setData(updateDataGame);
                }}>Begin</button>
        </div>
    )

}

export default EndGame;