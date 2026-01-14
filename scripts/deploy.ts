import { ethers } from "hardhat";

async function main() {
  console.log("Iniciando despliegue del contrato CalculadoraBlockchain...");

  // 1. Obtener la factory del contrato 
  // IMPORTANTE: El string debe ser "CalculadoraBlockchain" si así se llama en el .sol
  const CalculadoraFactory = await ethers.getContractFactory("CalculadoraBlockchain");

  // 2. Desplegar el contrato
  const calculadora = await CalculadoraFactory.deploy();

  // 3. Esperar a que el despliegue se confirme
  await calculadora.waitForDeployment();

  // 4. Obtener la dirección
  const address = await calculadora.getAddress();

  console.log("---------------------------------------------");
  console.log(`✅ Contrato desplegado con éxito!`);
  console.log(`📍 Dirección del contrato: ${address}`);
  console.log("---------------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});