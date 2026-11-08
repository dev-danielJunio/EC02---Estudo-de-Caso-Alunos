function atualizarRelatorios() {
    const funcionarios = JSON.parse(localStorage.getItem('listaFuncionarios')) || [];

    const somaSalarios = funcionarios.reduce((total, funcionario) => total + Number(funcionario.salario), 0);
    document.getElementById('media-salarial').textContent = funcionarios.length > 0
        ? (somaSalarios / funcionarios.length).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        : 'Nenhum funcionário cadastrado.';

    const salariosAltos = funcionarios.filter(funcionario => Number(funcionario.salario) > 5000);
    const tabela = document.getElementById('salarios-altos-lista');
    tabela.innerHTML = '';

    if (salariosAltos.length === 0) {
        const linha = document.createElement('tr');
        const coluna = document.createElement('td');
        coluna.colSpan = 4;
        coluna.textContent = 'Nenhum funcionário com salário acima de R$ 5.000,00.';
        linha.appendChild(coluna);
        tabela.appendChild(linha);
    }

    salariosAltos.forEach(funcionario => {
        const linha = document.createElement('tr');
        [funcionario.nome, funcionario.idade, funcionario.cargo,
            Number(funcionario.salario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        ].forEach(valor => {
            const coluna = document.createElement('td');
            coluna.textContent = valor;
            linha.appendChild(coluna);
        });
        tabela.appendChild(linha);
    });

    const cargosUnicos = [...new Set(funcionarios.map(funcionario => funcionario.cargo))];
    const nomesMaiusculos = funcionarios.map(funcionario => funcionario.nome.toUpperCase());
    exibirLista('cargos-lista', cargosUnicos);
    exibirLista('nomes-lista', nomesMaiusculos);
}

function exibirLista(id, valores) {
    const lista = document.getElementById(id);
    lista.innerHTML = '';
    const itens = valores.length > 0 ? valores : ['Nenhum funcionário cadastrado.'];
    itens.forEach(valor => {
        const item = document.createElement('li');
        item.textContent = valor;
        lista.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('atualizar-relatorios').onclick = function () {
        atualizarRelatorios();
    };
    atualizarRelatorios();
});

window.addEventListener('storage', function (evento) {
    if (evento.key === 'listaFuncionarios' || evento.key === null) atualizarRelatorios();
});
