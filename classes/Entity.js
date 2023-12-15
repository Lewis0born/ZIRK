
class Entity {
    constructor (id, registry) {
        this.id = id;
        this.registry = registry;
        this.components = {};
        /*
        components = 
        {
            "Movement": ...,
            "Position": ...
        }
        */
    }
}

export default Entity;