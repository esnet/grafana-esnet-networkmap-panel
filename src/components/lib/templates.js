import { resolvePath } from './utils.js';

const TEMPLATE_REGEX = /\${[^{]+}/g;

export function render(template, variables, fallback) {
    return template.replace(TEMPLATE_REGEX, (match) => {
        const path = match.slice(2, -1).trim();
        return resolvePath(path, variables, fallback);
    });
}