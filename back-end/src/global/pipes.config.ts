import { ValidationPipe } from '@nestjs/common';

export const GlobalPipesConfig = () => {
  const validationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: false,
  });

  return [validationPipe];
};
