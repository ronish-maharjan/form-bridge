class MessageBuilder {
    private constructor(){};
    static build(content:Object){
        const html = Object.entries(content) .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`) .join("");
        return html;
    }
};
export {MessageBuilder}

