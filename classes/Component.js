
class Component {
    constructor(componentType) {
        this.componentType = componentType; //string
        
    }
}


class PositionComponent extends Component {
    constructor(componentType, componentObj){
        // use super when passing other classes constructor param
        super(componentType);

        this.x = componentObj.x;
        this.y = componentObj.y;
        this.width = componentObj.width;
        this.height = componentObj.height;

    }
}

class MovementComponent extends Component {
    constructor(componentType, componentObj){
        super(componentType);
        this.vX = componentObj.vX;
        this.vY = componentObj.vY;
        this.collisionX = false;
        this.collisionY = false;
    }
}

class SpriteComponent extends Component {
    constructor(componentType, componentObj){
        super(componentType);
        this.sprite = new Image();
        this.sprite.src = componentObj.path;
        this.srcRect = componentObj.srcRect;
        /* srcRect = 
            {
                x,
                y,
                width,
                height
            }

        */
    }
}

export {MovementComponent, PositionComponent, SpriteComponent};