import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const urlSupabase = 'https://afityicmmtpsdousbixf.supabase.co';
const anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmaXR5aWNtbXRwc2RvdXNiaXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NzAxODUsImV4cCI6MjA2MjE0NjE4NX0.Ti0Ecq_09PptfKy7GqEN5mzZHHVp3AgfWriTOYTs8TA';

const supabase = createClient(urlSupabase, anon);

const session = JSON.parse(localStorage.getItem('session'));

if (!session) window.location.href = 'index.html';


const listaAlunos = document.getElementById('lista-alunos');
const formAluno = document.getElementById('form-aluno');
const totalAlunosElement = document.getElementById('total-alunos');
const ativosAlunosElement = document.getElementById('ativos-alunos');
const inativosAlunosElement = document.getElementById('inativos-alunos');

async function carregarAlunos() {
    try {
        const { data, error } = await supabase
            .from('alunos')
            .select('*')
            .order('nome_completo', { ascending: true });

        if (error) throw error;

        listaAlunos.innerHTML = '';

        if (data) {

            atualizarEstatisticas(data);

            data.forEach(aluno => {
                const item = document.createElement('li');
                item.className = `list-group-item d-flex justify-content-between align-items-center ${aluno.status === 'inativo' ? 'inactive-student' : ''}`;

                const texto = document.createElement('div');
                texto.innerHTML = `
                    <div class="d-flex align-items-center">
                        <div class="me-3" style="width: 40px; height: 40px; background-color: ${aluno.status === 'ativo' ? '#2ecc71' : '#95a5a6'}; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-user"></i>
                        </div>
                        <div>
                            <strong>${aluno.nome_completo}</strong> (${aluno.idade} anos) - Turma: ${aluno.turma}
                            <br><small class="text-muted">Responsável: ${aluno.responsavel} - Tel: ${aluno.telefone || 'Não informado'}</small>
                            <br><small>Status: <span class="badge bg-${aluno.status === 'ativo' ? 'success' : 'secondary'}">${aluno.status === 'ativo' ? 'Ativo' : 'Inativo'}</span></small>
                        </div>
                    </div>
                `;

                const botoes = document.createElement('div');
                botoes.className = "d-flex";
                botoes.innerHTML = `
                    <button class="btn btn-sm btn-primary me-2 editar-aluno" data-id="${aluno.id}" title="Editar">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button class="btn btn-sm btn-danger excluir-aluno" data-id="${aluno.id}" title="${aluno.status === 'ativo' ? 'Inativar' : 'Excluir'}">
                        <i class="fas fa-trash"></i>
                    </button>
                `;

                item.appendChild(texto);
                item.appendChild(botoes);
                listaAlunos.appendChild(item);
            });

            document.querySelectorAll('.editar-aluno').forEach(btn => {
                btn.addEventListener('click', () => editarAluno(btn.dataset.id));
            });

            document.querySelectorAll('.excluir-aluno').forEach(btn => {
                btn.addEventListener('click', () => excluirAluno(btn.dataset.id));
            });
        }
    } catch (error) {
        console.error('Erro ao carregar alunos:', error);
        alert('Erro ao carregar lista de alunos');
    }
}

function atualizarEstatisticas(alunos) {
    const total = alunos.length;
    const ativos = alunos.filter(a => a.status === 'ativo').length;
    const inativos = total - ativos;

    totalAlunosElement.textContent = total;
    ativosAlunosElement.textContent = ativos;
    inativosAlunosElement.textContent = inativos;
}

document.getElementById('form-aluno').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const id = document.getElementById('id-edicao').value;

    try {

        const aluno = {
            nome_completo: form.nome_completo.value,
            data_nascimento: form.data_nascimento.value || null,
            turma: form.turma.value,
            idade: parseInt(form.idade.value),
            responsavel: form.responsavel.value,
            telefone: form.telefone.value || null,
            endereco: form.endereco.value || null,
            email: form.email.value || null,
            status: form.status.value
        };

        // Validação
        const erros = validarAluno(aluno);
        if (erros) throw new Error(erros);

        // Operação no Supabase
        const { error } = id
            ? await supabase.from('alunos').update(aluno).eq('id', id)
            : await supabase.from('alunos').insert(aluno);

        if (error) throw error;

        limparFormulario();
        await carregarAlunos();

    } catch (error) {
        console.error("Erro ao salvar aluno:", error);
        alert(error.message || "Erro ao salvar aluno");
    }
});

function limparFormulario() {
    formAluno.reset();
    document.getElementById('id-edicao').value = '';
    document.getElementById('cancelar-edicao').classList.add('d-none');
    document.getElementById('status').value = 'ativo';

    document.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });
    document.querySelectorAll('.invalid-feedback').forEach(el => {
        el.textContent = '';
    });
}


async function editarAluno(id) {
    try {
        const { data, error } = await supabase.from('alunos').select('*').eq('id', id).single();

        if (error) throw error;
        if (!data) return;

        document.getElementById('nome_completo').value = data.nome_completo;
        document.getElementById('data_nascimento').value = data.data_nascimento || '';
        document.getElementById('turma').value = data.turma;
        document.getElementById('idade').value = data.idade;
        document.getElementById('responsavel').value = data.responsavel;
        document.getElementById('telefone').value = data.telefone || '';
        document.getElementById('endereco').value = data.endereco || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('status').value = data.status;

        document.getElementById('id-edicao').value = data.id;
        document.getElementById('cancelar-edicao').classList.remove('d-none');

        document.getElementById('form-aluno').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Erro ao editar aluno:', error);
        alert('Erro ao carregar dados do aluno');
    }
}

function validarAluno(aluno) {
    const erros = [];

    if (!aluno.nome_completo?.trim()) {
        document.getElementById('nome_completo').classList.add('is-invalid');
        document.getElementById('nome-completo-feedback').textContent = "Nome completo é obrigatório";
        erros.push("Nome completo é obrigatório");
    }

    if (!aluno.turma?.trim()) {
        document.getElementById('turma').classList.add('is-invalid');
        document.getElementById('turma-feedback').textContent = "Turma é obrigatória";
        erros.push("Turma é obrigatória");
    }

    if (!aluno.responsavel?.trim()) {
        document.getElementById('responsavel').classList.add('is-invalid');
        document.getElementById('responsavel-feedback').textContent = "Responsável é obrigatório";
        erros.push("Responsável é obrigatório");
    }

    if (aluno.idade < 5 || aluno.idade > 10) {
        document.getElementById('idade').classList.add('is-invalid');
        document.getElementById('idade-feedback').textContent = "Idade deve ser entre 5-10 anos";
        erros.push("Idade deve ser entre 5-10 anos");
    }

    return erros.length ? erros.join("\n") : null;
}

async function excluirAluno(id) {
    try {
        const { data: aluno, error: fetchError } = await supabase
            .from('alunos')
            .select('status')
            .eq('id', id)
            .single();

        if (fetchError) throw fetchError;

        if (aluno.status === 'ativo') {

            if (confirm('Tem certeza que deseja inativar este aluno?')) {
                const { error } = await supabase
                    .from('alunos')
                    .update({ status: 'inativo' })
                    .eq('id', id);

                if (error) throw error;
                await carregarAlunos();
            }
        } else {

            if (confirm('Tem certeza que deseja excluir permanentemente este aluno?')) {
                const { error } = await supabase
                    .from('alunos')
                    .delete()
                    .eq('id', id);

                if (error) throw error;
                await carregarAlunos();
            }
        }
    } catch (error) {
        console.error('Erro ao excluir aluno:', error);
        alert('Erro ao excluir aluno');
    }
}

document.getElementById('cancelar-edicao').addEventListener('click', limparFormulario);

carregarAlunos();

window.logout = async function () {
    try {
        await supabase.auth.signOut();
        localStorage.removeItem('session');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
}