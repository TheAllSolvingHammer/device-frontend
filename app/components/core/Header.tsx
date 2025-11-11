import { Link, useNavigate } from 'react-router'
import { useAuth } from '../auth/AuthProvider'
import { Button } from '../ui/button'
export function Header() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate('/')
    }
    return (
        <header className='border-b bg-background'>
            <div className='container mx-auto flex h-16 items-center
justify-between px-4'>
                <div>
                    <Link to='/' className='text-xl font-bold tracking-tight'>
                        React App
                    </Link>
                </div>
                <div className='flex items-center gap-4'>
                    {user && (
                        <>
<span className='text-sm text-muted-foreground'>
Добре дошли, {user.fullName}!
</span>
                            <Button onClick={handleLogout} variant='outline'
                                    size='sm'>
                                Изход
                            </Button>
                        </>
                    )}
                    {!user && (
                        <Button asChild size='sm'>
                            <Link to='/login'>Вход</Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}
