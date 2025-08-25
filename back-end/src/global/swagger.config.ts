import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SwaggerConfig = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Todo List API')
    .setDescription(
      'API RESTful para gerenciamento de tarefas (Todo List) com autenticação JWT, autorização baseada em roles e validação completa.',
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        description: 'JWT Authorization token',
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .addTag('Auth', 'Endpoints de autenticação e autorização')
    .addTag('Users', 'Gerenciamento de usuários')
    .addTag('Tasks', 'Gerenciamento de tarefas')
    .setContact('Todo List API', 'https://github.com/rdGxd/todo-list', '')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Mantém autorização entre reloads
      docExpansion: 'list', // Expande automaticamente
      filter: true, // Permite filtrar endpoints
      showRequestDuration: true, // Mostra tempo de requisição
    },
    customSiteTitle: 'Todo List API Documentation',
    // customfavIcon: '/favicon.ico',
    // customCssUrl: '/swagger-custom.css',
  });
};
