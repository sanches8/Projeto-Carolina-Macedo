import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://afityicmmtpsdousbixf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmaXR5aWNtbXRwc2RvdXNiaXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NzAxODUsImV4cCI6MjA2MjE0NjE4NX0.Ti0Ecq_09PptfKy7GqEN5mzZHHVp3AgfWriTOYTs8TA'
const supabase = createClient(supabaseUrl, supabaseKey)

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault()

    const email = document.getElementById('email')
    const password = document.getElementById('password')
    const loginButton = document.getElementById('loginButton')
    const messageDiv = document.getElementById('message')

    try {
        messageDiv.innerHTML = ''
        email.classList.remove('is-invalid')
        password.classList.remove('is-invalid')

        loginButton.disabled = true
        loginButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Entrando...'

        if (!email.value.trim()) {
            email.classList.add('is-invalid')
            throw new Error('Por favor, informe seu e-mail')
        }

        if (!password.value.trim()) {
            password.classList.add('is-invalid')
            throw new Error('Por favor, informe sua senha')
        }

<<<<<<< HEAD
=======
        // Validar formato do e-mail
>>>>>>> c1b5ac7a38619ca87750cb526ad96b3c7b237d99
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            email.classList.add('is-invalid')
            throw new Error('Por favor, informe um e-mail válido')
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value
        })

        if (error) throw error

<<<<<<< HEAD
        messageDiv.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show alert-fixed" role="alert">
                <i class="fas fa-check-circle me-2"></i>Login realizado com sucesso! Redirecionando...
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
=======
            =
            messageDiv.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show alert-fixed" role="alert">
    <i class="fas fa-check-circle me-2"></i>Login realizado com sucesso! Redirecionando...
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
>>>>>>> c1b5ac7a38619ca87750cb526ad96b3c7b237d99
        `

        localStorage.setItem('session', JSON.stringify(data.session))
        setTimeout(() => {
            window.location.href = 'dashboard.html'
        }, 1500)

    } catch (error) {
<<<<<<< HEAD
=======

>>>>>>> c1b5ac7a38619ca87750cb526ad96b3c7b237d99
        console.error('Erro no login:', error)

        let errorMessage = 'Erro durante o login'
        if (error.message.includes('Invalid login credentials')) {
            errorMessage = 'E-mail ou senha incorretos'
            email.classList.add('is-invalid')
            password.classList.add('is-invalid')
<<<<<<< HEAD
            messageDiv.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show alert-top" role="alert">
                    <i class="fas fa-exclamation-circle me-2"></i>${errorMessage}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `
        } else if (error.message.includes('Email not confirmed')) {
            errorMessage = 'E-mail não confirmado. Verifique sua caixa de entrada.'
            email.classList.add('is-invalid')
            messageDiv.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show alert-top" role="alert">
                    <i class="fas fa-exclamation-circle me-2"></i>${errorMessage}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `
        } else {
            errorMessage = error.message || 'Erro desconhecido ao tentar fazer login'
            messageDiv.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show alert-top" role="alert">
                    <i class="fas fa-exclamation-circle me-2"></i>${errorMessage}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `
        }

    } finally {
=======
        } else if (error.message.includes('Email not confirmed')) {
            errorMessage = 'E-mail não confirmado. Verifique sua caixa de entrada.'
            email.classList.add('is-invalid')
        } else {
            errorMessage = error.message || 'Erro desconhecido ao tentar fazer login'
        }

        messageDiv.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show alert-top" role="alert">
            <i class="fas fa-exclamation-circle me-2"></i>${errorMessage}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    } finally {
        // Restaurar botão
>>>>>>> c1b5ac7a38619ca87750cb526ad96b3c7b237d99
        if (loginButton) {
            loginButton.disabled = false
            loginButton.innerHTML = '<i class="fas fa-sign-in-alt me-2"></i>Entrar'
        }
    }
})
<<<<<<< HEAD
//Mensagem
=======

>>>>>>> c1b5ac7a38619ca87750cb526ad96b3c7b237d99
document.getElementById('forgotPasswordLink')?.addEventListener('click', async (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value.trim()
    const messageDiv = document.getElementById('message')
<<<<<<< HEAD
    const originalContent = document.getElementById('forgotPasswordLink').innerHTML
=======
>>>>>>> c1b5ac7a38619ca87750cb526ad96b3c7b237d99

    messageDiv.innerHTML = ''
    document.getElementById('email').classList.remove('is-invalid')

    if (!email) {
        messageDiv.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>Por favor, insira seu e-mail para recuperar a senha
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `
        document.getElementById('email').classList.add('is-invalid')
        return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('email').classList.add('is-invalid')
        messageDiv.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>Por favor, informe um e-mail válido
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `
        return
    }

    try {
<<<<<<< HEAD
        const forgotPasswordLink = document.getElementById('forgotPasswordLink')
=======

        const forgotPasswordLink = document.getElementById('forgotPasswordLink')
        const originalContent = forgotPasswordLink.innerHTML
>>>>>>> c1b5ac7a38619ca87750cb526ad96b3c7b237d99
        forgotPasswordLink.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...'

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'https://afityicmmtpsdousbixf.supabase.co/atualizar-senha.html'
        })

        if (error) throw error

        messageDiv.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <i class="fas fa-check-circle me-2"></i>E-mail de recuperação enviado para ${email.replace(/(.{2}).+@(.+)/, '$1***@$2')}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `
    } catch (error) {
        console.error('Erro na recuperação de senha:', error)
        messageDiv.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <i class="fas fa-exclamation-circle me-2"></i>Erro ao solicitar recuperação: ${error.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `
    } finally {
        const forgotPasswordLink = document.getElementById('forgotPasswordLink')
        if (forgotPasswordLink) {
            forgotPasswordLink.innerHTML = originalContent || 'Esqueceu sua senha?'
        }
    }
})