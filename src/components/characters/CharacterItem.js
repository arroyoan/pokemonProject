import React, { useState, useEffect} from 'react'
import axios from 'axios'

const CharacterItem = ({item}) => {
    const [character, setCharacter] = useState('');
    const [picUrl, setPicUrl] = useState('');
    const [pokeType, setPokeType] = useState('');
    const [abilities, setAbilities] = useState('');
    const [pokeName, setPokeName] = useState('');
    const [pokeHeightFeet, setHeightFeet] =useState('');
    const [pokeHeightInch, setHeightInch] =useState('');

    useEffect (() => {
        //this captilizes the first letter
        const camelCase = (word) => {
            //gets the first letter and capitilizes it
            //then it adds it to slice of the rest of the word
            return word.charAt(0).toUpperCase() + word.slice(1);
        }

        const getTypes = (charResult) => {
            //this gets the types json info
            const types = charResult['types'];

            //this makes an empty string where the formatted data will be placed
            var strTypes= '';
            //this gets the length of the json so only called once
            var numTypes=types.length
            
            var i;

            //will iterate through and get all types
            for(i  = 0; i< numTypes;i++){
                var typeName=types[i].type.name
                if(i<(numTypes-1))
                    strTypes+=(camelCase(typeName) +', ');
                else
                    strTypes+=camelCase(typeName);
            }
            //sets the type in the useState
            setPokeType(strTypes);

        }

        const getAbilities = (charResult) => {
            //this gets the abilities json info
            const abilities = charResult['abilities'];

            //this makes an empty string where the formatted data will be placed
            var strAbil= '';
            //this gets the length of the json so only called once
            var numAbil=abilities.length
            
            var i;

            //will iterate through and get all types
            for(i  = 0; i< numAbil;i++){
                var abilName=abilities[i].ability.name
                if(i<(numAbil-1))
                    strAbil+=(camelCase(abilName) +', ');
                else
                    strAbil+=camelCase(abilName);
            }

            //sets the type in the useState
            setAbilities(strAbil);
        }

        const getHeight = (charResult) => {
            // this multiply the height by 3.937 to convert to inches
            var heightInch = (charResult.height * 3.937);

            //this multiplies gets the height in feet
            var heightFeet = (heightInch/12)|0;

            //this gets the remaining inches and truncates the decimal off
            heightInch = (heightInch - heightFeet*12)|0;
            
            //sets the feet in the state
            setHeightFeet(heightFeet);

            //sets the height in inches
            setHeightInch(heightInch);
        }

        const fetchCharacter = async () => {
            //this uses axios to make the api call to the pokeapi
            const result  = await axios(`${item.url}`);

            //this parses calls a helper functions that parses the type of pokemon
            // from the json returned
            getTypes(result.data);

            //this gets the abilities from json
            getAbilities(result.data);

            //this gets turns the height from decimetere to feet
            getHeight(result.data);

            //this gets the character information and stores in the useState
            //to be used later
            setCharacter(result.data);

            //this capitlizes the first name of the pokemon
            setPokeName(camelCase(result.data.name))

            //this calls the a second api that gets the picture to display as
            //the card front
            setPicUrl(`https://pokeres.bastionbot.org/images/pokemon/${result.data.id}.png`);
        }

        //this calls the function above that gets all the necessary character info
        fetchCharacter();
    },[])

    return (
    <div className='card'>
        <div className='card-inner'>
            <div className='card-front'>
                <img src={picUrl} alt='' className='card-image' />
            </div>
            <div className='card-back'>
                <h1>{pokeName}</h1>
                <hr></hr>
                <p><strong>Type</strong>: {pokeType}</p>
                <p><strong>Height</strong>: {pokeHeightFeet}' {pokeHeightInch}"</p>
                <p><strong>Abilities</strong>: {abilities} </p>
            </div>
        </div>
    </div>
    )
}

export default CharacterItem