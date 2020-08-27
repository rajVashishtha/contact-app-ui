export const filterContact = (template, filter="")=>{
    if(filter === "all" || filter === "contact"){
        return template
    }
    let new_template = []
    for (const t of template){
        if(t.text.toLowerCase() === filter.toLowerCase()){
            new_template.push(t)
        }
    }
    return new_template
}