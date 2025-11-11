import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { useAuth } from './AuthProvider'
import useFetch from '~/lib/use-fetch.hook'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from
        '../ui/field'
import { Input } from '../ui/input'
import {loginSchema, type LoginData, type LoginResponse} from '~/models/auth.models'
import {getApiUrl} from "~/lib/utils";
import {Spinner} from "~/components/ui/spinner";
import {useEffect} from "react";
export function LoginForm() {
    const navigate = useNavigate()
    const location = useLocation()
    const { isAuthenticated, login } = useAuth()
    const from = location.state?.from?.pathname || '/'
    const { fetch, isLoadingRef, error } = useFetch<LoginResponse>()
    const form = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    })
    // if (isAuthenticated) {
    //     return <Navigate to='/' replace />
    // }


    if (isAuthenticated) {
        // optional guard for debugging
        console.log("Already authenticated — redirecting")
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', { replace: true })
        }
    }, [isAuthenticated, navigate])
    const onSubmit = async (data: LoginData) => {
        console.log("adsasddsadsa")
        if (isLoadingRef.current) {
            return
        }
        try {
            const apiUrl = getApiUrl('api/v1/users/login')
            const authResponse = await fetch(apiUrl, 'POST', data)
            login(authResponse)
            navigate(from, { replace: true })
        } catch (err) {
            console.error('Login error:', err)
            return
        }
    }

    return (
        <Card className='w-full max-w-sm'>
            <CardHeader>
                <CardTitle className='text-center'>
                    Вход в системата
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form id='login-form' onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name='username'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='username'>
                                        Потребителско име
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id='username'
                                        aria-invalid={fieldState.invalid}
                                        placeholder='Потребителско име'
                                        autoComplete='off'
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name='password'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='password'>Парола</FieldLabel>
                                    <Input
                                        {...field}
                                        id='password'
                                        aria-invalid={fieldState.invalid}
                                        placeholder='Парола'
                                        type='password'
                                        autoComplete='off'
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation='horizontal'>
                    <Button
                        className='w-full'
                        type='submit'
                        form='login-form'
                        disabled={isLoadingRef.current}
                    >
                        {isLoadingRef.current && <Spinner />}
                        Вход
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}