import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import styled from 'styled-components';

const Headline = styled.h1`
text-decoration: underline;
`
const SubHead = styled.h3`
border: 2px solid black;
background-color: red;

`

const Button = styled.button`
border-radius: 25px;
background-color: lavender;
color: red;
margin: 5% 30%;
`

const Potluck = () => {
 
    const [host, setHost] = useState()
    const [formState, setFormState] = useState({
        name: '',
        date: '',
        time: '',
        dish: false
        // appetizer: false,
        // entree: false,
        // sides: false,
        // dessert: false
    })


    let formSchema = yup.object().shape({
        name: yup.string().required('Please provide your name'),
        date: yup.string().required('Must choose a date.'),
        time: yup.string().required('Must choose a time.'),
        dish: yup.boolean().oneOf([true], 'Must check at least one box!')

});



    const formSubmit = e => {
        e.preventDefault();
        console.log('form submitted',);
        axios.post('https://backend-bw.herokuapp.com/potluck')
            .then(response => {
                setHost(response.data)
                console.log(response.data)
                console.log('form submitted success', host)
             })
        
            .catch(err => console.log('error', err));
    };

    const validateChange = e => {
        e.persist();

    }

    const inputChange = e => {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormState({ ...formState, [e.target.name]: value });
        validateChange(e);
    }

    return (
        <div className='potluck'>
            <Headline>Host Form</Headline>
            <SubHead>**Please use this form to create a potluck and indicate your preferences.**</SubHead>
        
            <form onSubmit={formSubmit}> 
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' onChange={inputChange} value={formState.name}/>
                <label htmlFor='date'>Date</label>
                <input type='date'  min='2018-01-01' max='2030-12-31'/>
                <label htmlFor='time'>Time</label>
                <input type='time'/>
                <label htmlFor='items'>Dishes Reqested</label>
                <br></br>
                <div>
                    <input className='appetizer' name='dish' type='checkbox'  />Appetizer
                </div>
                <br></br>
                <div>
                    <input className='entree' name='dish' type='checkbox' />Entree
                </div>
                <br></br>
                <div>
                    <input className='side' name='dish' type='checkbox' />Sides
                </div>
                <br></br>
                <div>
                    <input className='dessert' name='dish' type='checkbox' /> Dessert
                </div>
                <br></br>
                
               
                <Button>Enter</Button>
            </form>
        </div>
    )

}

export default Potluck;