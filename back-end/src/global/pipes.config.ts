import { ValidationPipe } from '@nestjs/common';

/**
 * Configuração global dos pipes de validação
 * Define como as validações serão aplicadas em toda a aplicação
 */
export const GlobalPipesConfig = () => {
  const validationPipe = new ValidationPipe({
    whitelist: true, // Remove propriedades não declaradas nos DTOs
    forbidNonWhitelisted: true, // Retorna erro se propriedades extras forem enviadas
    transform: false, // Não transforma automaticamente os tipos
  });

  return [validationPipe];
};
