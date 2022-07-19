const TEMPLATE_REGEX = /\${[^{]+}/g;

// copied from Matt Browne's answer https://stackoverflow.com/questions/29182244/convert-a-string-to-a-template-string
// functions renamed slightly for readability

//get the specified property or nested property of an object
function resolveObjPath(path, obj, fallback = '') {
    return path.split('.').reduce((res, key) => res[key] || fallback, obj);
}

export default function render(template, variables, fallback) {
    return template.replace(TEMPLATE_REGEX, (match) => {
        const path = match.slice(2, -1).trim();
        return resolveObjPath(path, variables, fallback);
    });
}