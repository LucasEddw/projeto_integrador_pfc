var passwordInput;
var passwordInputViewBtn;




async function usuarioCadastrar() {
    let usuario = new Usuario(
        '',
        document.getElementById('card-name-input').value,
        document.getElementById('card-email-input').value,
        document.getElementById('card-password-input').value
    );
    if (await cadastrar(usuario)) {
        alert("Usuário cadastrado com êxito!");
        window.location.href = window.location.href.replace('cadastrar', 'entrar');
    } else {
        alert("Falha ao cadastrar! Tente novamente.");
    }
}



async function usuarioEntrar() {
    let usuario = new Usuario(
        '',
        '',
        document.getElementById('card-email-input').value,
        document.getElementById('card-password-input').value
    );
    if (await entrar(usuario)) {
        // document.getElementById("user_name").innerText = usuario.nome;
        // document.getElementById("user_email").innerText = usuario.email;
        console.log(usuario);
        alert("Usuário entrado com êxito!");
        window.location.href = window.location.href.replace('entrar', 'leitor');
    } else {
        alert("Falha ao entrar! Tente novamente.");
    }
}

async function postarComentarioForm() {

    if (typeof usuario == "undefined") {
        alert("Entre em uma conta para comentar.");
    }

    if (confirm("Atenção! Esteja ciente de que comentar, o comentário será apagado ao enviar uma solicitação de remoção ao nosso email: inosanima@gmail.com")) {
        let comentario = new Comentario(
            '',
            '',
            document.getElementById('comment_input').value,
            '0',
            usuario.id
        );
        if (document.getElementById('comment_input').value.replaceAll(' ', '') == '') {
            alert("Não é possível postar um comentário vazio.");
            return
        } if (await postarComentario(comentario)) {
            alert("Comentário postado com êxito!");
            window.location.href = window.location.href.replace('leitor', 'leitor');
        } else {
            alert("Falha ao Comentar! Tente novamente.");
        }

    } else {
        document.getElementById('comment_input').value = '';
        location.reload();
    }


}

// async function darLikeForm() {
//     let comentario = new Comentario(
//         '',
//         '',
//         document.getElementById('comment_input').value,
//         '0',
//         usuario.id
//     );
//     if (await postarComentario(comentario)) {
//         alert("Comentário postado com êxito!");
//         window.location.href = window.location.href.replace('leitor', 'leitor');
//     } else {
//         alert("Falha ao Comentar! Tente novamente.");
//     }
// }

window.onload = (e) => {
    passwordInput = document.getElementById('card-password-input');
    passwordInputViewBtn = document.getElementById('card-password-input-view');
    passwordInputViewBtn.addEventListener('click', () => {
        passwordInputViewBtn.classList.toggle('fa-lock-open');
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    })
}

