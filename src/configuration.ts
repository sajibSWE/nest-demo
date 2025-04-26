import * as glob from 'glob';
import * as path from 'path';
import { Type } from '@nestjs/common';

function loadClassesByDecorator(decorator: string) {
  const pattern: string =
    decorator === 'controller'
      ? '/**/*.controller.{ts,js}'
      : '/**/*.{service,repository}.{ts,js}';

  const files = glob.sync(`${__dirname}${pattern}`);
  const classes: Type[] = [];

  for (const file of files) {
    const modulePath = path.resolve(file);
    const module = require(modulePath);
    for (const key of Object.keys(module)) {
      const exportedClass = module[key];
      classes.push(exportedClass);
    }
  }
  return classes;
}

export function createAppModule() {
  const controllers = loadClassesByDecorator('controller');
  const providers = loadClassesByDecorator('injectable');
  return {
    module: class AppModule {},
    controllers,
    providers,
  };
}
