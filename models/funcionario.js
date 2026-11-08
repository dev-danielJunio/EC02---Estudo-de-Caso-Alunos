export class Funcionario {
    constructor(nome, idade, cargo, salario) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    getNome() { return this.nome; }
    getIdade() { return this.idade; }
    getCargo() { return this.cargo; }
    getSalario() { return this.salario; }

    setNome(nome) { this.nome = nome; }
    setIdade(idade) { this.idade = idade; }
    setCargo(cargo) { this.cargo = cargo; }
    setSalario(salario) { this.salario = salario; }

    toString() {
        return `Nome: ${this.nome}, Idade: ${this.idade}, Cargo: ${this.cargo}, Salário: ${this.salario}`;
    }
}
