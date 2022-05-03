import { useState } from "react";
import { signInWithGoogle, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from "../../contexts/user.context";
import './sign-in-form.styles.scss'

const defaultFormField = {
    email: '',
    password: ''
}
const SignInForm = () => {
    const [formField, setFormField] = useState(defaultFormField);
    const { email, password } = formField;
    const resetFormFields = () => {
        setFormField(defaultFormField);
    }

    const SignInWithGoogle = async () => {
        await signInWithGoogle();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            if (error.code === "auth/wrong-password") {
                alert("incorrect password for email");
            }
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        // update object with name and value to all field of formField
        setFormField({ ...formField, [name]: value })
    }
    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />

                <FormInput
                    label='Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={SignInWithGoogle}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;