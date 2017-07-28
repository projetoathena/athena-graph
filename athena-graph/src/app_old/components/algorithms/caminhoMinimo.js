(function () {
    'use strict';
    angular.module('graphe.algorithms')
        .service('caminhoMinimo', function () {

            /**
             * Percurso em largura, adaptado de handbook of graph theory
             * 2.1.2
             * @type {string}
             */

            var nome = 'Caminho Mínimo',
                instrucoes = [],
                resultado = [],
                passos = [
                  "passo 1",
                  "passo 2",
                  "passo 3",
                  "passo 4",
                  "passo 4",
                  "passo 6",
                  "passo 7",
                  "passo 8",
                  "passo 9",
                  "passo 10"
              ];

            /**
             * @param  {Graph} graph The graph to be visited
             * @param  {Node} visited The initial node.
             */
            function run(graph, visited) {
                console.log('starting algorithm');
                resultado = [];
                var node = graph.getNode(visited);
                bfs(graph, node);
                console.log('end of algorithm');
                console.log(resultado);
                return resultado;
            }

            function criaMatrizAdj (){
              var matriz = document.querySelector(".adjacency-matrix");
              matriz = matriz.querySelector("table");
              matriz = matriz.querySelector("tbody");
              var itens  = matriz.querySelectorAll("td");

              console.log(itens);

              var txt = [];

              itens.forEach( function(item){
                txt.push(item.textContent.toString());
              });

              for(var i = 0; i < 30;i++){
                var a = txt.indexOf(String.fromCharCode((65+i)));
                if(a === -1){break;}
                txt.splice(a,1);
              }

              console.log(txt);

              var contador = Math.sqrt(txt.length);

              var matrix = new Array(contador);
              for(var i = 0; i< contador ; i++){
                matrix[i] = new Array(contador);
              }

              for(var col = 0; col< contador ; col++){
                for(var lin = 0; lin< contador ; lin++){
                  var x = parseInt(txt.shift());
                  if(x == 0){
                    matrix[col][lin] = Number.POSITIVE_INFINITY;
                  }else{
                    matrix[col][lin] = x;
                  }
                }
              }

              console.log(matrix);
              return matrix;
            }

            function caminhoMinimo(G, verticeInicial) {

                var matrix = criaMatrizAdj();
                var fila = [];
                var resultadoFinal = [];
                verticeInicial.marcado = true;
                resultado.push({ operacao: 'visitar_no', passo: 0, fila: [], item: verticeInicial, resultado:resultadoFinal.slice() });
                resultado.push({ operacao: 'marcar_no', passo: 1, fila: [], item: verticeInicial, resultado:resultadoFinal.slice() });

                // Adiciona à fila
                fila.push(verticeInicial);
                resultado.push({ operacao: '', passo: 2, fila: fila.slice(), resultado:resultadoFinal.slice() });

                while (fila.length > 0) {
                    resultado.push({ operacao: '', passo: 3, fila: fila.slice(), resultado:resultadoFinal.slice() });
                    //Pega primeiro item da fila
                    var n = fila.shift();
                    resultadoFinal.push(n);
                    resultado.push({ operacao: '', passo: 4, fila: fila.slice(), resultado:resultadoFinal.slice()  });


                    G.getAdjacencyList(n).forEach(function(m){
                        resultado.push({ operacao: '', passo: 5, fila: fila.slice(),resultado: resultadoFinal.slice() });
                        if (!m.marcado) {
                            m.marcado = true;
                            resultado.push({ operacao: 'visitar_no', passo: 6, fila:fila.slice(), item:m, resultado:resultadoFinal.slice() });
                            fila.push(m);
                            resultado.push({ operacao: '', passo: 7, fila:fila.slice(), resultado:resultadoFinal.slice() });
                            resultado.push({ operacao: 'marcar_no', passo: 8, fila:fila.slice(), item:m,resultado:resultadoFinal.slice() });
                        }
                    });
                }

                resultado.push({ operacao: '', passo: 9, fila:fila.slice(),resultado:resultadoFinal.slice() });

                G.getNodes().forEach(function(vertice){
                    if(angular.isDefined(vertice.marcado)) {
                        delete vertice.marcado;
                    }
                });
            }

            //noinspection UnnecessaryLocalVariableJS
            var service = {
                name: nome,
                steps: passos,
                result: resultado,
                instructions: instrucoes,
                run: run,
                usaFila : true
            };

            return service;
        });
})();
