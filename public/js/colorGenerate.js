function generateColor(){

    //gera um número aleatório e converte para hexadecimal e concatena com #
    let randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);

    //retorna o código hexadecimal de uma cor aleatória
    return randomColor;
}