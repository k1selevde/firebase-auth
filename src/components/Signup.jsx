import React, {useRef, useState} from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const { signup } = useAuth()

    const [error, setError] = useState()

    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()


        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError('Failed to to create an account')
        }

        setLoading(false)
    }


    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign up</h2>
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
                    <Form.Group id="password-confirm">
                        <Form.Label>Password confirm</Form.Label>
                        <Form.Control ref={passwordConfirmRef} type="password" required />
                    </Form.Group>

                    <Button
                        disabled={loading}
                        className="w-100 text-center mt-2"
                        type="submit"
                    >Sign Up</Button>
                </Form>

                <div className="w-100 text-center mt-2">
                    Already hava an account? <Link to="/signin">Log in</Link>
                </div>

            </Card>
        </>
    )
}