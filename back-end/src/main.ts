// Importa as dependências necessárias do NestJS e configurações personalizadas
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata'; // Necessário para o TypeORM funcionar corretamente
import { AppModule } from './app.module';
import { GlobalPipesConfig } from './global/pipes.config';

/**
 * Função principal que inicializa a aplicação NestJS
 * Configura middlewares globais e inicia o servidor
 */
async function bootstrap() {
  // Cria uma instância da aplicação NestJS usando o módulo raiz (AppModule)
  const app = await NestFactory.create(AppModule);

  // Aplica pipes globais para validação automática de DTOs em todas as rotas
  app.useGlobalPipes(...GlobalPipesConfig());

  // Inicia o servidor na porta especificada nas variáveis de ambiente ou 3000 como padrão
  await app.listen(process.env.PORT ?? 3000);
}

// Executa a função bootstrap e ignora o retorno (void)
void bootstrap();
