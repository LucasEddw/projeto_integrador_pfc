function ParticipantesCard({ pfp, name, status, text }) {
    return (
        <div className="participantes-card">

            <img className="card-pfp" src={pfp} alt="foto_do_participante"/>

            <div className="card-text-box">
                <h1 className="card-name">{name}</h1>
                <h2 className="card-status">{status}</h2>
                <p className="card-text">{text}</p>
            </div>

        </div>
    );
}

function CardBox() {
    return (
        <div id="participantes-card-box">
            <ParticipantesCard pfp="#" name="Lucas Eduardo Benitez dos Santos" status="Aluno do 3º ano IFPR" text="Estudante do ensino médio. Programador e artista." />
            <ParticipantesCard pfp="#" name="Matheus Centenaro de Souza" status="Aluno do 3º ano IFPR" text="Estudante do ensino médio. Roteirista e auxiliar de arte." />
            <ParticipantesCard pfp="#" name="Gabriel Luiz Rech da Silva" status="Aluno do 3º ano IFPR" text="Estudante do ensino médio. Roteirista e auxiliar de arte." />
            <ParticipantesCard pfp="#" name="Sergio Ricardo Ferrazoli" status="Orientador" text="Orientador técnico do projeto, auxilia na parte técnica sobre redes de computadores." />
            <ParticipantesCard pfp="#" name="Talita Mariele Bortilini" status="Coorientadora" text="Coorientadora do projeto, auxilia na produção textual, desenvolvimento de artigo e roteiro." />
        </div>
    );
}

const cardRoot = ReactDOM.createRoot(document.getElementById("participantes-card-root"));
cardRoot.render(<CardBox />);