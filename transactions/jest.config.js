module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.', // Asegúrate de que apunte a la raíz del proyecto
    testRegex: '.*\\.spec\\.ts$', // Asegúrate de que Jest busque archivos con .spec.ts
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest', // Usa ts-jest para transpilar los archivos TS
    },
    collectCoverageFrom: ['src/**/*.(t|j)s'], // Asegúrate de que esto cubra tu código fuente
    coverageDirectory: 'coverage', // Carpeta donde se guardará el reporte de cobertura
    coverageReporters: ['lcov', 'text-summary'], // Reportes generados
    testEnvironment: 'node', // Define el entorno de prueba
  };
  