//ALUNO: ISAQUE MARLEY VIEIRA BISPO
//TURMA: 05
//DATA: 03/10/2022


//Bibliotecas para ler arquivos
const fs = require('fs')
const path = require('path')


//Especificando nome do arquivo que vai ser lido
const caminho = path.join(__dirname,'historico.txt')
const conteudo = fs.readFileSync(caminho)


const historico_parte1 = conteudo.toString().split('\n') // Transforma o texto do Historico em um lista
const historico_parte2 = historico_parte1.map((x)=> [x])  // Transforma cada linha do texto em uma lista
const historicoLista  = historico_parte2.map((x)=> x.toString().split(',')) // Separa cada linha por virgulas


//funcoes para extrair os dados de dentro de cada lista()
const somar = (acc,x)=>acc+x
const extraiAno = (lista) =>lista[0]
const extraiCodigo = (lista) => lista[1]
const extraiCargaH = (lista) => parseInt(lista[2])
const extraiFreq = (lista) => parseFloat(lista[3])
const extraiNota = (lista) => parseFloat( lista[4])


//Listas com os dados armazenados do historico
const listaApenasAno = historicoLista.map((x)=> extraiAno(x)) //extrai todos os periodos do historico
const listaApenasCod = historicoLista.map((x)=>extraiCodigo(x) ) //extrai todos os codigos das disciplinas no Historico
const listaApenasCH  = historicoLista.map((x)=>extraiCargaH(x) )     //...
const listaApenasFreq = historicoLista.map((x)=>extraiFreq(x) )
const listaApenasNota = historicoLista.map((x)=>extraiNota(x) )


const cargaCursada = listaApenasCH.reduce(somar,0) //soma das cargas Horarias
const notaVezesCH = historicoLista.map((x)=> x[4]*x[2]).reduce(somar,0) // multiplicacap das notas pelas suar respectivas Carga horaria


// tamanho da lista de periodos
const tempoCurso = listaApenasAno.length 


//filtro para deixar apenas os periodos diferentes e depois ultiliza o length para ter o seu tamanho 
// ex.: [2020.1,2020.1,2020.2,2021,2] -> [2020.1,2020.2,2021.2]
const n_periodos = listaApenasAno.filter((indice,x)=> listaApenasAno.indexOf(indice)===x).length 





const mediaGP =(notaVezesCH/cargaCursada).toFixed(2) // Media geral ponderada 
const media = (listaApenasNota.reduce(somar,0)) / (listaApenasNota).length // soma as notas e divide pela qtde de notas


// soma de (nota- media)² de todas as notas 
//ex.: (7.7 - media)² + (6.8 - media)² => ... float
const parcial  = listaApenasNota.map((x)=> (x- media)**2).reduce(somar,0) 

//desvio Padrao
const dp = Math.sqrt((parcial)/(listaApenasNota.length)) //calcula o desvio padro atraves da formula raiz(∑((nota - media)²)/n), sendo n o numero de notas.




//Funcao para exibir os dados no output do compilador
const mostrar = () =>{

const log = str => console.log(str)

log('Olá, Caro Usuário!')
log('Vamos dar inicio as informações sobre seu histórico na UFS???')
log('')
log('')
log(`==> Até agora você já explorou ${tempoCurso} MATÉRIAS em ${n_periodos} PERÍODOS.`)
log('')
log(`==> Possui um Carga Horária(CH) cursada de ${cargaCursada} HORAS.`)
log('')
log(`==> Além de possuir uma Média Geral Ponderada pela CH de ${mediaGP}`)
log('')
log(`==> Você possui um Desvio Padrão Médio ${dp.toFixed(2)}`)

log('')


log('==========================LISTA DAS DISCIPLINAS COM APROVAÇÃO==========================')
const aprovado = historicoLista.filter(((x)=> x[4]>= 5  &&  x[3] >= 75)) //filtra deixando apenas as materias com notas >=5
const imprime = aprovado.map((x)=> log(` Aprovação em ${x[1]} com nota igual ${x[4]}`))  //funcao criada para imprimir itens de apovado
log('')
log('')


log('==========================LISTA DAS DISCIPLINAS COM REPROVAÇÃO==========================')
const reprovado = historicoLista.filter(((x)=> x[4] < 5  || x[3] <= 75)) // se nota < 4 ou frequecia < 75% o aluno esta reprovado
const imprime2 = reprovado.map((x)=> log(` Reprovação em ${x[1]} com nota igual ${x[4]}`)) 
log('')
log('')

}

mostrar()
