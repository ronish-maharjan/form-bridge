class MessageBuilder {
    private constructor(){};
    static build(content:Object){
        const html = Object.entries(content) .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`) .join("");
        return html;
    }
};

const result = MessageBuilder.build({name:"ronish",message:"i want to work with you mate"});
console.log(result);
export {MessageBuilder}

