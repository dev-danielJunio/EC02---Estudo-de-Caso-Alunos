import { Funcionario } from '../models/funcionario.js';

let listaFuncionarios = JSON.parse(localStorage.getItem('listaFuncionarios')) || [];

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

    const funcionario = new Funcionario(nome.value.trim(), idade.value, cargo.value.trim(), salario.value);
    listaFuncionarios.push(funcionario);
    localStorage.setItem('listaFuncionarios', JSON.stringify(listaFuncionarios));
    nome.value = '';
    idade.value = '';
    cargo.value = '';
    salario.value = '';
    alert('Funcionário cadastrado com sucesso!');
    listarFuncionarios();
}

function listarFuncionarios() {
    const lista = document.getElementById('funcionarios-lista');
    if (!lista) return;
    listaFuncionarios = JSON.parse(localStorage.getItem('listaFuncionarios')) || [];
    lista.innerHTML = '';

    listaFuncionarios.forEach(function (funcionario) {
        const linha = document.createElement('tr');
        [funcionario.nome, funcionario.idade, funcionario.cargo,
            Number(funcionario.salario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        ].forEach(function (valor) {
            const coluna = document.createElement('td');
            coluna.textContent = valor;
            linha.appendChild(coluna);
        });
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
    listarFuncionarios();
});
