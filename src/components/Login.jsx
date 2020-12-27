import React, {useRef, useState} from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()

    const { login } = useAuth()

    const [error, setError] = useState()

    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()


        try {
            setLoading(true)
            setError('')
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch(e) {
            setError('Failed to sign in')
        }

        setLoading(false)
    }


    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                </Card.Body>

                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control ref={emailRef} type="email" required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control ref={passwordRef} type="password" required />
                    </Form.Group>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot password ? </Link>
                    </div>
                    <Button
                        disabled={loading}
                        className="w-100 text-center mt-2"
                        type="submit"
                    >Log in</Button>
                </Form>

                <div className="w-100 text-center mt-2">
                   Need an account? <Link to="signup">Sign Up</Link>
                </div>

            </Card>
        </>
    )
}