import { Funcionario } from '../models/funcionario.js';

let listaFuncionarios = JSON.parse(localStorage.getItem('listaFuncionarios')) || [];
let indiceEdicao = null;
const buscarFuncionario = indice => listaFuncionarios[indice];

function salvarFuncionario() {
    const nome = document.getElementById('nome');
    const idade = document.getElementById('idade');
    const cargo = document.getElementById('cargo');
    const salario = document.getElementById('salario');

    if (!nome.value.trim() || !idade.value || !cargo.value.trim() || !salario.value) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    if (!document.getElementById('funcionario-form').reportValidity()) return;

    const editando = indiceEdicao !== null;
    if (editando) {
        const dados = buscarFuncionario(indiceEdicao);
        const funcionario = new Funcionario(dados.nome, dados.idade, dados.cargo, dados.salario);
        funcionario.setNome(nome.value.trim());
        funcionario.setIdade(idade.value);
        funcionario.setCargo(cargo.value.trim());
        funcionario.setSalario(salario.value);
        listaFuncionarios = listaFuncionarios.map((item, indice) =>
            indice === indiceEdicao ? funcionario : item
        );
    } else {
        const funcionario = new Funcionario(nome.value.trim(), idade.value, cargo.value.trim(), salario.value);
        listaFuncionarios.push(funcionario);
    }

    localStorage.setItem('listaFuncionarios', JSON.stringify(listaFuncionarios));
    cancelarEdicao();
    listarFuncionarios();
    alert(editando ? 'Funcionário editado com sucesso!' : 'Funcionário cadastrado com sucesso!');
}

function editarFuncionario(indice) {
    const funcionario = buscarFuncionario(indice);
    indiceEdicao = indice;
    document.getElementById('nome').value = funcionario.nome;
    document.getElementById('idade').value = funcionario.idade;
    document.getElementById('cargo').value = funcionario.cargo;
    document.getElementById('salario').value = funcionario.salario;
    document.getElementById('edicao-funcionario').hidden = false;
    document.getElementById('nome').focus();
}

function cancelarEdicao() {
    indiceEdicao = null;
    ['nome', 'idade', 'cargo', 'salario'].forEach(campo => {
        document.getElementById(campo).value = '';
    });
    const formularioEdicao = document.getElementById('edicao-funcionario');
    if (formularioEdicao) formularioEdicao.hidden = true;
}

function excluirFuncionario(indice) {
    if (!confirm(`Deseja excluir ${listaFuncionarios[indice].nome}?`)) return;
    // Antes: function (funcionario, indiceAtual) { return indiceAtual !== indice; }
    listaFuncionarios = listaFuncionarios.filter((funcionario, indiceAtual) => indiceAtual !== indice);
    localStorage.setItem('listaFuncionarios', JSON.stringify(listaFuncionarios));
    if (indiceEdicao !== null) cancelarEdicao();
    listarFuncionarios();
    alert('Funcionário excluído com sucesso!');
}

function listarFuncionarios() {
    const lista = document.getElementById('funcionarios-lista');
    if (!lista) return;
    listaFuncionarios = JSON.parse(localStorage.getItem('listaFuncionarios')) || [];
    lista.innerHTML = '';

    listaFuncionarios.forEach((funcionario, indice) => {
        const linha = document.createElement('tr');
        [funcionario.nome, funcionario.idade, funcionario.cargo,
            Number(funcionario.salario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        ].forEach(valor => {
            const coluna = document.createElement('td');
            coluna.textContent = valor;
            linha.appendChild(coluna);
        });

        const acoes = document.createElement('td');
        const botaoEditar = document.createElement('button');
        botaoEditar.type = 'button';
        botaoEditar.className = 'btn btn-warning btn-sm me-2';
        botaoEditar.textContent = 'Editar';
        botaoEditar.onclick = function () {
            editarFuncionario(indice);
        };

        const botaoExcluir = document.createElement('button');
        botaoExcluir.type = 'button';
        botaoExcluir.className = 'btn btn-danger btn-sm';
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.onclick = function () {
            excluirFuncionario(indice);
        };

        acoes.appendChild(botaoEditar);
        acoes.appendChild(botaoExcluir);
        linha.appendChild(acoes);
        lista.appendChild(linha);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const botaoSalvar = document.getElementById('salvar-funcionario');
    if (botaoSalvar) {
        botaoSalvar.onclick = function () {
            salvarFuncionario();
        };
    }
    const botaoCancelar = document.getElementById('cancelar-edicao');
    if (botaoCancelar) {
        botaoCancelar.onclick = function () {
            cancelarEdicao();
        };
    }
    listarFuncionarios();
});
