import { TemplateWithData } from "./templateEngine.js";

export type Cocktail = {
	strDrink: string;
	strAlcoholic: string;
	strInstructions: string;
	strDrinkThumb: string;
	strImageSource: string;
};

export function cocktailTemplate(cocktail: Cocktail): TemplateWithData {
	return {
		block: 'article',
		cls: 'cocktail',
		content: [
			{
				block: 'header',
				cls: 'cocktail__header',
				content: [
					{
						block: 'a',
						attrs: {
							href: cocktail.strImageSource ? cocktail.strImageSource : '#',
						},
						content: {
							block: 'div',
							cls: 'cocktail__image',
							attrs: {
								style: "background-image: url('" + cocktail.strDrinkThumb + "');",
							},
						},
					},
					{
						block: 'h2',
						cls: 'cocktail__title',
						content: [
							{
								block: 'span',
								cls: 'cocktail__title-text',
								content: cocktail.strDrink,
							},
							{
								block: 'i',
								cls: ['fa-solid', cocktail.strAlcoholic === 'Alcoholic' ? 'fa-wine-glass' : 'fa-0'],
							},
						],
					},
				],
			},
			{
				block: 'div',
				cls: 'cocktail__main',
				content: {
					block: 'p',
					cls: 'cocktail__description',
					content: cocktail.strInstructions,
				},
			},
		],
	};
}
