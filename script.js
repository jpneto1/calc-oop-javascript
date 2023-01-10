class Calculadora {

    constructor() {
        this.numeroSuperior = document.querySelector('#numero-superior');
        this.resultado = document.querySelector('#resultado');
        this.reset = 0;
    }

    //limpa os valores da tela
    limparValores() {
        this.numeroSuperior.textContent = '0';
        this.resultado.textContent = '0';
    }

    checarUltimoDig(input, numeroSuperior, reg) {
        if ((
            !reg.test(input) && //checa se não é um número
            !reg.test(numeroSuperior.substr(numeroSuperior.length - 1)) //checa se o último dígito é um sinal e não deixa adicionar o mesmo sinal 2x 
        )) {
            return true;
        } else {
            return false;
        }
    }

    //método de soma
    soma(n1, n2) {
        return parseFloat(n1) + parseFloat(n2);
    }

    //método de subtração
    subtracao(n1, n2) {
        return parseFloat(n1) - parseFloat(n2);
    }

    //método de multiplicação
    multiplicacao(n1, n2) {
        return parseFloat(n1) * parseFloat(n2);
    }

    //método de divisão
    divisao(n1, n2) {
        return parseFloat(n1) / parseFloat(n2);
    }


    //atualiza os valores
    atualizarValores(total) {
        this.numeroSuperior.textContent = total;
        this.resultado.textContent = total;
    }

    //resolve a operação
    resolver() {
        //explode uma string em um array
        let numeroSuperiorArray = (this.numeroSuperior.textContent.split(' '));
        let resultado = 0;

        for (let i = 0; i <= numeroSuperiorArray.length; i++) {
            let operacao = 0;
            let itemAtual = numeroSuperiorArray[i];

            if (itemAtual == 'x') {
                resultado = calc.multiplicacao(numeroSuperiorArray[i - 1], numeroSuperiorArray[i + 1]);
                operacao = 1;
            } else if (itemAtual == '/') {
                resultado = calc.divisao(numeroSuperiorArray[i - 1], numeroSuperiorArray[i + 1]);
                operacao = 1;
                //checa se o array ainda tem multiplicação ou divisão a ser feita
            } else if (!numeroSuperiorArray.includes('x') && !numeroSuperiorArray.includes('/')) {
                if (itemAtual == '+') {
                    resultado = calc.soma(numeroSuperiorArray[i - 1], numeroSuperiorArray[i + 1]);
                    operacao = 1;
                } else if (itemAtual == '-') {
                    resultado = calc.subtracao(numeroSuperiorArray[i - 1], numeroSuperiorArray[i + 1]);
                    operacao = 1;
                }
            }

            //atualiza valores do array para proxima iteração
            if (operacao) {
                numeroSuperiorArray[i - 1] = resultado; //indice anterior no resultado da operação
                numeroSuperiorArray.splice(i, 2); //remove os itens já utilizados para a operação
                i = 0; //atualizar o valore do indice
            }

            if (resultado) {
                calc.reset = 1;
            }
        }

        //atualizar os totais
        calc.atualizarValores(resultado);

    }

    clicBotao() {
        let input = this.textContent; //pega o texto que está no botão
        let numeroSuperior = calc.numeroSuperior.textContent;
        //verificar se só tem números
        let reg = new RegExp('^\\d+$');

        //se precisar limpar, limpa a tela
        if (calc.reset && reg.test(input)) {
            numeroSuperior = '0';
        }

        //limpa a propriedade de reset
        calc.reset = 0;

        //ativa o metodo de limpar tela
        if (input == 'AC') {
            calc.limparValores();

        } else if (input == '=') {
            calc.resolver();

        } else {
            //verifica se precisa adicionar ou não
            if (calc.checarUltimoDig(input, numeroSuperior, reg)) {
                return false;
            }

            //adiciona espaços aos operadores
            if (!reg.test(input)) {
                input = ` ${input} `;
            }

            //zera o numero superior e adiciona os outros números
            if (numeroSuperior == 0) {
                if (reg.test(input)) {
                    calc.numeroSuperior.textContent = input;
                }
            } else {
                calc.numeroSuperior.textContent += input;
            }

        }
    }
}
//start obj
let calc = new Calculadora();

//start botoes
let botoes = document.querySelectorAll('.bot');

//mapear todos botoes
for (let i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener('click', calc.clicBotao);
}