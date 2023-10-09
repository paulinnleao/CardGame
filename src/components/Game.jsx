
import { useEffect, useMemo, useState } from 'react';
import '../Styles/Game.css'
import '../Styles/Card.css'

import {Images} from "./Images";



const Game = ({data, setData}) => {

    const [showCardOne, setShowCardOne] = useState([]);
    const [showCardTwo, setShowCardTwo] = useState([]);
    const [verifyPairs, setVerifyPairs] = useState([]);

    const [pointsGame, setPointsGame] = useState(0);

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

    const firstCard = (i, cardSelected) => {
        setShowCardOne((e) => {
            e[i]=true;
            return [...e];
        });
        setVerifyPairs((...previous)=>[...previous, cardSelected]);
        console.log("VerifyPairs: " + verifyPairs)
    };
    const secondCard = (i) => {
        setShowCardTwo((e) => {
            e[i]=true;
            return [...e];
        });console.log("Hi 2 + " + verifyPairs);
        
    };


    useEffect(() => {
        console.log(verifyPairs[0] + " - " + verifyPairs[1])
        if(verifyPairs[0]===verifyPairs[1] && (verifyPairs[0]!==null || verifyPairs[0]!==undefined)){
            setVerifyPairs([]);
            setPointsGame(pointsGame+100);
        }else{
            setVerifyPairs([]);
        }
    },[setVerifyPairs]);

    useEffect(() => {
        const arrayEmpty = [];
        for(let i = 0; i<data.level;i++){
            arrayEmpty.push(false);
        }
        setShowCardOne(arrayEmpty);
        setShowCardTwo(arrayEmpty);
        },[setShowCardOne, setShowCardTwo, data.level]);
    
    return (
        <div className="divGame">
            <div className={'divGame_Cards ' + data.class}>
                {imageToPlay.map((value, i) => (
                    <img 
                     key={i}
                     src={showCardOne[i] ? Images[value] : './src/ImagesBackground/background.jpg'}
                     className={showCardOne[i] ? 'showCard' : 'hideCard'}
                     onClick={()=>{

                        if(!showCardOne[i] && (verifyPairs.length <= 1)){
                            console.log(verifyPairs+" - "+verifyPairs.length)
                            if(verifyPairs[0] === null || verifyPairs[0] === undefined){
                                // firstCard(i, Images[value]);
                                setVerifyPairs((...previous) => [...previous, 1, 2])
                                setShowCardTwo((e) => {
                                    e[i]=true;
                                    return [...e];
                                });
                                console.log("ON");
                            }else if(verifyPairs[1] === null || verifyPairs[1] === undefined){
                                // secondCard(i, Images[value]);

                            }
                        }else{
                            setVerifyPairs([]);
                            console.log("OFF" + verifyPairs.length);
                            setShowCardTwo((e) => {
                                e[i]=false;
                                return [...e];
                            });
                        }

                    }} />
                ))}
                {imageToPlay.map((value, i) => (
                    <img
                     key={i}
                     src={showCardTwo[i] ? Images[value] : './src/ImagesBackground/background.jpg'} 
                     className={showCardTwo[i] ? 'showCard' : 'hideCard'} 
                     onClick={()=>{
                        setShowCardTwo((e) => {
                            e[i]=true;
                            return [...e];
                        })
                    }} />
                ))}
            </div>
            <button onClick={
                () => setData((...previousData) =>({...previousData, play: false}))}>
                    Exit</button>
        </div>
    );

}

export default Game;