// selecionando todos os elementos necessários
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// quando o botão startQuiz é clicado
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); // mostrar caixa de informações
}

// quando o botão exitQuiz é clicado
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // esconder caixa de informações
}

// quando o botão continueQuiz é clicado
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // esconder caixa de informações
    quiz_box.classList.add("activeQuiz"); // mostrar caixa de quiz
    showQuetions(0); // chamando a função showQestions
    queCounter(1); // passando 1 como parâmetro para queCounter
    startTimer(15); // chamando a função startTimer
    startTimerLine(0); // chamando a função startTimerLine
}

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// quando o botão restartQuiz é clicado
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz"); // mostrar caixa de quiz
    result_box.classList.remove("activeResult"); // esconder caixa de resultado
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); // chamando a função showQestions
    queCounter(que_numb); // passando que_numb para queCounter
    clearInterval(counter); // limpar contador
    clearInterval(counterLine); // limpar counterLine
    startTimer(timeValue); // chamando a função startTimer
    startTimerLine(widthValue); // chamando a função startTimerLine
    timeText.textContent = "Tempo Restante"; // alterar o texto de timeText para Tempo Restante
    next_btn.classList.remove("show"); // esconder o botão next
}

// quando o botão quitQuiz é clicado
quit_quiz.onclick = () => {
    window.location.reload(); // recarregar a janela atual
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// quando o botão Next Que é clicado
next_btn.onclick = () => {
    if (que_count < questions.length - 1) { // se o contador de questões for menor que o comprimento total das questões
        que_count++; // incrementar o contador de questões
        que_numb++; // incrementar o número da questão
        showQuetions(que_count); // chamando a função showQestions
        queCounter(que_numb); // passando que_numb para queCounter
        clearInterval(counter); // limpar contador
        clearInterval(counterLine); // limpar counterLine
        startTimer(timeValue); // chamando a função startTimer
        startTimerLine(widthValue); // chamando a função startTimerLine
        timeText.textContent = "Tempo Restante"; // alterar o texto de timeText para Tempo Restante
        next_btn.classList.remove("show"); // esconder o botão next
    } else {
        clearInterval(counter); // limpar contador
        clearInterval(counterLine); // limpar counterLine
        showResult(); // chamando a função showResult
    }
}

// obtendo perguntas e opções do array
function showQuetions(index) {
    const que_text = document.querySelector(".que_text");

    // criando novas tags span e div para pergunta e opções e passando os valores usando o índice do array
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag; // adicionando nova tag span dentro de que_tag
    option_list.innerHTML = option_tag; // adicionando nova tag div dentro de option_tag

    const option = option_list.querySelectorAll(".option");

    // atribuir atributo onclick a todas as opções disponíveis
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// criando novas tags div para ícones
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// se o usuário clicar em uma opção
function optionSelected(answer) {
    // TODO - adicione o limpar contador
    // TODO - adicione limpar counterLine
    let userAns = answer.textContent; // obter opção selecionada pelo usuário
    let correcAns = questions[que_count].answer; // obter resposta correta do array
    const allOptions = option_list.children.length; // obter todos os itens de opção

    if (userAns == correcAns) { // se a opção selecionada pelo usuário for igual à resposta correta do array
        userScore += 1; // aumentar o valor do score em 1
        answer.classList.add("correct"); // adicionar cor verde à opção selecionada corretamente
        answer.insertAdjacentHTML("beforeend", tickIconTag); // adicionar ícone de check à opção selecionada corretamente
        console.log("Resposta Correta");
        console.log("Suas respostas corretas = " + userScore);
    } else {
        answer.classList.add("incorrect"); // adicionar cor vermelha à opção selecionada
        answer.insertAdjacentHTML("beforeend", crossIconTag); // adicionar ícone de X à opção selecionada
        console.log("Resposta Errada");

        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) { // se houver uma opção que corresponda à resposta correta do array
                option_list.children[i].setAttribute("class", "option correct"); // adicionar cor verde à opção correspondente
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // adicionar ícone de check à opção correspondente
                console.log("Resposta correta automaticamente selecionada.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); // uma vez que o usuário selecionou uma opção, desabilitar todas as opções
    }
    next_btn.classList.add("show"); // mostrar o botão next se o usuário selecionou alguma opção
}

// TODO - crie a função- function showResult() {}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time; // alterando o valor de timeCount com o valor de tempo
        time--; // decrementando o valor de tempo
       //TODO - adicione as condicionais e o loop for
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1; // aumentando o valor de tempo em 1
        time_line.style.width = time + "px"; // aumentando a largura de time_line em px pelo valor de tempo
        if (time > 549) { // se o valor de tempo for maior que 549
            clearInterval(counterLine); // limpar counterLine
        }
    }
}

function queCounter(index) {
    // criando uma nova tag span e passando o número da questão e o número total de questões
    let totalQueCounTag = '<span><p>' + index + '</p> de <p>' + questions.length + '</p> Questões</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; // adicionando nova tag span dentro de bottom_ques_counter
}
