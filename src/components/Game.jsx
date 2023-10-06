
import { useCallback, useEffect, useMemo, useState } from 'react';
import '../Styles/Game.css'
import '../Styles/Card.css'

import {Images} from "./Images";
const Game = ({data, setData}) => {

    const [showCard, setshowCard] = useState(false);

    const imageToPlay = useMemo(() => {
        const arrayEmpty = [];

        for(let i = 0; i<data.level;){
            let randomImage = Math.floor(Math.random()*Images.length);
            if(!arrayEmpty.includes(randomImage)){
                arrayEmpty.push(randomImage);
                i++;
            }
        }
        return arrayEmpty;

    }, [data.level]);
    const imageToPlay2 = useMemo(() => {
        return imageToPlay;
    })
    console.log(showCard)
    return (
        <div className="divGame">
            <div className={'divGame_Cards' + ' l' +data.level}>
                {imageToPlay.map((value, i) => (
                    <img key={i} src={showCard ? Images[value] : './src/ImagesBackground/background.jpg'} className={showCard ? 'showCard' : 'hideCard'} onClick={()=>(
                        setshowCard(true)
                    )} />
                ))}
            </div>
            <button onClick={
                () => setData((...previousData) =>({...previousData, play: false}))}>
                    Exit</button>
        </div>

    );

}

export default Game;