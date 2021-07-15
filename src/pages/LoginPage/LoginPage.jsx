import React, { useState } from 'react';
import './LoginPage.scss';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import userService from '../../utils/userService';
import { useHistory, Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

export default function LoginPage(props){
    const [error, setError ] = useState('')
    const [state, setState] = useState({
        email: '',
        password: '',
    })

    const history = useHistory();
    
    function handleChange(e){
      setState({
        ...state,
        [e.target.name]: e.target.value
      })
    }
   
    

    async function handleSubmit(e){
      e.preventDefault()
              
      try {
          await userService.login(state);
          // Route to wherever you want!
          props.handleSignUpOrLogin()
          history.push('/')
          
        } catch (err) {
          // Invalid user data (probably duplicate email)
          setError(err.message)
        }
    }

    return (
        <div className="full-screen-container">
          <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' style={{ color: 'white' }} textAlign='center'>
                Sheet Music Maker
            </Header>
            <Form  autoComplete="off"  onSubmit={handleSubmit}>
               <Segment style={{ backgroundColor: 'rgba(200,200,200,.6)'}} stacked>
                  <Form.Input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={state.email}
                    onChange={handleChange}
                    required
                  />
                  <Form.Input
                    name="password"
                    type="password"
                    placeholder="password"
                    value={state.password}
                    onChange={handleChange}
                    required
                  />
                <Button
                  color='youtube'
                  fluid size='large'
                  type="submit"
                  className="btn"
                >
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              Not a user yet? <Link to='/signup'>Sign Up</Link>
            </Message>
            {error ? <ErrorMessage error={error} /> : null}
            </Grid.Column>
          </Grid>
          <div className="bg-top-container"><div className="inner-gradient-container"></div></div>
          <div className="bg-bottom-container"></div>
        </div>
      );
}

