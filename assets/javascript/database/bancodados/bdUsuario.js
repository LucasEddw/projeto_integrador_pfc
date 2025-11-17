
async function cadastrar(usuario) {
    console.log(usuario);

    try {
        let supabase = await getSupabaseClient()
        const { data, error } = await supabase.auth.signUp({
            email: usuario.email,
            password: usuario.senha,
        });

        if (error) {
            throw new Error('Email ou senha inválidos!');
        }

        usuario.id = data?.user?.id;
        if (error == null && usuario.id?.length > 0) {
            const { status: statusUser, data: dataUser, error: errorUser } = await supabase
                .from('usuario')
                .upsert(
                    {
                        'id': usuario.id,
                        'nome': usuario.nome,
                        'email': usuario.email,
                        'senha': usuario.senha
                    }
                )
                .select();
            return error == null && errorUser == null;
        }
    }
    catch (error) {
        console.error(new Error(`Erro ao tentar cadastrar conta: ${error.message}`));
    }
}



async function entrar(usuario) {

    try {
        let supabase = await getSupabaseClient()
        const { data, error } = await supabase.auth.signInWithPassword({
            email: usuario.email.trim(),
            password: usuario.senha,
        })

        if (error) {
            throw new Error('Email ou senha inválidos!');
        }

        usuario.id = data?.user?.id;
        const { data: dataUser, error: errorUser } = await supabase
            .from('usuario')
            .select()
            .eq('id', usuario.id)

        // if (errorUser) {
        //     throw new Error('Problema ao referenciar usuário!');
        // }

        return error == null && errorUser == null;

    }
    catch (error) {
        console.error(new Error(`Erro ao tentar entrar na conta: ${error.message}`));
    }

}

exports = {cadastrar, entrar};