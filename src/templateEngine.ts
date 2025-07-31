type TemplateWithDataContent = {
	block: keyof HTMLElementTagNameMap;
	cls?: string | string[];
	attrs?: {
		[key: string]: string;
	};
	content?: TemplateWithData | TemplateWithData[];
};

type TemplateWithDataException = string | number | boolean | undefined | null;

export type TemplateWithData = TemplateWithDataContent | TemplateWithDataException;

function sanitize(string: string): string {
	const map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#x27;',
		'/': '&#x2F;',
	};
	const reg = /[&<>"'/]/gi;

	return string.replace(reg, (match) => map[match as keyof typeof map]);
}

export function stringTemplateEngine(templateWithData: TemplateWithData | TemplateWithDataContent['content']): string {
	if (templateWithData === undefined || templateWithData === null || templateWithData === false) {
		return '';
	}

	if (typeof templateWithData === 'string' || typeof templateWithData === 'number' || templateWithData === true) {
		return String(sanitize(String(templateWithData)));
	}

	if (Array.isArray(templateWithData)) {
		let result = '';

		for (const templateItem of templateWithData) {
			result += stringTemplateEngine(templateItem);
		}

		return result;
	}

	let tag = `<${templateWithData.block}`;

	if (templateWithData.cls) {
		const emptyArray: string[] = [];

		const classes = emptyArray.concat(templateWithData.cls).join(' ');

		tag += ` class="${classes}"`;
	}

	if (templateWithData.attrs) {
		for (const [key, value] of Object.entries(templateWithData.attrs)) {
			tag += ` ${key}="${sanitize(value)}"`;
		}
	}

	tag += '>';

	tag += stringTemplateEngine(templateWithData.content);

	tag += `</${templateWithData.block}>`;

	return tag;
}
