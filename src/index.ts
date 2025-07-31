import { cocktail } from './cocktail.js';
import { cocktailTemplate } from './cocktailTemplate.js';
import { stringTemplateEngine } from './templateEngine.js';

const page = document.querySelector<HTMLBodyElement>('.app');

if (page) {
	console.log(cocktailTemplate(cocktail));
	console.log(stringTemplateEngine(cocktailTemplate(cocktail)));
	page.innerHTML = stringTemplateEngine(cocktailTemplate(cocktail));
}
