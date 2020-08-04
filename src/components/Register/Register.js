import React from 'react';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '' 
        }
    }

    onEmailChange = (event) => {
        this.setState(
            {email: event.target.value}
        )
    }

    onNameChange = (event) => {
        this.setState(
            {name: event.target.value}
        )
    }

    onPasswordChange = (event) => {
        this.setState(
            {password: event.target.value}
        )
    }

    onSubmitRegister = async () => {

        if (this.state.email === '' || !this.state.email.includes('@') || this.state.name === '' || this.state.password === '' ){
            alert('Invalid details');
        } else {
            const resp = await fetch('https://facialrecognition-api.herokuapp.com/register', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                name: this.state.name,
                password: this.state.password
                })
            })
            const user = await resp.json();
            if (user.name === this.state.name) {
                this.props.onRouteChange('signin')
                alert('Registration Successful')
            }
        }
        
    }

    render(){
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address" 
                                    required
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name" 
                                onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password" 
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                        <input 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register" 
                            onClick={this.onSubmitRegister}
                        />
                        </div>
                    </div>
                </main>
            </article>
        )
    }
    
}

export default Register;