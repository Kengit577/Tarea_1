// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CalculadoraBlockchain {
    int256 private resultado;

    
    event OperacionRealizada(string tipo, int256 a, int256 b, int256 resultado);


    function sumar(int256 a, int256 b) public returns (int256) {
        resultado = a + b;
        emit OperacionRealizada("Suma", a, b, resultado);
        return resultado;
    }

    function restar(int256 a, int256 b) public returns (int256) {
        resultado = a - b;
        emit OperacionRealizada("Resta", a, b, resultado);
        return resultado;
    }

 
    function multiplicar(int256 a, int256 b) public returns (int256) {
        resultado = a * b;
        emit OperacionRealizada("Multiplicacion", a, b, resultado);
        return resultado;
    }

    
    function dividir(int256 a, int256 b) public returns (int256) {
        require(b != 0, "No se puede dividir por cero");
        resultado = a / b;
        emit OperacionRealizada("Division", a, b, resultado);
        return resultado;
    }

    function obtenerUltimoResultado() public view returns (int256) {
        return resultado;
    }
}