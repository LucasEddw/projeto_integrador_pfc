let comentarioBox;

async function postarComentario(comentario) {

    try {
        let supabase = await getSupabaseClient()
        const { error } = await supabase
            .from('comentario')
            .insert({
                texto: comentario.texto,
                curtidas: comentario.curtidas,
                id_usuario: comentario.id_usuario
            })

        if (error) {
            throw new Error('Comentário Inválido!');
        }
        return error == null;
    }
    catch (error) {
        console.error(new Error(`Erro ao tentar cadastrar conta: ${error.message}`));
    }
}



function criarComentarioElemento(comentario) {
    let comentarioCard = document.createElement('div');
    comentarioCard.classList.add('comment');

    let comentarioUser = document.createElement('div');
    comentarioUser.classList.add('comment-user');
    
    let comentarioUserPfp = document.createElement('img');
    comentarioUserPfp.src = '#';
    comentarioUserPfp.alt = 'foto-de-perfil';
    comentarioUser.appendChild(comentarioUserPfp);

    let comentarioUserInfo = document.createElement('div')

    let comentarioUserName = document.createElement('p');
    comentarioUserName.innerText = comentario.usuario.nome;
    let comentarioUserDate = document.createElement('span');
    comentarioUserDate.innerText = comentario.data_do_comentario.substring(0, 10).replaceAll('-', '/');
    comentarioUserInfo.appendChild(comentarioUserName);
    comentarioUserInfo.appendChild(comentarioUserDate);


    let comentarioContent = document.createElement('div');
    comentarioContent.classList.add('comment-content');

    let comentarioContentTexto = document.createElement('p');
    comentarioContentTexto.innerText = comentario.texto;
    
    let comentarioContentLike = document.createElement('div');

    let comentarioContentLikeIcon = document.createElement('i');
    comentarioContentLikeIcon.classList.add('fa-regular');
    comentarioContentLikeIcon.classList.add('fa-heart');
    
    let comentarioContentLikeCount = document.createElement('span');
    comentarioContentLikeCount.innerText = comentario.curtidas;
    
    comentarioContentLike.appendChild(comentarioContentLikeIcon);
    comentarioContentLike.appendChild(comentarioContentLikeCount);
    comentarioContent.appendChild(comentarioContentTexto);
    comentarioContent.appendChild(comentarioContentLike);
    comentarioUser.appendChild(comentarioUserPfp);
    comentarioUser.appendChild(comentarioUserInfo);
    comentarioCard.appendChild(comentarioUser);
    comentarioCard.appendChild(comentarioContent);

    return comentarioCard;
}



async function buscarComentario() {

    try {
        let supabase = await getSupabaseClient()



        const { data, error } = await supabase
            .from('comentario')
            .select(`
                id,
                data_do_comentario,
                texto,
                curtidas,
                usuario: id_usuario (
                    id,
                    nome
                )
            `);

        if (error) {
            throw new Error('Erro pra buscar comentário!');
        }


        data.forEach(comentario => {
            comentarioBox.appendChild(criarComentarioElemento(comentario));
        });

        return error == null;

    }
    catch (error) {
        console.error(new Error(`Erro ao tentar entrar na conta: ${error.message}`));
    }

}

window.onload = (e) => {
    comentarioBox = document.getElementById("comments");
    buscarComentario();
}
exports = { postarComentario };