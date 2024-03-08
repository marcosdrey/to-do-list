const form = document.querySelector('#form');
const input = document.querySelector('#input');
let atividadesAFazer = JSON.parse(localStorage.getItem('tarefas')) || [];
let atividadesRealizadas = JSON.parse(localStorage.getItem('realizadas')) || [];

if(atividadesAFazer) {
    atividadesAFazer.forEach(atividade => {
        adicionarAtividade(atividade.nome)
    })
}

if(atividadesRealizadas) {
    atividadesRealizadas.forEach(atividade => {
        realizarAtividade(atividade.nome)
    })
}

form.addEventListener('submit', (evento)=> {
    evento.preventDefault();
    adicionarAtividade(input.value);
    recolherInfos();
    input.value = "";
    input.focus();
})

function adicionarAtividade(atividade){
    if(!atividade) {
        return;
    } else {
    const todoList = document.querySelector('#todo-list');
    const li = document.createElement('li');
    const parAtividade = document.createElement('p');
    const icones = document.createElement('span');
    const editar = document.createElement('i');
    const excluir = document.createElement('i');
    const marcar = document.createElement('i');

    parAtividade.textContent = atividade;

    editar.className = "edit";
    excluir.className = "remove";
    marcar.className = "done";

    editar.textContent = "✏️";
    excluir.textContent = "❌";
    marcar.textContent = "✔️";

    editar.addEventListener('click', ()=> {
        const novaAtividade = prompt('Qual a nova atividade?');
        if(novaAtividade) {
            atividadesAFazer.forEach(tarefa => {
                if(tarefa.nome === atividade) {
                    tarefa.nome = novaAtividade;
                    atividade = novaAtividade;
                }
            })
            parAtividade.textContent = novaAtividade;
            localStorage.setItem("tarefas", JSON.stringify(atividadesAFazer))
        }
    })
    excluir.addEventListener('click', ()=> {
        excluirItem(li, atividadesAFazer, atividade, 'tarefas')
    })
    marcar.addEventListener('click', ()=> {
        atividadesAFazer.forEach((tarefa, index) => {
            if(tarefa.nome === atividade) {
                realizarAtividade(atividade);
                criarAtividadeRealizada(atividade);
                excluirItem(li, atividadesAFazer, atividade, 'tarefas');
            }
            localStorage.setItem("tarefas", JSON.stringify(atividadesAFazer))
        })
    })

    icones.append(editar);
    icones.append(excluir);
    icones.append(marcar);

    li.append(parAtividade);
    li.append(icones);

    todoList.append(li);
    }
}

function recolherInfos(){
    if (!input.value) {
        return;
    } else {
    const tarefa = {
        nome: input.value
    }
    atividadesAFazer.push(tarefa);
    localStorage.setItem("tarefas", JSON.stringify(atividadesAFazer));
}
}

function realizarAtividade(atividade){

    const doneList = document.querySelector('#done-list');
    const li = document.createElement('li');
    const parAtividade = document.createElement('p');
    const icones = document.createElement('span');
    const excluir = document.createElement('i');
    const desfazer = document.createElement('i');

    parAtividade.textContent = atividade;
    excluir.className = "remove";
    desfazer.className = "undo";

    excluir.textContent = "❌";
    desfazer.textContent = "↩️";

    excluir.addEventListener('click', ()=> {
        excluirItem(li, atividadesRealizadas, atividade, 'realizadas')
    })

    desfazer.addEventListener('click', ()=> {
        adicionarAtividade(atividade)
        const tarefa = {
            nome: atividade
        }
        atividadesAFazer.push(tarefa);
        localStorage.setItem("tarefas", JSON.stringify(atividadesAFazer))
        excluirItem(li, atividadesRealizadas, atividade, 'realizadas')
    })

    icones.append(excluir);
    icones.append(desfazer);

    li.append(parAtividade);
    li.append(icones);

    doneList.append(li);
}

function criarAtividadeRealizada(atividade){
    const tarefaRealizada = {
        nome: atividade
    }
    atividadesRealizadas.push(tarefaRealizada);
    localStorage.setItem("realizadas", JSON.stringify(atividadesRealizadas));
}

function excluirItem(li, array, atividade, key) {
    array.forEach((tarefa, index) => {
        if(tarefa.nome === atividade) {
            li.remove();
            array.splice(index, 1);
        }
        localStorage.setItem(`${key}`, JSON.stringify(array))
    })
}
