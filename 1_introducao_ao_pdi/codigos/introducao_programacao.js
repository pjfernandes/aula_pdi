//Rapida introducao a programacao
console.log("Hello World");

var hello = "Hello World";
console.log(hello);

var x = 3.0;
var y = 2.0;

console.log(x + y);
console.log(x*y);
console.log(Math.pow(x,y));
console.log(Math.sqrt(4));
console.log(Math.abs(-2));

//IF ELSE
var idade = 16;

if (idade >= 16) {
 console.log("Pode votar");
} else {
 console.log("Não pode votar");
}

//Arrays - Armazenam varios valores
var array1 = [1, 3, 4, 5];
var frutas = ["maca", "laranja", "pera"];

console.log(array1);
console.log(frutas);

//For Loop
var pizza = ["portuguesa", "quatro queijos", "marguerita"];
console.log(pizza[0]);
console.log(pizza[1]);
console.log(pizza[2]);

console.log(pizza.length);

for (var i = 0; i < pizza.length; i++) {
  console.log(pizza[i]);
}

//While Loop
var dado = [1, 2, 3, 4, 5, 6];

var random = Math.floor(Math.random() * dado.length);

var jogada = dado[random];
console.log(jogada);

/*
while(jogada != 5) {
  console.log(jogada);
  random = Math.floor(Math.random() * dado.length);
  jogada = dado[random];
}
*/

//Funcoes

var soma = function(a, b) {
  console.log(a + b);
};

var soma2 = function(a, b) {
  return a + b;
};

soma(2, 3);
soma2(4, 3);


//Funcao fatorial - Recursividade

var factorial = function(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
};

console.log(factorial(5));
