// 1. deposit some money
// 2. number of lines
// 3. collect bet
// 4. spin 
// 5. check win
// 6. winnings
// 7. play again

const prompt = require("prompt-sync")();

const ROWLS = 3;
const COLS = 3;

// quantos simbolos de cada tem na tabela
const Simbolos_Count = {
    "A":2,
    "B":4,
    "C":6,
    "D":8,
};

// valor de cada simbolo
const Simbolo_Valor ={
    "A":5,
    "B":4,
    "C":3,
    "D":2,   
};


//depositar
const deposit = () => {
    while(true){
        console.log("Bem vindo ao sistema de apostas do Mitinho!!\n\n\n")
        const qDeposita = prompt ("Insira o valor que deseja apostar: ");
        const numDeposita = parseFloat(qDeposita);

        if(isNaN(numDeposita)|| numDeposita <= 0){
        console.log("Deposito invalido! Tente novamente...\n");
        } else{
            return numDeposita;
        }
    }
};

//escolher linhas
const line = () =>{
    while(true){
        const qLinha = prompt("Escolha a quantidade de linhas (1-3) que deseja jogar: Afinal, isso é só um jogo né? ");
        const numLinha = parseFloat(qLinha);

        if(isNaN(numLinha) || numLinha <= 0|| numLinha > 3) {
            console.log("Numero invalido!! Tente novamente...");
        } else{
            return numLinha;
        }
    }
};


const aposta = (Balanco,qLinha) =>{
    while(true){
        const qAposta =prompt("Quanto vai apostar por linha? ");
        const numAposta =parseFloat(qAposta);

        if(isNaN(numAposta) || numAposta <= 0 || numAposta > Balanco / qLinha){
            console.log("Numero invalido, ta pobre é?");
        } else {
            return numAposta;
        } 
    }
};


const gira=()=>{
    const Simbolos=[];
    for (const [simbolo, conta] of Object.entries(Simbolos_Count)){
        for(let i = 0; i < conta; i++){
            Simbolos.push(simbolo);
        }
    }
    const reels = [[],[],[]];
    for (let i = 0; i < COLS; i++){
        const reelSimbolos = [...Simbolos];
        for(let j = 0; j< ROWLS; j++){
            const randomIndex = Math.floor(Math.random() * reelSimbolos.length);
            const selecSimbolo = reelSimbolos[randomIndex];
            reels[i].push(selecSimbolo);
            reelSimbolos.splice(randomIndex, 1);
        }
    }

    return reels;
};


const Verticaliza = (reels) =>{
    const rows = [];

    for (let i = 0; i< ROWLS; i++){
        rows.push([]);
        for (let j = 0; j< COLS; j++){
            rows[i].push(reels[j][i]);
         }
    }
    return rows;
}

const printRows = (rows)=>{
    for (const row of rows){
        let rowstring="";
        for(const [i, simbolo] of row.entries()){
            rowstring+=simbolo;
            if (i!=row.length -1){
                rowstring+=" | ";
            }
        }
        console.log(rowstring)
    }
}


const recompensa = (rows, qAposta, linhas) =>{
    let dinheiro = 0;
    for(let row = 0; row < linhas; row++){
        const simbolos = rows[row];
        let jackpot = true;

        for(const simbolo of simbolos){
            if (simbolo != simbolos[0]){
                jackpot = false;
                break;
            }
        }
        if(jackpot){
            dinheiro += qAposta * Simbolo_Valor[simbolos[0]];
        }
    }
    return dinheiro;
};

const EaFc_exe = () => {
    let Balanco = deposit();
    
    while(true){
    console.log("Voce tem: "+Balanco, "dinheiros!")
    const numLinha = line();
    const qAposta = aposta(Balanco , numLinha);
    Balanco -= qAposta * numLinha;
    const reels = gira();
    const rows = Verticaliza(reels);
    printRows(rows);
    const dinheiro = recompensa(rows, qAposta, numLinha);
    Balanco += dinheiro;
    console.log("Ganhou mané!!!! Um total de: " + dinheiro.toString(), " dinheiros!");

    if(Balanco <=0){
        console.log("Acabou seu dinheiro!");
        break;
    }

    const dnv = prompt("Quer testar sua sorte de novo? (s/n)");
    if(dnv != "s") break;
   }
}

EaFc_exe();