
import { useEffect, useMemo, useState } from 'react';
import '../Styles/Game.css'
import '../Styles/Card.css'

import {Images} from "./Images";

const Game2 = ({data, setData}) =>{
    const [showCard, setShowCard] = useState(false);

    const [showCardArray, setShowCardArray] = useState([]);


     useEffect(() => {
        const arrayEmpty = [];
        for(let i = 0; i<data.level; i++){
            arrayEmpty.push(false);
        }
        setShowCardArray(arrayEmpty);
    },[setShowCardArray, showCardArray, data.level]);

    return (
        <div className="divGame">
            <div className={'divGame_Cards ' + data.class}>

                {Images.map((value, i) => (
                    <img 
                    key={i}
                    src={showCardArray[i] ? value : './src/ImagesBackground/background.jpg'}
                    onClick={()=>{
                        setShowCardArray((e)=>{
                            e[i]=true;
                            return [...e];
                        });
                    }}
                    />
                ))}
                {/* {imageToPlay.map((value, i) => (
                    <img 
                     key={i}
                     src={showCardOne[i] ? Images[value] : './src/ImagesBackground/background.jpg'}
                     className={showCardOne[i] ? 'showCard' : 'hideCard'}
                     onClick={()=>{

                        
                    }} />
                ))}
                {imageToPlay.map((value, i) => (
                    <img
                     key={i}
                     src={showCardTwo[i] ? Images[value] : './src/ImagesBackground/background.jpg'} 
                     className={showCardTwo[i] ? 'showCard' : 'hideCard'} 
                     onClick={()=>{
                        
                    }} />
                ))} */}
            </div>
            <button onClick={
                () => setData((...previousData) =>({...previousData, play: false}))}>
                    Exit</button>
        </div>
    );


}

export default Game2;