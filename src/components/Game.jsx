
import { useEffect, useMemo, useState } from 'react';
import '../Styles/Game.css'
import '../Styles/Card.css'

// import {Images} from "./Images";













import global from '../Images/aquecimento-global.png';
import stick from '../Images/bastao.png';
import binoculars from '../Images/binoculos.png';
import coffin from '../Images/caixao.png';
import camera from '../Images/camera-cinematografica.png';
import rain from '../Images/chuva.png';
import elixir from '../Images/elixir.png';
import flamenco from '../Images/flamenco.png';
import cat from '../Images/gato-preto.png';
import pumpkin from '../Images/jack-o-lanterna.png';
import moon from '../Images/lua-cheia.png';
import museum from '../Images/museu.png';
import sunrise from '../Images/nascer-do-sol.png';
import sun from '../Images/sol.png';
import mat from '../Images/tapete-vermelho.png';
import vase from '../Images/vaso.png';

const Images = [
            {image: global, status: false, found: false},
            {image: global, status: false, found: false},
            {image: stick, status: false, found: false},
            {image: stick, status: false, found: false},
            {image: binoculars, status: false, found: false},
            {image: binoculars, status: false, found: false},
            {image: coffin, status: false, found: false},
            {image: coffin, status: false, found: false},
            {image: camera, status: false, found: false},
            {image: camera, status: false, found: false},
            {image: rain, status: false, found: false},
            {image: rain, status: false, found: false},
            {image: elixir, status: false, found: false},
            {image: elixir, status: false, found: false},
            {image: flamenco, status: false, found: false},
            {image: flamenco, status: false, found: false},
            {image: cat, status: false, found: false},
            {image: cat, status: false, found: false},
            {image: pumpkin, status: false, found: false},
            {image: pumpkin, status: false, found: false},
            {image: moon, status: false, found: false},
            {image: moon, status: false, found: false},
            {image: museum, status: false, found: false},
            {image: museum, status: false, found: false},
            {image: sunrise, status: false, found: false},
            {image: sunrise, status: false, found: false},
            {image: sun, status: false, found: false},
            {image: sun, status: false, found: false},
            {image: mat, status: false, found: false},
            {image: mat, status: false, found: false},
            {image: vase, status: false, found: false},
            {image: vase, status: false, found: false},
        ];


























import thisPunch from '../songs/punch.mp3';
import thisSoda from '../songs/soda.mp3';
import thisSurprise from '../songs/surprise.mp3';

import BackgroundImageCard from '../ImagesBackground/background.jpg'


const Game = ({data, setData}) => {
    const [punch] = useState(new Audio(".."+thisPunch));
    const [soda] = useState(new Audio(".."+thisSoda));
    const [surprise] = useState(new Audio(".."+thisSurprise));
    
    const [pointsGame, setPointsGame] = useState(0);
    
    const [verifyCards, setVerifyCards] = useState([]);
    const [imageToPlay, setImageToPlay] = useState([]);

    const [counterLevel, setCounterLevel] = useState(0);
    const [refretchPage, setRefretchPage] = useState(false);

    useEffect(() => {
        const arrayEmpty = [];
        for(let i = 0; i<data.level*2;){
            let randomImage = Math.floor(Math.random()*(data.level*2));
            if(!arrayEmpty.includes(randomImage)){
                arrayEmpty.push(randomImage);
                i++;
            }
        }
        const imageToPlay2 = [...imageToPlay];
        arrayEmpty.forEach((i) => {
            imageToPlay2.push(Images[i]);
            setImageToPlay(imageToPlay2);
        })
    },[data.level]);

    const verify = () => {
        if(imageToPlay[verifyCards[0]].image===imageToPlay[verifyCards[1]].image){
            soda.play();
            setPointsGame(pointsGame+(data.level/2));
            const updateImageToPlay = [...imageToPlay];
            updateImageToPlay[verifyCards[0]].found=true;
            updateImageToPlay[verifyCards[1]].found=true;
            setImageToPlay(updateImageToPlay);
            setCounterLevel(counterLevel+1);
        }else{
            surprise.play();
            const updateImageToPlay = [...imageToPlay];
            updateImageToPlay[verifyCards[0]].status=false;
            updateImageToPlay[verifyCards[1]].status=false;
            setImageToPlay(updateImageToPlay);
        }
        setVerifyCards([]);
    }
    const resetAll = () => {
        const resetArray = imageToPlay.map((item)=>{
            item.status = false;
            item.found = false;
            return item;
        });
        setVerifyCards([]);
        setImageToPlay(resetArray);

    }
    useEffect(() => {
        if(counterLevel===data.level){
            resetAll();
            const updateDataGame = {...data};
            updateDataGame.play = false;
            updateDataGame.points = pointsGame+data.points;
            updateDataGame.endGame = true;
            setData(updateDataGame);
        }
    }, [refretchPage, data.level, verifyCards]);
    return (
         <div className="divGame">
            <h1>Accumulated points : <b>{pointsGame}</b> </h1>
            <div className={'divGame_Cards ' + data.class}>
                {imageToPlay.map((value, i) => (
                    <img 
                     key={i}
                     src={value.status ? '.'+value.image : BackgroundImageCard}
                     className={value.status ? 'showCard' : 'hideCard'}
                     onClick={()=>{
                        console.log(value.image)
                        if(verifyCards.length<2 && !value.status){
                            if(!value.found){
                                punch.play();
                                const updateVerifyCards = [...verifyCards, i];
                                setVerifyCards(updateVerifyCards);

                                const updatedImageToPlay = [...imageToPlay];
                                updatedImageToPlay[i].status = true;
                                setImageToPlay(updatedImageToPlay);

                                setRefretchPage(!refretchPage);
                            }
                        }
                        else{
                            verify();
                        }
                    }} />
                ))}
            </div>
            <button 
            onClick={() => {
                var answer = window.confirm("Are you sure? Don't worry, your points will be retained.");
                if(answer){
                    resetAll();
                    const updateDataGame = {...data};
                    updateDataGame.play = false;
                    updateDataGame.points = pointsGame+data.points;
                    setData(updateDataGame);
                }
                    }
                }>
                    Exit
                </button>

        </div>
    );

}

export default Game;