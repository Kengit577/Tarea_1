import { expect } from "chai";
import { ethers } from "hardhat";

// El nombre del bloque describe ahora coincide con el nombre del contrato
describe("CalculadoraBlockchain", function () {
  let calculadora: any;

  // Se ejecuta antes de cada test para desplegar el contrato
  beforeEach(async function () {
    // 1. Obtener la Factory usando el nombre EXACTO del contrato en el archivo .sol
    const CalculadoraFactory = await ethers.getContractFactory("CalculadoraBlockchain");
    
    // 2. Desplegar
    calculadora = await CalculadoraFactory.deploy();
    
    // 3. Esperar a que el despliegue termine (Ethers v6)
    await calculadora.waitForDeployment();
  });

  describe("Operaciones Básicas", function () {
    it("Debería sumar correctamente", async function () {
      await calculadora.sumar(10, 5);
      // Usamos BigInt (15n) porque los contratos devuelven enteros de 256 bits
      expect(await calculadora.obtenerUltimoResultado()).to.equal(15n);
    });

    it("Debería restar correctamente", async function () {
      await calculadora.restar(20, 8);
      expect(await calculadora.obtenerUltimoResultado()).to.equal(12n);
    });

    it("Debería multiplicar correctamente", async function () {
      await calculadora.multiplicar(4, 5);
      expect(await calculadora.obtenerUltimoResultado()).to.equal(20n);
    });

    it("Debería dividir correctamente", async function () {
      await calculadora.dividir(10, 2);
      expect(await calculadora.obtenerUltimoResultado()).to.equal(5n);
    });
  });

  describe("Validaciones y Eventos", function () {
    it("Debería fallar al dividir por cero", async function () {
      await expect(calculadora.dividir(10, 0))
        .to.be.revertedWith("No se puede dividir por cero");
    });

    it("Debería emitir el evento OperacionRealizada", async function () {
      await expect(calculadora.sumar(2, 3))
        .to.emit(calculadora, "OperacionRealizada")
        .withArgs("Suma", 2, 3, 5);
    });
  });
});