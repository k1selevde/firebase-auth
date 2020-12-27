import React, {useRef, useState} from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function UpdateProfile() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const { currentUser, updatePassword, updateEmail } = useAuth()

    const [error, setError] = useState()

    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/')
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false)
        })
    }


    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                </Card.Body>

                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            ref={emailRef}
                            type="email"
                            defaultValue={currentUser.email}
                        />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            placeholder="Leave blank to keep the same"
                            ref={passwordRef}
                            type="password"
                        />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password confirm</Form.Label>
                        <Form.Control
                            placeholder="Leave blank to keep the same"
                            ref={passwordConfirmRef}
                            type="password"
                        />
                    </Form.Group>
                    <Button
                        disabled={loading}
                        className="w-100 text-center mt-2"
                        type="submit"
                    >Update profile</Button>
                </Form>

                <div className="w-100 text-center mt-2">
                    <Link to="/">Cancel</Link>
                </div>

            </Card>
        </>
    )
}